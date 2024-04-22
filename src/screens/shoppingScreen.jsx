import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../theme.js";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";

const ShoppingScreen = ({ updateCart, userData }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [slideAnimation] = useState(new Animated.Value(100));
  const [progressWidth, setProgress] = useState(new Animated.Value(0));
  const [isOrdering, setIsOrdering] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  useEffect(() => {
    loadCartItems();
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    const fetchUserData = async () => {
      const userData = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setUser(userData);
    };
    fetchUserData();
  }, []);

  const loadCartItems = async () => {
    try {
      const cartString = await AsyncStorage.getItem("cart");
      if (cartString !== null) {
        const cart = JSON.parse(cartString);
        setCartItems(cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const updatedCart = cartItems.filter(
        (item) =>
          !(
            item.Name == product.Name &&
            item.ModifyIngredients == product.ModifyIngredients
          )
      );
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const decreaseQuantity = async (product) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (
          item.Name === product.Name &&
          item.ModifyIngredients == product.ModifyIngredients &&
          item.Quantity > 0
        ) {
          return { ...item, Quantity: item.Quantity - 1 };
        }
        return item;
      });
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const increaseQuantity = async (product) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (
          item.Name === product.Name &&
          item.ModifyIngredients == product.ModifyIngredients
        ) {
          return { ...item, Quantity: item.Quantity + 1 };
        }
        return item;
      });
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.Price * item.Quantity;
    });
    return total;
  };

  const calculateShippingCost = () => {
    const total = calculateTotal();
    return total > 15 ? 0 : 2.99;
  };

  const showOrderingModal = async () => {
    setIsOrdering(true);
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      setProgress(new Animated.Value(0));
      setProgressComplete(true);
      setTimeout(() => {
        setIsOrdering(false);
        setProgressComplete(false);
        setCartItems([]);
      }, 500); // Espera 500ms antes de cerrar el modal
    });
  };

  const handlePlaceOrder = async () => {
    const formattedCart = cartItems.map((item) => ({
      Name: item.Name,
      Price: item.Price,
      Ingredients: item.Ingredients,
      Quantity: item.Quantity,
    }));
    const userId = FirebaseAuth.currentUser.uid;
    const Order = { itemsOrdered: formattedCart, Date: Timestamp.now() };

    if (user.addresses.length > 0 && user.paymentMethods.length > 0) {
      await showOrderingModal();
      await addDoc(collection(FirestoreDB, "Users", userId, "orders"), Order);
      await AsyncStorage.removeItem("cart");
      updateCart();
    } else {
      showModal();
    }
  };

  const showModal = () => {
    Alert.alert(
      "Missing Information",
      "To place an order, you need to enter a valid address and payment method."
    );
  };

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>
        Total: ${calculateTotal().toFixed(2)}
      </Text>
      <Text style={styles.summaryText}>
        Shipping: ${calculateShippingCost().toFixed(2)}
      </Text>
      <Text style={styles.summaryText}>
        Grand Total: ${(calculateTotal() + calculateShippingCost()).toFixed(2)}
      </Text>
      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.Image }} style={styles.Image} />
      <View style={styles.itemDetails}>
        <Text>{item.Name}</Text>
        <Text>
          {item?.ModifyIngredients && item.ModifyIngredients.length > 0
            ? `No ${item.ModifyIngredients.join(", ")}`
            : ""}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item?.PriceOffer ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text
                style={[styles.price, { textDecorationLine: "line-through" }]}
              >
                {item.Price} €
              </Text>
              <Text style={[styles.price, { color: "red", marginLeft: 5 }]}>
                {item.PriceOffer} €
              </Text>
            </View>
          ) : (
            <Text style={styles.price}>{item.Price} €</Text>
          )}
        </View>
      </View>
      {item.Quantity === 1 ? (
        <TouchableOpacity onPress={() => removeFromCart(item)}>
          <Icon name="trash" size={theme.appBar.icon.size} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => decreaseQuantity(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.quantity}>{item.Quantity}</Text>
      <TouchableOpacity onPress={() => increaseQuantity(item)}>
        <Text style={styles.quantityButton}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderingModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOrdering}
      onRequestClose={() => {
        setIsOrdering(false);
      }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Placing the order...</Text>
        <Text style={styles.modalText}>Estimated delivery in 30 minutes</Text>

        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {renderOrderingModal()}
          {renderSummary()}

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  Image: { width: 65, height: 65 },
  summaryContainer: {
    marginTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundColor, // Semi-transparent background
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // White text
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    backgroundColor: theme.colors.primary,
    height: 5,
    marginBottom: 10,
  },
});

export default ShoppingScreen;

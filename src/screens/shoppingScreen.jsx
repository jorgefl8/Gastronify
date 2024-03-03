import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image,Animated, Easing, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../theme.js";
import Loading from "../components/Loading.jsx";
import { Timestamp } from "firebase/firestore";
import functions from '../../firebase/firebaseUtils.js';

const ShoppingScreen = ({ updateCart, userData }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [slideAnimation] = useState(new Animated.Value(100)); // Valor inicial fuera de la pantalla

  useEffect(() => {
    loadCartItems();
    // Animación para deslizar hacia arriba
    Animated.timing(
      slideAnimation,
      {
        toValue: 0,  
        duration: 1000, // Ajusta la duración de la animación según sea necesario
        easing: Easing.out(Easing.ease), // Cambia el tipo de easing
        useNativeDriver: false, 
      }
    ).start();
  }, []);

  const loadCartItems = async () => {
    try {
      const cartString = await AsyncStorage.getItem('cart');
      if (cartString !== null) {
        const cart = JSON.parse(cartString);
        setCartItems(cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const updatedCart = cartItems.filter(item =>!(item.Name == product.Name && item.ModifyIngredients == product.ModifyIngredients));
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const decreaseQuantity = async (product) => {
    try {
      const updatedCart = cartItems.map(item => {
        if (item.Name === product.Name && item.ModifyIngredients == product.ModifyIngredients && item.Quantity > 0) {
          return { ...item, Quantity: item.Quantity - 1 };
        }
        return item;
      });
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const increaseQuantity = async (product) => {
    try {
      const updatedCart = cartItems.map(item => {
        if (item.Name === product.Name && item.ModifyIngredients == product.ModifyIngredients) {
          return { ...item, Quantity: item.Quantity + 1 };
        }
        return item;
      });
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.Price * item.Quantity;
    });
    return total;
  };

  const calculateShippingCost = () => {
    const total = calculateTotal();
    return total > 15 ? 0 : 2.99;
  };

  const handlePlaceOrder = async () => {
    
    const formattedCart = cartItems.map(item => ({
      Name: item.Name,
      Price: item.Price,
      Ingredients: item.Ingredients,
      Quantity: item.Quantity
    }));
    const Order = {userData: userData, order: formattedCart, Date: Timestamp.now()};
    
    // Check if UserData has address and payment method
    if (!userData.Address || !userData.PaymentMethod) {
      // Show modal
      showModal();
    }else{
      setIsLoading(true);
    // Proceed with placing the order
    await functions.uploadDoc("Orders", Order);
    await AsyncStorage.removeItem('cart');
    setCartItems([]);
    updateCart(); // Make sure to call updateCart after completing the order
    setIsLoading(false);}
  };
  
  const showModal = () => {
    Alert.alert(
      'Missing Information',
      'To place an order, you need to enter a valid address and payment method.',
      [
        { text: 'OK', onPress: () => setIsLoading(false) }
      ],
      { cancelable: false }
    );
  };
  
  

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>Total: ${calculateTotal().toFixed(2)}</Text>
      <Text style={styles.summaryText}>Shipping: ${calculateShippingCost().toFixed(2)}</Text>
      <Text style={styles.summaryText}>Grand Total: ${(calculateTotal() + calculateShippingCost()).toFixed(2)}</Text>
      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.Image }}
        style={styles.Image}
      />
      <View style={styles.itemDetails}>
        <Text>{item.Name}</Text>
        <Text>{item?.ModifyIngredients && item.ModifyIngredients.length > 0 ? `No ${item.ModifyIngredients.join(", ")}` : ""}</Text>
        <Text>{item.Price}</Text>
      </View>
      {item.Quantity === 1 ?
        (
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {isLoading ? (
        <Loading /> // Muestra el componente de carga mientras se está cargando
      ) : cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
  removeButton: {
    fontSize: 20,
  },
  Image: { width: 65, height: 65 },
  summaryContainer: {
    marginTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShoppingScreen;

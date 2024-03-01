import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../theme.js";

const ShoppingScreen = ({ updateCart }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
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

  const removeFromCart = async (productName) => {
    try {
      const updatedCart = cartItems.filter(item => item.Name !== productName);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      updateCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const decreaseQuantity = async (productName) => {
    try {
      const updatedCart = cartItems.map(item => {
        if (item.Name === productName && item.Quantity > 0) {
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

  const increaseQuantity = async (productName) => {
    try {
      const updatedCart = cartItems.map(item => {
        if (item.Name === productName) {
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.Image }}
        style={styles.Image}
      />
      <View style={styles.itemDetails}>
        <Text>{item.Name}</Text>
        <Text>{item.Price}</Text>
      </View>
      {item.Quantity === 1 ?
        (
          <TouchableOpacity onPress={() => removeFromCart(item.Name)}>
          <Icon name="trash" size={theme.appBar.icon.size} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => decreaseQuantity(item.Name)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
        )}
      <Text style={styles.quantity}>{item.Quantity}</Text>
      <TouchableOpacity onPress={() => increaseQuantity(item.Name)}>
        <Text style={styles.quantityButton}>+</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
  Image: { width: 65, height: 65 }
});

export default ShoppingScreen;

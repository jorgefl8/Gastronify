import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingScreen = () => {
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
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.Name}</Text>
      <Button title="Remove" onPress={() => removeFromCart(item.Name)} />
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
});

export default ShoppingScreen;

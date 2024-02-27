import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


const ShopCart = () => {
  const [numProductos, setNumProductos] = useState(0);

  const handleAgregarProducto = () => {
    // Lógica para agregar un producto al carrito
    setNumProductos(numProductos + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAgregarProducto}>
        <Icon name="cart-outline" size={40} />
        {numProductos > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{numProductos}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    top: -5,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
  },
  badgeText: {
    color: 'white',
    fontSize: 13,
  },
});

export default ShopCart;

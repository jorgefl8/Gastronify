import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Carrito = () => {
  const [numProductos, setNumProductos] = useState(0);

  const handleAgregarProducto = () => {
    // Lógica para agregar un producto al carrito
    setNumProductos(numProductos + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAgregarProducto}>
        <Image source={require('../../assets/shopping.png')} style={styles.image} />
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
    zIndex: 1,
    backgroundColor: 'green',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    width: 40,
    height: 20,
    justifyContent: 'center',
    marginBottom: 40,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    top: -5,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Carrito;

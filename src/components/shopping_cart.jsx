import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigate } from 'react-router-native';
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../theme";

const ShopCart = ({ numProductos }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/shopping');
  };

  return (
    <TouchableOpacity style={styles.cartIconContainer} onPress={handlePress}>
      <Icon name="cart-outline" size={40}  />
      {numProductos > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{numProductos}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: theme.colors.secondary, // O cualquier color que desees para el fondo
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ShopCart;

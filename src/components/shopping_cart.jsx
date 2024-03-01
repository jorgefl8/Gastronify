import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Link } from 'react-router-native';
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../theme";

const ShopCart = ({ numProductos }) => {

  return (
    <View style={styles.container}>
      <Link to="/shopping">
        <View style={styles.cartIconContainer}>
          <Icon name="cart-outline" size={40} />
          {numProductos > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{numProductos}</Text>
            </View>
          )}
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: -20,
    right: 0,
    bottom: 10,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: 'black',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
  },
  badgeText: {
    color: 'white',
    fontSize: 13,
  },
  cartIconContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 100,
    padding: 10,
    borderColor:"black",
    borderWidth: 1,
  }
});

export default ShopCart;

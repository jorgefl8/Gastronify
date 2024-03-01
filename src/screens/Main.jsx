import React, { useState, useEffect } from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import Constants from 'expo-constants'
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import { Navigate, Route, Routes } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import theme from "../theme.js";
import AppBar from "../components/AppBar.jsx";
import Home from "./Home.jsx";
import Menu from "./Menu.jsx";
import Profile from "./Profile.jsx";
import Loading from "../components/Loading.jsx";
import BooksForm from "./BooksForm.jsx";
import ShoppingScreen from "./shoppingScreen.jsx";
import ShopCart from "../components/shopping_cart.jsx"

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [numProductos, setNumProductos] = useState(0);

  useEffect(() => {
    loadCartItems();
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe(); // Limpia el listener al desmontar el componente
    };
  }, [numProductos]);
  const loadCartItems = async () => {
    try {
      const cartString = await AsyncStorage.getItem('cart');
      if (cartString !== null) {
        const cart = JSON.parse(cartString);
        // Sumar las cantidades de todos los productos en el carrito
        const totalQuantity = cart.reduce((total, currentItem) => total + currentItem.Quantity, 0);
        setNumProductos(totalQuantity);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await FirebaseAuth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.appBar.primary} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </View>

    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.appBar.primary} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/menu" element={<Menu onCartUpdate={() => loadCartItems()} />} />
        <Route path='/profile' element={<Profile handleLogout={handleLogout} />} />
        <Route path='/books' element={<BooksForm />} />
        <Route path='/shopping' element={<ShoppingScreen updateCart={() => loadCartItems()} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <ShopCart numProductos={numProductos} />
      <AppBar />
    </View>

  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
  }
});


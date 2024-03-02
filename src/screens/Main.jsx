import React, { useState, useEffect } from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import Constants from 'expo-constants'
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import { Navigate, Route, Routes, useLocation } from 'react-router-native';
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
  const [userData, setUserData] = useState(false);
  const [numProductos, setNumProductos] = useState(0);
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

  const location = useLocation(); 

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
      unsubscribe(); 
    };
  }, [numProductos]);

  const loadCartItems = async () => {
    try {
      const cartString = await AsyncStorage.getItem('cart');
      if (cartString !== null) {
        const cart = JSON.parse(cartString);
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

  useEffect(() => {
    // Si la ruta actual es '/menu' o '/shopping', mostrar el carrito
    setShowCart(location.pathname === '/menu' || location.pathname === '/' || location.pathname === '/profile');
  }, [location]);

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
        <Route path='/profile' element={<Profile handleLogout={handleLogout} saveUserData={setUserData} />} />
        <Route path='/books' element={<BooksForm />} />
        <Route path='/shopping' element={<ShoppingScreen updateCart={() => loadCartItems()} userData={userData} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {showCart && <ShopCart numProductos={numProductos} />}
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

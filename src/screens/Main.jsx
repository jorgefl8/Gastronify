import React, { useState, useEffect } from "react";
import { View, StatusBar, Platform, StyleSheet, TouchableOpacity, Text } from "react-native";
import Constants from 'expo-constants'
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-native';
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
import ProfileSettings from "./ProfileSettings.jsx";
import ShoppingScreen from "./shoppingScreen.jsx";
import ShopCart from "../components/shopping_cart.jsx"

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [numProductos, setNumProductos] = useState(0);
  const [showCart, setShowCart] = useState(true); // Estado para controlar la visibilidad del carrito
  const [showAppBar, setShowAppBar] = useState(true); // Estado para controlar la visibilidad de la AppBar

  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading){
      setShowCart(location.pathname === '/menu' || location.pathname === '/' || location.pathname === '/profile');
      setShowAppBar(location.pathname !== '/shopping');
    }
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
  }, [numProductos, location]);

  const loadCartItems = async () => {
    try {
      const cartString = await AsyncStorage.getItem('cart');
      if (cartString !== null) {
        const cart = JSON.parse(cartString);
        const totalQuantity = cart.reduce((total, currentItem) => total + currentItem.Quantity, 0);
        setNumProductos(totalQuantity);
      } else {setNumProductos(0);}
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
        <Route path='/profile' element={<Profile handleLogout={handleLogout} saveUserData={setUserData} />} />
        <Route path='/books' element={<BooksForm />} />
        <Route path='/ProfileSettings' element={<ProfileSettings />} />
        <Route path='/shopping' element={<ShoppingScreen updateCart={() => loadCartItems()} userData={userData} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {showCart && <ShopCart numProductos={numProductos} />}
      {showAppBar && <AppBar />}
      {/* Botón de retroceso solo visible en la pantalla de compras */}
      {!showAppBar && (
        <TouchableOpacity onPress={() => navigate(-1)} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    position: 'relative', // Agregar esta línea para posicionar el botón correctamente
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + (Platform.OS === "ios" ? 25 : 5),
    right: 20,
  },
  backButtonText: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    fontSize: 16,
    color: 'black',
  },
});
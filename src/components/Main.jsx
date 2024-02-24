import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Button, StyleSheet } from "react-native";

import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import theme from "../theme.js";
import AppBar from "./AppBar.jsx";
import Home from "./Home.jsx";
import Menu from "./Menu.jsx";
import Profile from "./Profile.jsx";
import { Navigate, Route, Routes } from 'react-router-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
  }, []);

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
      <View>
        <Animatable.Text animation="rotate" iterationCount="infinite" ><Icon name="sync-circle" size={70}/></Animatable.Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.appBar.primary} />
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </View>

    );
  }

  return (
    <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.appBar.primary} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/menu' element={<Menu/>} />
          <Route path='/profile' element={<Profile handleLogout={handleLogout}/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <AppBar/>
      </View>

  );
};

export default Main;

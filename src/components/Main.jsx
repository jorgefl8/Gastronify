import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import Login from "./Login.jsx";
import theme from "../theme.js";
import AppBar from "./AppBar.jsx";
import Home from "./Home.jsx";
import Menu from "./Menu.jsx";
import Profile from "./Profile.jsx";
import { Navigate, Route, Routes } from 'react-router-native';

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
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    // Renderizar la pantalla de inicio de sesión si no está autenticado
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.appBar.primary} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <AppBar/>
      </View>
    );
  }

  // Renderizar el contenido principal si está autenticado
  return (
    <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.appBar.primary} />
        <Login/>
      </View>
  );
};

export default Main;

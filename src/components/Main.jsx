import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { FirebaseAuth } from "../../firebase/firebaseconfig.js"; 
import Login from './Login.jsx';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
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
      console.log('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <View >
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    // Renderizar la pantalla de inicio de sesión si no está autenticado
    return (
      <Login/>
    );
  }

  // Renderizar el contenido principal si está autenticado
  return (
    <View >
      <Text>A maria luisa le huele el ano a cloaca</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default Main;

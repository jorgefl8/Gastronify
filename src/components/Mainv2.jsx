import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import Login from "./Login.jsx";

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
        <Login />
      </View>
    );
  }

  // Renderizar el contenido principal si está autenticado
  return (
    <View>
      <Text> Testing Home</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default Main;

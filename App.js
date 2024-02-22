import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native'; // Importa Button desde react-native
import LoginScreen from './LoginScreen'; // Asumiendo que el archivo de la pantalla de inicio de sesión está en la ruta correcta
import { FirebaseAuth } from "./firebase/firebaseconfig";

export default function App() {
  const auth = FirebaseAuth;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si el usuario está autenticado al cargar la aplicación
  
    const unsubscribe = FirebaseAuth.onAuthStateChanged( user => {
      if (user) {
        setIsLoggedIn(true); // Si hay un usuario autenticado, establecer isLoggedIn en true
      } else {
        setIsLoggedIn(false); // Si no hay un usuario autenticado, establecer isLoggedIn en false
      }
      setLoading(false); // Marcar que la verificación de autenticación ha terminado
    });
 
    const handleLogout = async () => {
      try {
        await FirebaseAuth.signOut(); // Cierra sesión
        setIsLoggedIn(false); // Actualiza el estado de isLoggedIn
      } catch (error) {
        console.log('Error al cerrar sesión:', error);
      }
    };
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
      <Text>A maria luisa le huele el ano a cloaca</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

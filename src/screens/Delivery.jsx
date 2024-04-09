import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";

const Delivery = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (name, value) => {
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(address);
    // Aquí puedes manejar la lógica para guardar la dirección
  };

  return (
    <View style={styles.container}>
      <Text>Calle:</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('street', value)} value={address.street} />
      <Text>Ciudad:</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('city', value)} value={address.city} />
      <Text>Estado:</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('state', value)} value={address.state} />
      <Text>Código Postal:</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('zip', value)} value={address.zip} />
      <Button title="Guardar dirección" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default Delivery;
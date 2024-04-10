import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";

const Delivery = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    street: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setUser(userData);
      setLoading(false);
      setAddressList(userData.addresses || []); // Assuming addresses are stored in an array
    };

    fetchUserData();
  }, []);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setAddressFormData(address);
    setModalVisible(true);
  };

  const handleCreateAddress = () => {
    setSelectedAddress(null);
    setAddressFormData({
      street: '',
      city: '',
      zip: '',
    });
    setModalVisible(true);
  };

  const handleChange = (name, value) => {
    setAddressFormData({
      ...addressFormData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedAddress) {
        // Update existing address
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          addresses: addressList.map((address) => address.id === selectedAddress.id ? addressFormData : address)
        });
        setAddressList(addressList.map((address) => address.id === selectedAddress.id ? addressFormData : address));
      } else {
        // Create new address
        const newAddress = {
          id: Date.now().toString(),
          ...addressFormData,
        };
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          addresses: [...addressList, newAddress]
        });
        setAddressList([...addressList, newAddress]);
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mis direcciones:</Text>
      {addressList.length > 0 ? (
        addressList.map((address, index) => (
          <TouchableOpacity key={index} onPress={() => handleEditAddress(address)}>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{address.street}, {address.city}, {address.zip}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noAddressText}>No tienes direcciones guardadas.</Text>
      )}
      <Button title="Agregar nueva dirección" onPress={handleCreateAddress} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{selectedAddress ? 'Editar dirección:' : 'Agregar nueva dirección:'}</Text>
            <TextInput style={styles.input} onChangeText={(value) => handleChange('street', value)} value={addressFormData.street} />
            <TextInput style={styles.input} onChangeText={(value) => handleChange('city', value)} value={addressFormData.city} />
            <TextInput style={styles.input} onChangeText={(value) => handleChange('zip', value)} value={addressFormData.zip} />
            <Button title="Guardar dirección" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  addressContainer: {
    backgroundColor: theme.colors.cardBackground,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addressText: {
    fontSize: 16,
  },
  noAddressText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Delivery;

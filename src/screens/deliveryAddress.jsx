import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";

const Delivery = ({ back }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    street: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setUser(userData);
      setLoading(false);
      setAddressList(userData.addresses || []);
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
      street: "",
      city: "",
      zip: "",
    });
    setModalVisible(true);
  };
  const handleDeleteAddress = async (addressId) => {
    try {
      await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
        ...user,
        addresses: addressList.filter((address) => address.id !== addressId),
      });
      setAddressList(addressList.filter((address) => address.id !== addressId));
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete the address.");
    }
  };
  const handleChange = (name, value) => {
    setAddressFormData({
      ...addressFormData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { street, city, zip } = addressFormData;
    return street.trim() != '' && city.trim() != '' && zip.trim() != '';
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation failed", "Please fill in all fields.");
      return;
    }
    try {
      if (selectedAddress) {
        // Update existing address
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          addresses: addressList.map((address) =>
            address.id === selectedAddress.id ? addressFormData : address
          ),
        });
        setAddressList(
          addressList.map((address) =>
            address.id === selectedAddress.id ? addressFormData : address
          )
        );
      } else {
        // Create new address
        const newAddress = {
          id: Date.now().toString(),
          ...addressFormData,
        };
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          addresses: [...addressList, newAddress],
        });
        setAddressList([...addressList, newAddress]);
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save the address.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>My Addresses:</Text>
      {addressList.length > 0 ? (
        addressList.map((address, index) => (
          <View key={index} style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <TouchableOpacity onPress={() => handleEditAddress(address)}>
                <Icon name="edit" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.addressText}>
                {address.street}, {address.city}, {address.zip}
              </Text>
              <TouchableOpacity onPress={() => handleDeleteAddress(address.id)} style={styles.trashIcon}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>

        ))
      ) : (
        <Text style={styles.noAddressText}>You have no saved addresses.</Text>
      )}
      <Button title="Add new address" onPress={handleCreateAddress} />
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
            <Text>
              {selectedAddress ? "Edit address:" : "Add new address:"}
            </Text>
            <Text>Street:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange("street", value)}
              value={addressFormData.street}
            />
            <Text>City:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange("city", value)}
              value={addressFormData.city}
            />
            <Text>ZIP:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange("zip", value)}
              value={addressFormData.zip}
            />
            <Button title="Save Address" onPress={handleSubmit} />
            <View style={styles.separator} />
            <Button
              color="red"
              title="Cancel"
              onPress={() => setModalVisible(false)}
            />
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
    fontWeight: "bold",
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  noAddressText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  separator: {
    height: 15,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: theme.colors.secondary,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: '5%',
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: 'black',
  },

  button: {
    backgroundColor: theme.colors.secondary,
    padding: 8,
    borderRadius: 5,
    margin: 6,
  },
  modalView: {
    backgroundColor: theme.colors.backgroundColor,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%', // Ajusta este valor según tus necesidades
  },
  backButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 1,
  },
  trashIcon: {
    marginLeft: 'auto', // Esto empujará el ícono de "trash" al extremo derecho
  },
  
});
export default Delivery;

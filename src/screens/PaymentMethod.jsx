import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Modal
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import theme from "../theme.js";
import IconEntypo from 'react-native-vector-icons/Entypo'; // Asegúrate de tener esta librería instalada

const PaymentMethod = ({back}) => {
  const [user, setUser] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [methodFormData, setMethodFormData] = useState({
    type: '',
    cardNumber: '',
    cvv: '',
    expirationDate: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setUser(userData);
      setPaymentMethods(userData.paymentMethods || []);
    };

    fetchUserData();
  }, []);

  const handleEditMethod = (method) => {
    setSelectedMethod(method);
    setMethodFormData(method);
    setModalVisible(true);
  };

  const handleCreateMethod = () => {
    setSelectedMethod(null);
    setMethodFormData({
      type: '',
      cardNumber: '',
      cvv: '',
      expirationDate: ''
    });
    setModalVisible(true);
  };

  const handleDeleteMethod = async (methodId) => {
    try {
      const updatedMethods = paymentMethods.filter(m => m.id !== methodId);
      await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
        ...user,
        paymentMethods: updatedMethods
      });
      setPaymentMethods(updatedMethods);
    } catch (error) {
      console.error("Failed to delete the payment method: ", error);
      Alert.alert("Error", "Failed to delete the payment method.");
    }
  };

  const handleChange = (name, value) => {
    setMethodFormData({
      ...methodFormData,
      [name]: value,
    });
  };

  const isValidForm = () => {
    const { type, cardNumber, cvv, expirationDate } = methodFormData;
    
    // Validación del número de la tarjeta: debe tener exactamente 16 dígitos
    if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
        Alert.alert("Validation Error", "The card number must be exactly 16 digits.");
        return false;
    }
    // Validación de la fecha de expiración
    const expRegEx = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/;
    const currentYear = new Date().getFullYear() % 100; // last two digits
    if (!expirationDate || !expRegEx.test(expirationDate) || parseInt(expirationDate.split('/')[1], 10) < currentYear) {
        Alert.alert("Validation Error", "Please enter a valid expiration date (MM/YY).");
        return false;
    }

    // Validación del CVV: debe tener exactamente 3 dígitos
    if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
        Alert.alert("Validation Error", "The CVV must be exactly 3 digits.");
        return false;
    }

    

    // Si todas las validaciones son correctas
    return true;
};


  const handleSubmit = async () => {
    if (!isValidForm()) {
      return;
    }
    try {
      if (selectedMethod) {
        const updatedMethods = paymentMethods.map((method) =>
          method.id === selectedMethod.id ? { ...methodFormData, id: method.id } : method
        );
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          paymentMethods: updatedMethods
        });
        setPaymentMethods(updatedMethods);
      } else {
        const newMethod = {
          id: Date.now().toString(),
          ...methodFormData,
        };
        const updatedMethods = [...paymentMethods, newMethod];
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          paymentMethods: updatedMethods
        });
        setPaymentMethods(updatedMethods);
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to save the payment method: ", error);
      Alert.alert("Error", "Failed to save the payment method.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Payment Methods:</Text>
      <TouchableOpacity
        onPress={() => back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      {paymentMethods.map((method, index) => (
        <View key={index} style={styles.methodEntry}>
          <TouchableOpacity onPress={() => handleEditMethod(method)}>
            <IconEntypo name="edit" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.methodText}>
            {`${method.type} - Ends with *${method.cardNumber.slice(-4)} - Exp: ${method.expirationDate}`}
          </Text>
          <TouchableOpacity onPress={() => handleDeleteMethod(method.id)}>
            <IconEntypo name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      {paymentMethods.length === 0 && (
        <Text style={styles.noMethodText}>You have no saved payment methods.</Text>
      )}
      <Button title="Add New Payment Method" onPress={handleCreateMethod} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>{selectedMethod ? "Edit Payment Method:" : "Add New Payment Method:"}</Text>
          {selectedMethod ? (
            <Text style={styles.fixedTypeText}>{selectedMethod.type}</Text>
          ) : (
            <RNPickerSelect
              onValueChange={(value) => handleChange('type', value)}
              items={[
                { label: 'Visa', value: 'Visa' },
                { label: 'MasterCard', value: 'MasterCard' },
                { label: 'American Express', value: 'AmericanExpress' }
              ]}
              style={styles.pickerSelectStyles}
              placeholder={{ label: "Select a card type", value: null }}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <IconEntypo name="chevron-down" size={20} color="gray" />;
              }}
            />
          )}
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('cardNumber', value)}
            value={methodFormData.cardNumber}
            placeholder="Card Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('expirationDate', value)}
            value={methodFormData.expirationDate}
            placeholder="Expiration Date (MM/YY)"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('cvv', value)}
            value={methodFormData.cvv}
            placeholder="CVV"
          />
          <Button title="Save" onPress={handleSubmit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
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
  backButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  methodEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.cardBackground,
    marginBottom: 10,
  },
  methodText: {
    fontSize: 16,
    flex: 1,
    paddingHorizontal: 10, // Added padding for text separation
  },
  fixedTypeText: {
    fontSize: 16,
    color: '#666', // Make it slightly dim to indicate it's not editable
    marginBottom: 10,
  },
  noMethodText: {
    fontStyle: 'italic',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  modalView: {
    margin: 20,
    marginTop: 250, // Adjust modal position
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '80%',
    alignSelf: 'center'
  },
  backText: {
    fontSize: 16,
    color: 'black',
  },  
  pickerSelectStyles: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
    },
    iconContainer: {
      top: 20,
      right: 15,
    },
  },
});

export default PaymentMethod;

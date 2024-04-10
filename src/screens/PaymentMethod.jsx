import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import PaymentMethodSelectionModal from '../components/PaymentMethodSelectionModal';
import PaymentMethodDetailsModal from '../components/PaymentMethodDetailsModal';
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";

const PaymentMethod = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodModalVisible, setMethodModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [methodFormData, setMethodFormData] = useState({
    type: 'Visa', // Default type
    email: '',
    password: '',
    cardNumber: '',
    cvv: '',
    ExpirationDate: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setUser(userData);
      setLoading(false);
      setPaymentMethods(userData.paymentMethods || []); // Assuming payment methods are stored in an array
    };

    fetchUserData();
  }, []);

  const handleMethodSelection = (methodType) => {
    setMethodFormData({
      ...methodFormData,
      type: methodType,
    });
    setMethodModalVisible(false);
    setDetailsModalVisible(true);
  };

  const handleEditMethod = (method) => {
    setSelectedMethod(method);
    setMethodFormData(method);
    setDetailsModalVisible(true);
  };


  const handleDeleteMethod = async (method) => {
    try {
      await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
        ...user,
        paymentMethods: paymentMethods.filter(m => m.id !== method.id)
      });
      setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => {
    setMethodFormData({
      ...methodFormData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedMethod) {
        // Update existing payment method
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          paymentMethods: paymentMethods.map((method) => method.id === selectedMethod.id ? methodFormData : method)
        });
        setPaymentMethods(paymentMethods.map((method) => method.id === selectedMethod.id ? methodFormData : method));
      } else {
        // Create new payment method
        const newMethod = {
          id: Date.now().toString(),
          ...methodFormData,
        };
        await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, {
          ...user,
          paymentMethods: [...paymentMethods, newMethod]
        });
        setPaymentMethods([...paymentMethods, newMethod]);
      }
      setDetailsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mis métodos de pago:</Text>
      {paymentMethods.length > 0 ? (
        paymentMethods.map((method, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => handleEditMethod(method)}>
              <View style={styles.methodContainer}>
                <Text style={styles.methodText}>{method.type}</Text>
                {/* Add more fields to display here */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteMethod(method)}>
              <View style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noMethodText}>No tienes métodos de pago guardados.</Text>
      )}
      <Button title="Agregar nuevo método de pago" onPress={() => setMethodModalVisible(true)} />
      
      {/* Método de selección de método de pago */}
      <PaymentMethodSelectionModal 
        visible={methodModalVisible} 
        onSelectMethod={handleMethodSelection} 
        onClose={() => setMethodModalVisible(false)} 
      />
      
      {/* Método de detalles de método de pago */}
      <PaymentMethodDetailsModal 
        visible={detailsModalVisible} 
        method={methodFormData.type}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={() => setDetailsModalVisible(false)} 
      />
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
  methodContainer: {
    backgroundColor: theme.colors.cardBackground,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  methodText: {
    fontSize: 16,
  },
  noMethodText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default PaymentMethod;

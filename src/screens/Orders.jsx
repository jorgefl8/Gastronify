import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import theme from "../theme.js";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import moment from "moment";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      // Obtenemos los pedidos de Firestore
      const ordersRef = collection(
        FirestoreDB,
        "Users",
        FirebaseAuth.currentUser.uid,
        "orders"
      );
      const snapshot = await getDocs(ordersRef);
      const initialOrders = snapshot.docs.map((doc) => {
        const orderData = doc.data();
        const totalPrice = orderData.itemsOrdered.reduce((acc, product) => {
          const price = parseFloat(product.Price);
          const quantity = parseFloat(product.Quantity);
          return acc + price * quantity;
        }, 0);
        return {
          id: doc.id,
          ...orderData,
          totalPrice,
          countdown: calculateCountdown(orderData.Date.seconds),
        };
      });
      setOrderList(initialOrders);
      // Actualiza la cuenta atrás cada segundo
      const intervalId = setInterval(() => {
        const updatedOrders = initialOrders.map((order) => ({
          ...order,
          countdown: calculateCountdown(order.Date.seconds),
        }));
        setOrderList(updatedOrders);
      }, 5000);

      return () => clearInterval(intervalId);
    };
    fetchUserData();
  }, []);

  // Función para calcular la cuenta atrás
  const calculateCountdown = (orderSeconds) => {
    const now = moment();
    const orderTime = moment.unix(orderSeconds);
    const duration = moment.duration(orderTime.diff(now));
    const minutesPassed = duration.asMinutes();
    if (minutesPassed >= 30) {
      return "Order should be delivered";
    } else {
      return `Time left to deliver: ${30 + Math.ceil(minutesPassed)} min`;
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(
        doc(
          FirestoreDB,
          "Users",
          FirebaseAuth.currentUser.uid,
          "orders",
          orderId
        )
      );
      setOrderList(orderList.filter((order) => order.id !== orderId));
      Alert.alert("Success", "Order successfully deleted.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete the order.");
    }
  };
  const convertTimestampToMoment = (timestamp) => {
    return moment.unix(timestamp.seconds); // Convierte el Timestamp a un objeto Moment
  };
  const formatDate = (timestamp) => {
    const dateMoment = convertTimestampToMoment(timestamp);
    return dateMoment.format("MMMM Do YYYY, h:mm:ss a"); // Formatea la fecha como "April 20th 2024, 7:06:35 pm"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Orders:</Text>
      {orderList.length > 0 ? (
        orderList.map((order, index) => (
          <View key={index} style={styles.orderContainer}>
            <Text style={styles.orderText}>
              <Text style={styles.label}>
                Date Order: {formatDate(order.Date)}
              </Text>
            </Text>
            {order.itemsOrdered.map((item, idx) => (
              <Text key={idx} style={styles.orderText}>
                <Text style={styles.label}>Product:</Text> {item.Name}
                <Text style={styles.label}> Quantity:</Text> {item.Quantity}
                <Text style={styles.label}> Price:</Text> {item.Price}€
              </Text>
            ))}
            <Text style={styles.orderText}>
              <Text style={styles.label}>Total Price: </Text>
              {order.totalPrice}€
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.label}>{order.countdown}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => handleDeleteOrder(order.id)}
              style={styles.trashIcon}
            >
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noOrderText}>You have no orders.</Text>
      )}
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
  orderContainer: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  label: {
    fontWeight: "bold",
  },
  noOrderText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  trashIcon: {
    marginTop: 10,
  },
});

export default Orders;

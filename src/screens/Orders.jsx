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

const Orders = ({back}) => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(
        FirestoreDB,
        "Users",
        FirebaseAuth.currentUser.uid,
        "orders"
      );
      const snapshot = await getDocs(ordersRef);
      const initialOrders = snapshot.docs.map((doc) => {
        const orderData = doc.data();
        const totalPrice = orderData.itemsOrdered.reduce((acc, product) => acc + parseFloat(product.Price) * parseFloat(product.Quantity), 0);
        return {
          id: doc.id,
          ...orderData,
          totalPrice,
          countdown: calculateCountdown(orderData.Date.seconds)
        };
      });
      setOrderList(initialOrders);
    };

    fetchOrders();

    const intervalId = setInterval(() => {
      setOrderList(currentOrders => currentOrders.map(order => ({
        ...order,
        countdown: calculateCountdown(order.Date.seconds)
      })));
    }, 60000); // Actualiza cada minuto

    return () => clearInterval(intervalId);
  }, []);

  const calculateCountdown = (orderSeconds) => {
    const now = moment();
    const orderTime = moment.unix(orderSeconds);
    const timeElapsed = moment.duration(now.diff(orderTime));
    const minutesPassed = timeElapsed.asMinutes();

    if (minutesPassed >= 30) {
      return "Order should be delivered";
    } else {
      return `Time left to deliver: ${Math.ceil(30 - minutesPassed)} min`;
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(FirestoreDB, "Users", FirebaseAuth.currentUser.uid, "orders", orderId));
      setOrderList(prevOrders => prevOrders.filter(order => order.id !== orderId));
      Alert.alert("Success", "Order successfully deleted.");
    } catch (error) {
      console.error("Error deleting order:", error);
      Alert.alert("Error", "Failed to delete the order.");
    }
  };

  const renderOrder = ({ item: order }) => (
    <View style={styles.orderContainer}>

      <Text style={styles.orderText}>
        <Text style={styles.label}>Date Order:</Text> {moment.unix(order.Date.seconds).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
      {order.itemsOrdered.map((item, idx) => (
        <Text key={idx} style={styles.orderText}>
          <Text style={styles.label}>Product:</Text> {item.Name}
          <Text style={styles.label}> Quantity:</Text> {item.Quantity}
          <Text style={styles.label}> Price:</Text> {`${item.Price}€`}
        </Text>
      ))}
      <Text style={styles.orderText}>
        <Text style={styles.label}>Total Price:</Text> {`${order.totalPrice}€`}
      </Text>
      <Text style={styles.orderText}>
        <Text style={styles.label}>{order.countdown}</Text>
      </Text>
      <TouchableOpacity onPress={() => handleDeleteOrder(order.id)} style={styles.trashIcon}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.containerView}>
    <TouchableOpacity
    onPress={() => back()}
    style={styles.backButton}
  >
    <Text style={styles.backText}>Back</Text>
  </TouchableOpacity>
  
    <FlatList
      data={orderList}
      keyExtractor={item => item.id}
      renderItem={renderOrder}
      ListHeaderComponent={() => <Text style={styles.heading}>My Orders:</Text>}
      contentContainerStyle={styles.container}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  containerView: {
    flex: 1,
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
  backButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 1,
  }
});

export default Orders;

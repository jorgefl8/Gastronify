import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import theme from "../theme.js";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import moment from 'moment'; // Necesitas instalar moment para esto: npm install moment

const Books = () => {
  const [bookList, setBookList] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const booksRef = collection(
        FirestoreDB,
        "Users",
        FirebaseAuth.currentUser.uid,
        "books"
      );
      const snapshot = await getDocs(booksRef);
      const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookList(books);
      setupCountdowns(books);

    };
    fetchUserData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteDoc(
        doc(FirestoreDB, "Users", FirebaseAuth.currentUser.uid, "books", bookId)
      );
      setBookList(bookList.filter((book) => book.id !== bookId));
      Alert.alert("Success", "Booking successfully deleted.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete the booking.");
    }
  };
  const setupCountdowns = (books) => {
    const ids = books.map(book => book.id);
    ids.forEach(id => {
      const book = books.find(b => b.id === id);
      const interval = setInterval(() => updateCountdown(id, book.Date), 1000);
      return () => clearInterval(interval);
    });
  };

  const updateCountdown = (id, date) => {
    const now = moment();
    const endDate = moment(date);
    const duration = moment.duration(endDate.diff(now));
    const timeLeft = `${duration.days()} days ${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds`;
    setCountdowns(prev => ({ ...prev, [id]: timeLeft }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings:</Text>
      {bookList.length > 0 ? (
        bookList.map((book, index) => (
          <View key={index} style={styles.bookContainer}>
            <Text style={styles.bookText}><Text style={styles.label}>Name:</Text> {book.Name}</Text>
            <Text style={styles.bookText}><Text style={styles.label}>Date:</Text> {book.Date}</Text>
            <Text style={styles.bookText}><Text style={styles.label}>Time left:</Text> {countdowns[book.id]}</Text>
            <Text style={styles.bookText}><Text style={styles.label}>People:</Text> {book.People}</Text>
            <Text style={styles.bookText}><Text style={styles.label}>PhoneNumber:</Text> {book.PhoneNumber}</Text>
            <TouchableOpacity onPress={() => handleDeleteBook(book.id)} style={styles.trashIcon}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noBookText}>You have no saved bookings.</Text>
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
    bookContainer: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    bookText: {
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    label: {
      fontWeight: 'bold',
    },
    noBookText: {
      fontSize: 16,
      fontStyle: "italic",
      marginBottom: 10,
    },
    trashIcon: {
      marginTop: 10, 
    }
  });

export default Books;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import theme from "../theme.js";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import moment from "moment";

const Books = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(
        FirestoreDB,
        "Users",
        FirebaseAuth.currentUser.uid,
        "books"
      );
      const snapshot = await getDocs(booksRef);
      const books = snapshot.docs.map((doc) => {
        const bookData = doc.data();
        return {
          id: doc.id,
          ...bookData,
          countdown: calculateCountdown(bookData.Date)
        };
      });
      setBookList(books);
      const intervalId = setInterval(() => {
        setBookList(currentBooks => currentBooks.map(book => ({
          ...book,
          countdown: calculateCountdown(book.Date)
        })));
      }, 1000); // Actualiza cada minuto
      return () => clearInterval(intervalId);
    };

    fetchBooks();
  }, []);

  const calculateCountdown = (date) => {
    const now = moment();
    const reservationDate = moment(date);
    const duration = moment.duration(reservationDate.diff(now));
    if (duration.asMinutes() <= 0) {
      return "Hope you enjoyed the meal!.";
    } else {
      return `${duration.days()} days ${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds `;
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteDoc(doc(FirestoreDB, "Users", FirebaseAuth.currentUser.uid, "books", bookId));
      setBookList(prevBooks => prevBooks.filter(book => book.id !== bookId));
      Alert.alert("Success", "Booking successfully deleted.");
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete the booking.");
    }
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookContainer}>
      <Text style={styles.bookText}><Text style={styles.label}>Name:</Text> {item.Name}</Text>
      <Text style={styles.bookText}><Text style={styles.label}>Date:</Text> {moment(item.Date).format("MMMM Do YYYY, h:mm:ss a")}</Text>
      <Text style={styles.bookText}><Text style={styles.label}>Time left:</Text> {item.countdown}</Text>
      <Text style={styles.bookText}><Text style={styles.label}>People:</Text> {item.People}</Text>
      <Text style={styles.bookText}><Text style={styles.label}>PhoneNumber:</Text> {item.PhoneNumber}</Text>
      <TouchableOpacity onPress={() => handleDeleteBook(item.id)} style={styles.trashIcon}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={bookList}
      keyExtractor={item => item.id.toString()}
      renderItem={renderBook}
      ListHeaderComponent={() => <Text style={styles.heading}>My Bookings:</Text>}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
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
  trashIcon: {
    marginTop: 10,
  },
});

export default Books;

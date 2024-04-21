import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import RNPickerSelect from "react-native-picker-select"; // Importación del componente
import Icon from "react-native-vector-icons/Feather"; // Asegúrate de tener esta librería instalada
import theme from "../theme.js";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const BooksForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("1");
  const [time, setTime] = useState("13:00");

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };
  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (selectedDate === null) {
      Alert.alert("Validation Error", "Please select a date.");
      return false;
    }
    if (trimmedName.length === 0) {
      Alert.alert("Validation Error", "Please enter a name.");
      return false;
    }
    if (trimmedPhone.length != 9) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid phone number with 9 digits."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    const DataBooking = {
      Date: selectedDate,
      Name: name,
      PhoneNumber: phone,
      Hour: time,
      People: people,
    };
    console.log(DataBooking);
    checkGlobalBooking(DataBooking).then((exists) => {
      if (exists) {
        Alert.alert("Booking Error", "A booking with the same date, hour and number of people already exists.");
      } else {
        uploadBooking(DataBooking);
      }
    });
  };
  async function checkGlobalBooking(bookingData) {
    const bookingRef = collection(FirestoreDB, "AllBookings");
    const querySnapshot = await getDocs(query(bookingRef, where("Date", "==", bookingData.Date), where("People", "==", bookingData.People), where("Hour", "==", bookingData.Hour)));
    return !querySnapshot.empty; // returns true if a booking exists with the same date and number of people
  }
  
  function uploadBooking(bookingData) {
    const userId = FirebaseAuth.currentUser.uid
      ? FirebaseAuth.currentUser.uid
      : null;
    if (!userId) {
      Alert.alert("Error", "No authenticated user found.");
      return;
    }
    addDoc(collection(FirestoreDB, "AllBookings"), bookingData);
    addDoc(collection(FirestoreDB, "Users", userId, "books"), bookingData)
      .then(() => {
        console.log("Reservation successfully written!");
        Alert.alert("Reservation Completed", "We are waiting for you!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        Alert.alert("Error", "Failed to complete the reservation.");
      });
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        style={styles.calendarview}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: theme.colors.secondary,
          },
        }}
      />
      <View style={styles.separator} />
      <View style={styles.campos}>
        <Text style={styles.text}>Name: </Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.campos}>
        <Text style={styles.text}>Phone Number: </Text>
        <TextInput
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
      </View>
      <View style={styles.separator} />
      <View>
        <Text style={styles.label}>Number of people:</Text>
        <RNPickerSelect
          onValueChange={(value) => setPeople(value)}
          items={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]}
          value={people}
          useNativeAndroidPickerStyle={false} // use this to style as needed
          style={pickerSelectStyles}
          Icon={() => {
            return <Icon name="chevron-down" size={24} color="gray" />;
          }}
        />
      </View>
      <View style={styles.separator} />
      <View>
        <Text style={styles.label}>Reservation Time:</Text>
        <RNPickerSelect
          onValueChange={(value) => setTime(value)}
          items={[
            { label: "13:00", value: "13:00" },
            { label: "13:30", value: "13:30" },
            { label: "14:00", value: "14:00" },
            { label: "14:30", value: "14:30" },
            { label: "15:00", value: "15:00" },
            { label: "15:30", value: "15:30" },
            { label: "20:00", value: "20:00" },
            { label: "20:30", value: "20:30" },
            { label: "21:00", value: "21:00" },
            { label: "21:30", value: "21:30" },
            { label: "22:00", value: "22:00" },
            { label: "22:30", value: "22:30" },
            { label: "23:00", value: "23:00" },
            { label: "23:30", value: "23:30" },
          ]}
          value={time}
          useNativeAndroidPickerStyle={false} // use this to style as needed
          style={pickerSelectStyles}
          Icon={() => {
            return <Icon name="chevron-down" size={24} color="gray" />;
          }}
        />
      </View>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>BOOK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 12,
    margin: 8,
    marginBottom: 0,
  },
  calendarview: {
    borderRadius: 10,
  },
  campos: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: theme.fontWeights.normal,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  separator: {
    height: 20,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
  iconContainer: {
    top: 5,
    right: 15,
  },
});

export default BooksForm;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import DatePicker from 'react-native-date-picker';
import { Link } from "react-router-native";

const Register = () => {
  const auth = FirebaseAuth;
  const db = FirestoreDB;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          //console.log("Usuario registrado: ", user.uid);
          setDoc(doc(db, "Users", user.uid), {
            LastName: lastName,
            Name: name,
            Email: email,
            Date: date,
            TelephoneNumber: telephoneNumber,
          });
        })
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Telephone Number"
        value={telephoneNumber}
        onChangeText={setTelephoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Link to="/login" style={styles.buttonCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </Link>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonCancel: {
    width: 300,
    height: 50,
    marginTop: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    height: 10,
  },
  registerLink: {
    color: "blue",
  }
});

export default Register;

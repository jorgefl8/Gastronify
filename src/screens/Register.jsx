import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link,useNavigate } from "react-router-native";
import { Timestamp } from "firebase/firestore";
import theme from "../theme.js";

const Register = () => {
  const auth = FirebaseAuth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [prefix, setPrefix] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          const dateOfBirth = new Date(year, month - 1, day);
          const timestamp = Timestamp.fromDate(dateOfBirth); // Convertir a Timestamp
          //console.log("Usuario registrado: ", user.uid);
          setDoc(doc(FirestoreDB, "Users", user.uid), {
            LastName: lastName,
            Name: name,
            Email: email,
            Date: timestamp,
            Prefix: prefix,
            TelephoneNumber: telephoneNumber,
          });
        })
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const navigate = useNavigate(); 


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
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="Day"
          value={day}
          onChangeText={setDay}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="Month"
          value={month}
          onChangeText={setMonth}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.phoneInput]}
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.phoneContainer}>
      <TextInput
          style={[styles.input, styles.prefixPicker]}
          placeholder="+34"
          value={prefix}
          onChangeText={setPrefix}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.phoneInput]}
          placeholder="123456789"
          value={telephoneNumber}
          onChangeText={setTelephoneNumber}
          keyboardType="phone-pad"
        />
      </View>
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
      <TouchableOpacity style={styles.buttonCancel} onPress={() => navigate("/login")}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundColor,
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
    width: "100%",
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
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  }, 
  phoneInput: {
    flex: 1,
  }, 
  prefixPicker: {
    width: 70,
    marginRight: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    width: "100%"
  }
});

export default Register;

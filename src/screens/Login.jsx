import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/Ionicons";

const Login = () => {
  const auth = FirebaseAuth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginFacebook = async () => {};

  const handleLoginGoogle = async () => {};
  const navigate = useNavigate(); 

  const handleLoginApple = async () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.separatorv2} />
      <Text style={styles.text}>Accede con</Text>
      <View style={styles.buttonLoginContainer}>
        <View style={styles.buttonLoggers}>
          <TouchableOpacity
            style={styles.iconGoogle}
            onPress={handleLoginGoogle}
          >
            <Icon
              name="logo-google"
              size={40}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonLoggers}>
          <TouchableOpacity
            style={styles.iconFacebook}
            onPress={handleLoginApple}
          >
            <Icon
              name="logo-apple"
              size={40}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonLoggers}>
          <TouchableOpacity
            style={styles.iconFacebook}
            onPress={handleLoginFacebook}
          >
            <Icon
              name="logo-facebook"
              size={40}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separatorv2} />
      <Text>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigate("/register")}>
        <Text style={styles.registerLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: width - 40, // Usamos el ancho de la pantalla menos el padding
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    margin: 10, // Espacio entre el icono y el texto del botón
  },
  separator: {
    height: 10,
  },
  separatorv2: {
    marginTop: 10,
    backgroundColor: "#ccc",
    height: 1, // Altura de 1 para crear la línea
    width: "100%", // Ocupa todo el ancho disponible
  },
  registerLink: {
    color: "blue",
  },
  buttonLoginContainer: {
    flexDirection: "row",
    width: width - 40, // Usamos el ancho de la pantalla menos el padding
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLoggers: {
    flexDirection: "row",
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
    marginHorizontal: 10,
  },
  textOr: {
    marginHorizontal: 10,
  },
});

export default Login;

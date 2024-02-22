import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { FirebaseAuth } from "./firebase/firebaseconfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
    const auth = FirebaseAuth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const handleLoginFacebook = async () => { }

    const handleLoginGoogle = async () => { }

    const handleRegister = async () => {
        try {
            // Intentar registrar al usuario
            console.log("Success")
            await createUserWithEmailAndPassword(auth, email, password);
            // No llamar a onLogin(true) aquí, ya que el registro no significa que el usuario ha iniciado sesión
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
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
                <View style={styles.separator} />

                <Text style={styles.registerText}>
                    <TouchableOpacity onPress={handleRegister} style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Sign Up</Text></Text>
                    </TouchableOpacity>
                </Text>

            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
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
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    separator: {
        height: 10,
    },
    buttonRegister: {
        width: "100%",
        height: 50,
        backgroundColor: "#e1e1e1",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    registerLink: {
        color: "blue",
    }
});

export default LoginScreen;

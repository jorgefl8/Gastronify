import React from "react";
import { Text, View, handleLogout, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../theme";

const Home = () => {

    return (
        <View style={styles.container}>
            <View style={styles.separator} />
                <Image style={styles.image} source={require('../../assets/restaurant.jpg')} />
            <View style={styles.separator} />
            <View>
                <Text style={styles.title}>RESTAURANT APP</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    title: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
    },
    text: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal,
    },
    button: {
        width: "100%",
        height: 30,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        margin: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        margin: 6,
    },
    separator: {
        height: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
});

export default Home;
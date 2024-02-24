import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import theme from "../theme";

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.title} >
                <Image style={styles.image} source={require('../../assets/appicon.png')} />
                <Text style={styles.textTitle}>RESTAURANT APP</Text>
            </View>
            <View style={styles.separator} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textTitle: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
    },
    text: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal,
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
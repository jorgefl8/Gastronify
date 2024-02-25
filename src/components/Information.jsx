import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import theme from "../theme";

const Information = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Sobre nosotros...</Text>
            <Text style={styles.text}>Aquí va la información de contacto, ubicación, horarios, etc.</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 16,
    },
    novedadesContainer: {
        paddingHorizontal: 16,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: theme.fonts.special,
    },
    imageCollage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
        width: '48%',
        height: 150,
        marginBottom: 10,
    },
});

export default Information;
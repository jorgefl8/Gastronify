import React from "react";
import { Text, StyleSheet, View } from "react-native";
import theme from "../theme";

const Information = () => {
    return (
        <View>
            <Text style={styles.sectionTitle}>Sobre nosotros...</Text>
            <Text style={styles.text}>Aquí va la información de contacto, ubicación, horarios, etc.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: theme.fonts.special,
    }
});

export default Information;
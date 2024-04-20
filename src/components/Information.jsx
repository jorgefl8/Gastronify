import React from "react";
import { Text, StyleSheet, View } from "react-native";
import theme from "../theme";

import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de instalar la biblioteca de íconos

const Information = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>About Us</Text>
            <View style={styles.contactInfo}>
                <FontAwesome name="map-marker" size={23} color={theme.colors.secondary} />
                <Text style={styles.text}>   Av. Reina Mercedes, 21</Text>
            </View>
            <View style={styles.contactInfo}>
                <FontAwesome name="phone" size={22} color={theme.colors.secondary} />
                <Text style={styles.text}>  666 56 60 21 / 952 34 07 11 </Text>
            </View>
            <View style={styles.contactInfo}>
                <FontAwesome name="envelope" size={20} color={theme.colors.secondary} />
                <Text style={styles.text}> cmapp2324@gmail.com</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 212, 56, 0.5)', // Amarillo transparente
        padding: 16,
        marginBottom: 20,
        borderRadius: 8,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: theme.fonts.special,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: theme.colors.textSecondary,
    },
});

export default Information;
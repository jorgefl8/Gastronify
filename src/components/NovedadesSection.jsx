import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../theme";


const NovedadesSection = () => {
    return (
        <View style={styles.novedadesContainer}>
            <Text style={styles.sectionTitle}>¡ NOVEDADES !</Text>

            <View style={styles.imageCollage}>
                <Image source={require('../../assets/novedad5.jpg')} style={styles.image} />
                <Image source={require('../../assets/novedad1.jpg')} style={styles.image} />
                <Image source={require('../../assets/novedad2.jpg')} style={styles.image} />
                <Image source={require('../../assets/novedad4.jpg')} style={styles.image} />
            </View>
        </View>
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

export default NovedadesSection;  
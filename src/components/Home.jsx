import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../theme";
import { useNavigate } from 'react-router-native';
import NovedadesSection from "./NovedadesSection";
import Information from "./Information";


const Home = () => {
    const navigate = useNavigate();

    const handleReservarCita = () => {
        // Navegar a la pantalla de calendario
        navigate('/reservarcita');
    };

    const handleHacerPedido = () => {
        // Navegar a la pantalla de calendario
        navigate('/Menu');
    };

    return (
        <View style={styles.container}>
            <View style={styles.title} >
                <Image style={styles.image} source={require('../../assets/appicon.png')} />
                <Text style={styles.textTitle}>RESTAURANT APP</Text>
            </View>
            <View style={styles.separator} />
            <View>
                <Text style={styles.text}>Welcome to our App!</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleHacerPedido}>
                    <Text style={styles.buttonText}>¡Pide ya!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleReservarCita}>
                    <Text style={styles.buttonText}>Haz tu reserva</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View>
                <NovedadesSection/>
            </View>
            <View style={styles.separator} />
            <View>
                <Information/>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
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
        textAlign: "center",
    },
    separator: {
        height: 15,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 400,
      },
      button: {
        flex: 1,
        backgroundColor: theme.colors.red,
        padding: 8,
        borderRadius: 5,
        margin: 6, 
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
});

export default Home;
import React from "react";
import { Text, View, StyleSheet, Image, ScrollView , TouchableOpacity} from "react-native";
import theme from "../theme";
import NewsSection from "../components/NewsSection";
import Information from "../components/Information";
import { Link } from "react-router-native";


const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image style={styles.image} source={require('../../assets/appicon.png')} />
                <Text style={styles.textHeader}>GASTRONIFY</Text>
            </View>
            <ScrollView>
                <Text style={styles.textSubheader}>Welcome to our app!</Text>
                <View style={styles.separator} />
                <View style={styles.buttonContainer}>
                    <Link to="/menu" style={styles.button} component={TouchableOpacity}>
                        <Text style={styles.buttonText}>Order now!</Text>
                    </Link>
                    <Link to="/books" style={styles.button} component={TouchableOpacity}>
                        <Text style={styles.buttonText}>Make a Reservation</Text>
                    </Link>
                </View>
                <View style={styles.separator} />
                <NewsSection />
                <View style={styles.separator} />
                <Information />
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
        paddingHorizontal: 20,
        paddingTop: 5
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        marginTop: 10,
    },
    textHeader: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
    },
    textSubheader: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.normal,
        textAlign: "center",
    },
    separator: {
        height: 15,
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    button: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
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
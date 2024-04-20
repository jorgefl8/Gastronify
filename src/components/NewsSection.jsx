import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Carousel from 'react-native-snap-carousel';
import theme from "../theme";

const NewsSection = () => {
    const newsData = [
        { id: 1, image: require('../../assets/novedad7.jpg') },
        { id: 2, image: require('../../assets/novedad1.jpg') },
        { id: 3, image: require('../../assets/novedad2.jpg') },
        { id: 4, image: require('../../assets/novedad3.jpg') },
        { id: 5, image: require('../../assets/novedad5.jpg') },
        { id: 6, image: require('../../assets/novedad8.jpg') },
        { id: 7, image: require('../../assets/novedad4.jpg') },
        { id: 8, image: require('../../assets/novedad6.jpg') },
    ];
    const newsData2 = [
        { id: 5, image: require('../../assets/novedad5.jpg') },
        { id: 6, image: require('../../assets/novedad8.jpg') },
        { id: 7, image: require('../../assets/novedad4.jpg') },
        { id: 8, image: require('../../assets/novedad6.jpg') },
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.novedadesContainer}>
                <Text style={styles.sectionTitle}> N E W S </Text>

                <Carousel
                    data={newsData}
                    renderItem={renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={3000}
                />
            </View>

            <View style={styles.novedadesContainer}>
                <Carousel
                    data={newsData2}
                    renderItem={renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={3000}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    novedadesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 15,
        fontFamily: theme.fonts.special,
    },
    imageContainer: {
        width: 300,
        height: 180,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default NewsSection;

import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import Swiper from 'react-native-swiper';
import theme from "../theme";

const windowWidth = Dimensions.get('window').width;

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

    const renderNewsItem = (data) => {
        return data.map(item => (
            <View key={item.id} style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.newsContainer}>
                <Text style={styles.sectionTitle}> N E W S </Text>

                <View style={styles.swiperContainer}>
                    <Swiper
                        autoplay={true}
                        autoplayTimeout={3}
                        loop={true}
                        showsPagination={false}
                        style={styles.swiper}
                    >
                        {renderNewsItem(newsData)}
                    </Swiper>
                </View>
            </View>

            <View style={styles.newsContainer}>
                <View style={styles.swiperContainer}>
                    <Swiper
                        autoplay={true}
                        autoplayTimeout={3}
                        loop={true}
                        showsPagination={false}
                        style={styles.swiper}
                    >
                        {renderNewsItem(newsData2)}
                    </Swiper>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth, //que ocupe todo el ancho de la 
        marginBottom: 5,
    },
    swiperContainer: {
        width: windowWidth / 1.5, //que ocupe 1/3 del ancho de la pantalla
        height: 180,
        overflow: 'hidden', 
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
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    swiper: {}
});

export default NewsSection;

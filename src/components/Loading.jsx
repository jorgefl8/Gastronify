import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import React from 'react';
import { View, StyleSheet } from 'react-native';
const Loading = () => (
    <View style={styles.container}>
        <Animatable.Text animation="rotate" iterationCount="infinite" ><Icon name="sync-circle" size={70}/></Animatable.Text>
    </View>
);
export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
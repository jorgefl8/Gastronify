import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native';
import { View } from 'react-native-animatable';
import theme from '../theme.js';
import { Picker } from '@react-native-picker/picker';
import functions from "../../firebase/firebaseUtils.js";
import {FirestoreDB} from "../../firebase/firebaseconfig.js";

const BooksForm = () => {
    const db = FirestoreDB;
    const [selectedDate, setSelectedDate] = useState(null);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [numPersonas, setNumPersonas] = useState(1);
    const [hora, setHora] = useState('12:00');

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    const handleSubmit = () => {
        console.log('Fecha seleccionada:', selectedDate);
        console.log('Nombre:', nombre);
        console.log('Teléfono:', telefono);
        console.log('Número de personas:', numPersonas);
        console.log('Hora:', hora);
        const DataBooking = {"Date":selectedDate, "Name": nombre,"TelephoneNumber":numPersonas, "Hour":hora};
        functions.uploadDoc(db, "Bookings", DataBooking);
    };
    return (
        <ScrollView style={styles.container}>

            <Calendar onDayPress={handleDateSelect} />
            <View style={styles.separator} />
            <Text style={styles.text}>Fecha seleccionada: {selectedDate}</Text>
            <View style={styles.separator} />
            <View style={styles.campos}>
                <Text style={styles.text}>Nombre: </Text>
                <TextInput
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChangeText={(text) => setNombre(text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.separator} />
            <View style={styles.campos}>
                <Text style={styles.text}>Teléfono: </Text>
                <TextInput
                    placeholder="Ingrese su número de teléfono"
                    value={telefono}
                    onChangeText={(text) => setTelefono(text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.separator} />
            <View style={styles.campos}>
                <Text style={styles.text}>Número de Personas: </Text>
                <Picker selectedValue={numPersonas} onValueChange={(itemValue) => setNumPersonas(itemValue)}
                    style={styles.picker}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
            </View>
            <View style={styles.separator} />
            <View style={styles.campos}>
                <Text style={styles.text}>Hora: </Text>
                <Picker selectedValue={hora} onValueChange={(itemValue) => setHora(itemValue)}
                    style={styles.picker} itemStyle={styles.itemStyle}>
                    <Picker.Item label="13:00" value="13:00" />
                    <Picker.Item label="13:30" value="13:30" />
                    <Picker.Item label="14:00" value="14:00" />
                    <Picker.Item label="14:30" value="14:30" />
                    <Picker.Item label="15:00" value="15:00" />
                    <Picker.Item label="15:30" value="15:30" />
                    <Picker.Item label="21:00" value="21:00" />
                    <Picker.Item label="21:30" value="21:30" />
                    <Picker.Item label="22:00" value="22:00" />
                    <Picker.Item label="22:30" value="22:30" />
                    <Picker.Item label="23:00" value="23:00" />
                </Picker>
            </View>

            <View style={styles.separator} />
            <Button title="Reservar Cita" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 20,
    },
    text: {
        color: theme.colors.textPrimary,
        fontSize: 16,
        fontWeight: theme.fontWeights.normal,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        flex: 1,
    },
    campos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        height: 15,
    },
    picker: {
        height: 40,
        flex: 1,
        color: 'rgba(0, 0, 0, 0.5)', // Color del texto con transparencia
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    itemStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});

export default BooksForm;

import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native';
import { View } from 'react-native-animatable';
import theme from '../theme.js';
import { Picker } from '@react-native-picker/picker';
import functions from "../../firebase/firebaseUtils.js";

const BooksForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [people, setPeople] = useState(1);
    const [time, setTime] = useState('12:00');

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    const handleSubmit = () => {
        console.log('Selected Date:', selectedDate);
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('People:', people);
        console.log('Time:', time);
        const DataBooking = { "Date": selectedDate, "Name": name, "PhoneNumber": phone, "Hour": time, "People": people };
        functions.uploadDoc("Bookings", DataBooking);
        Alert.alert(
            "Reservation Completed",
            "We are waiting for you!",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
    };
    return (
            <View style={styles.container}>
                <Calendar onDayPress={handleDateSelect} style={styles.calendarview}
                    markedDates={{ [selectedDate]: { selected: true, selectedColor: theme.colors.secondary } }} />
                <View style={styles.separator} />
                <View style={styles.campos}>
                    <Text style={styles.text}>Name: </Text>
                    <TextInput
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.separator} />
                <View style={styles.campos}>
                    <Text style={styles.text}>Phone Number: </Text>
                    <TextInput
                        placeholder="Enter your phone number"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.separator} />
                <View style={styles.campos}>
                    <Text style={styles.text}>Number of people: </Text>
                    <Picker selectedValue={people} onValueChange={(itemValue) => setPeople(itemValue)}
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
                    <Text style={styles.text}>Reservation Time:  </Text>
                    <Picker selectedValue={time} onValueChange={(itemValue) => setTime(itemValue)}
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
                {/* <Button title="Book" onPress={handleSubmit} style={styles.button} /> */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>   
                    <Text style={styles.buttonText}>BOOK</Text>
                </TouchableOpacity>
                
            </View>
    );
};

const styles = StyleSheet.create({
    calendarview: {
        borderRadius: 10,
    },
    container: {
        flexGrow: 1,
        padding: 12,
        margin: 8,
        marginBottom: 0,
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
    button: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
        padding: 8,
        borderRadius: 5,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: theme.fontWeights.bold,
        
    },
});

export default BooksForm;

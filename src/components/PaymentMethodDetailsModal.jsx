import React from 'react';
import { Modal, View, Button, StyleSheet, TextInput, Text } from 'react-native';

const PaymentMethodDetailsModal = ({ visible, method, onChange, onSubmit, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Payment Method Details:</Text>
          {method === 'Visa' || method === 'MasterCard' || method === 'Debit Card' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                onChangeText={(value) => onChange('cardNumber', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Proprietor's Name"
                onChangeText={(value) => onChange('cardHolderName', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Expiration Date"
                onChangeText={(value) => onChange('expirationDate', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                onChangeText={(value) => onChange('cvv', value)}
              />
            </>
          ) : null}
          {method === 'PayPal' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => onChange('email', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(value) => onChange('password', value)}
              />
            </>
          ) : null}
          <Button title="Save" onPress={onSubmit} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default PaymentMethodDetailsModal;

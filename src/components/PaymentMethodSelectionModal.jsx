// PaymentMethodSelectionModal.jsx
import React from 'react';
import { Modal, View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const PaymentMethodSelectionModal = ({ visible, onSelectMethod, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Selecciona un método de pago:</Text>
          <TouchableOpacity onPress={() => onSelectMethod('Visa')}>
            <View style={styles.methodOption}>
              <Text>Visa</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectMethod('MasterCard')}>
            <View style={styles.methodOption}>
              <Text>MasterCard</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectMethod('PayPal')}>
            <View style={styles.methodOption}>
              <Text>PayPal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectMethod('Cash')}>
            <View style={styles.methodOption}>
              <Text>Efectivo</Text>
            </View>
          </TouchableOpacity>
          <Button title="Cerrar" onPress={onClose} />
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
  methodOption: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
});

export default PaymentMethodSelectionModal;

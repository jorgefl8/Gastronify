import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import theme from "../theme.js";
import moment from "moment";

const ProfileSettings = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const DatUser = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setLoading(false);
      setUser(DatUser);
      setSelectedDate(DatUser?.Date?.toDate());
    };

    fetchMenu();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await functions.updateDocByUid("Users", FirebaseAuth.currentUser.uid, user);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    handleChange("Date", date);
    hideDatePicker();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.headerText}>Personal Data</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={user?.Name}
            onChangeText={(text) => handleChange("Name", text)}
          />
        </View>
        <View style={styles.separator}></View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={user?.LastName}
            onChangeText={(text) => handleChange("LastName", text)}
          />
        </View>
        <View style={styles.separator}></View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={user?.Email}
            onChangeText={(text) => handleChange("Email", text)}
          />
        </View>
        <View style={styles.separator}></View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.prefixInput}
              value={user?.Prefix}
              onChangeText={(text) => handleChange("Prefix", text)}
              placeholder="Prefix"
            />
            <TextInput
              style={styles.input}
              value={user?.TelephoneNumber}
              onChangeText={(text) => handleChange("TelephoneNumber", text)}
              placeholder="Telephone Number"
            />
          </View>
        </View>
        <View style={styles.separator}></View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Date Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.infoText}>
              {selectedDate ? formatDate(selectedDate) : "Select date"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}></View>

        {/* Modal para el Date Picker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Modify data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={props.handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.headerText}>Modify Data</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.infoText}>{user?.Name}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.infoText}>{user?.LastName}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text
                style={[styles.infoText, styles.emailText]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user?.Email}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Telephone:</Text>
              <View style={styles.phoneNumberContainer}>
                <Text style={styles.infoText}>{user?.Prefix}</Text>
                <Text style={styles.infoText}>{user?.TelephoneNumber}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.infoText}>
                {selectedDate ? formatDate(selectedDate) : "Select date"}
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <Button title="Save Changes" onPress={handleSaveChanges} />
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  profileInfo: {
    backgroundColor: theme.colors.backgroundColor,
    borderRadius: 10,
    padding: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    width: 120,
    marginRight: 5,
    fontSize: 16,
  },
  emailText: {
    flex: 1, // Esto permite que el texto ocupe todo el espacio disponible
    fontSize: 16,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  prefixInput: {
    width: 60,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default ProfileSettings;

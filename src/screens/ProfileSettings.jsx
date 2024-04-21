import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";
import { set } from "firebase/database";

const ProfileSettings = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      const DatUser = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setLoading(false);
      setUser(DatUser);
      // Llama a la función de guardar datos del usuario en Main
      //props.saveUserData(DatUser);
    };

    fetchMenu();
  }, []);

  const handleSaveChanges = async () => {
    try {
      // Actualiza los datos del usuario localmente en el estado
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

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={{ fontSize: 20 }}>
          Hi !, {user ? user.Name : "Usuario"}, welcome to your profile
        </Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.infoText}> Your data is: </Text>
        <Text style={styles.infoText}>
          Name: {user ? user.Name : "Not available yet"}
        </Text>
        <Text style={styles.infoText}>
          Last name: {user ? user.LastName : "Not available yet"}
        </Text>
        <Text style={styles.infoText}>
          Email:{user ? user.Email : "Email not available yet"}
        </Text>
        <Text style={styles.infoText}>
          Telephone Number: {user ? user.TelephoneNumber : "Not available yet"}
        </Text>
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
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={user?.Name}
              onChangeText={(text) => handleChange("Name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={user?.LastName}
              onChangeText={(text) => handleChange("LastName", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={user?.Email}
              onChangeText={(text) => handleChange("Email", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Telephone Number"
              value={user?.TelephoneNumber}
              onChangeText={(text) => handleChange("TelephoneNumber", text)}
            />
            <Button title="Save Changes" onPress={handleSaveChanges} />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="red"
            />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileInfo: {
    alignItems: "center",
    backgroundColor: theme.colors.backgroundColor,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "40%",
  },
  infoText: {
    marginBottom: 10,
    fontSize: theme.fontSizes.body,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 3,
    alignItems: "center",
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    padding: 8,
    borderRadius: 5,
    margin: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  Header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100, // Ajusta este valor según tus necesidades
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.terciary,
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
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default ProfileSettings;

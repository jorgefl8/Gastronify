import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const DatUser = await functions.getCollectionByDoc(
        "Users",
        FirebaseAuth.currentUser.uid
      );
      setLoading(false);
      setUser(DatUser);
      // Llama a la función de guardar datos del usuario en Main
      props.saveUserData(DatUser);
    };

    fetchMenu();
  }, []);

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
          Last name: {user ? user.LastName : "Not available yet"}
        </Text>
        <Text style={styles.infoText}>
          Email:{user ? user.Email : "Email not available yet"}
        </Text>
        <Text style={styles.infoText}>
          Telephone Number: {user ? user.TelephoneNumber : "Not available yet"}
        </Text>
        <View style={styles.buttonsContainer}>
          <Link title="Modify Data" style={styles.button}>
            <Text style={styles.buttonText}>Modify data</Text>
          </Link>
          <View style={styles.button}>
            <Text
              style={styles.buttonText}
              title="Log Out"
              onPress={props.handleLogout}
            >
              Log out
            </Text>
          </View>
        </View>
      </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100, // Ajusta este valor según tus necesidades
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.terciary,
  },
});

export default Profile;

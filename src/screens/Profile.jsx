import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = doc(
          FirestoreDB,
          "Users",
          FirebaseAuth.currentUser.uid
        );
        const userDoc = await getDoc(currentUser);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.infoText}>
          Name: {user ? user.Name : "User data not available yet"}
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
    marginVertical: 200
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
});

export default Profile;

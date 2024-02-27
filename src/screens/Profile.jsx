import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = doc(FirestoreDB, "Users", FirebaseAuth.currentUser.uid);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.profileInfo}>
          <Text style={styles.infoText}>Name: {user ? user.Name : "User data not available yet"}</Text>
          <Text style={styles.infoText}>Last name: {user? user.LastName : "Not available yet"}</Text>
          <Text style={styles.infoText}>Email:{user ? user.Email : "Email not available yet"}</Text>
          <Text style={styles.infoText}>Telephone Number: {user ? user.TelephoneNumber : "Not available yet"}</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Modify Data" style={styles.button} ></Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Log Out" onPress={props.handleLogout} />
            </View>
          </View>
        </View>
      )}
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
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});


export default Profile;

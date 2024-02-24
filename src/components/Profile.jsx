import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FirebaseAuth, FirestoreDB } from "../../firebase/firebaseconfig.js";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading.jsx";

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
        <>
          <Text>Name: {user ? user.Name : "User data not available"}</Text>
          <Button title="Log Out" onPress={props.handleLogout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Profile;

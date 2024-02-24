import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <Text> Testing Home</Text>
      <Button title="Log Out" onPress={props.handleLogout} />
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

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image} from "react-native";
import { FirestoreDB } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const db = FirestoreDB;
  useEffect(() => {
    const fetchMenu = async () => {

      const menuData = await functions.getCollection(db, "Menu");
      setMenuItems(menuData);
    };

    fetchMenu();
  }, []);

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.ImageUrl }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsPrincipal}>
          <Text style={styles.name}>{item.Name}</Text>
          <Text style={styles.price}>{item.Price} €</Text>
        </View>
        <Text style={styles.description}>{item.Description}</Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItemContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%"
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 65, 
    height: 65, 
    resizeMode: "cover",
  },
  detailsContainer: {
    flexDirection: "column",
    flex: 1,
  },
  detailsPrincipal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
  },
  price: {
    textAlign: "right",
  },
});


export default Menu;

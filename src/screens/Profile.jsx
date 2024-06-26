import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";

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

  const MenuItem = ({ iconName, text, to }) => {
    return (
      <Link to={"/" + to} style={styles.menuItem} component={TouchableOpacity}>
      <View style={styles.ViewMenuItem}>
        <Icon name={iconName} size={20} style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>{text}</Text>
        </View>
      </Link>
    );
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={{ fontSize: 20 }}>
          Hi {user ? user.Name : "Usuario"} !, welcome to your profile
        </Text>
      </View>
      <View style={styles.subHeader}>
        <ScrollView style={styles.menu}>
          <MenuItem key="personalData" iconName="user" text="Personal Data" to="ProfileSettings" />
          <MenuItem key="mapscreen" iconName="map-pin" text="Restaurant locations" to="mapscreen" />
          <MenuItem key="deliveryAddress" iconName="map-marker" text="Delivery addresses" to="deliveryAddress" />
          <MenuItem key="orders" iconName="list-alt" text="My orders" to="orders" />
          <MenuItem key="books" iconName="list-alt" text="My books" to="books" />
          <MenuItem key="paymentMethods" iconName="credit-card" text="Payment methods" to="PaymentMethod" />
  
          <View style={styles.button}>
            <TouchableOpacity onPress={props.handleLogout}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    flex: 1,
    padding: 20,
  },
  ViewMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  Header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  subHeader: {
    flex: 1,
    marginTop: 100, // Ajusta según la altura del Header
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemIcon: {
    marginRight: 10, // Añade un margen derecho para separar el ícono del texto
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    padding: 8,
    borderRadius: 5,
    margin: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  menuItemIcon: {
    marginLeft: 20,
  }
});

export default Profile;
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FirebaseAuth } from "../../firebase/firebaseconfig.js";
import functions from "../../firebase/firebaseUtils.js";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading.jsx";
import theme from "../theme.js";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importa el icono que desees usar

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

  const MenuItem = ({ iconName, text }) => {
    return (
      <TouchableOpacity style={styles.menuItem}>
        <Icon name={iconName} size={20} style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>{text}</Text>
      </TouchableOpacity>
    );
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
      <View style={styles.subHeader}>
        <ScrollView style={styles.menu}>
          <MenuItem iconName="user" text="Datos Personales" />
          <MenuItem iconName="credit-card" text="Métodos de Pago" />
          <MenuItem iconName="language" text="Idioma" />
          <MenuItem iconName="info" text="Información" />
          <MenuItem iconName="list-alt" text="Mis Pedidos" />
          <MenuItem iconName="map-marker" text="Dirección de Entrega" />
        </ScrollView>
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
  Header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.terciary,
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
  menuItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  menuItemIcon: {
    marginLeft: 20,
  },
});

export default Profile;

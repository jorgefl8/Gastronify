import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await functions.getCollection("Menu");
      setLoading(false);
      setMenuItems(menuData);
    };

    fetchMenu();
  }, []);

  const AddShoppingCart = async (itemName) => {
    try {
      // Obtener el carrito actual del almacenamiento local
      const cartString = await AsyncStorage.getItem('cart');
      let cart = cartString ? JSON.parse(cartString) : [];
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = cart.findIndex(item => item.name === itemName);
      cart.push({ Name: itemName});
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      //AsyncStorage.removeItem('cart');
      console.log('Producto añadido al carrito:', itemName);
    } catch (error) {
      console.error('Error al añadir producto al carrito:', error);
    }
  };

  const renderMenuItem = ({ item }) => {
    const truncatedDescription = item.Description.length > 80 ? item.Description.slice(0, 60) + "..." : item.Description;

    return (
      <View style={styles.menuItemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.Image }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => { setSelectedItem(item); setModalVisible(true) }}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsPrincipal}>
            <Text style={styles.name}>{item.Name}</Text>
            <Text style={styles.price}>{item.Price} €</Text>
          </View>
          <Text style={styles.description}>{truncatedDescription}</Text>
        </View>
      </View>
    )
  };

  return (
    <View style={[styles.container, loading && styles.loadingContainer]}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Text style={styles.title}>Menu</Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={{ uri: selectedItem?.Image }}
                  style={{ width: 200, height: 200, marginBottom: 10 }}
                />
                <Text>{selectedItem?.Name}</Text>
                <Text>{selectedItem?.Description}</Text>
                <Text>{selectedItem?.Price} €</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>Modificar Ingredientes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddShoppingCart(selectedItem?.Name)}>
                  <Text style={styles.closeButton}>Añadir a la cesta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    width: "100%",
  },
  imageContainer: {
    marginTop: 5,
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    borderRadius: 5
  },
  addButton: {
    position: 'absolute',
    flex: 1,
    bottom: -5,
    right: -5,
    backgroundColor: theme.colors.secondary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
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
  loadingContainer: {
    justifyContent: "center", // Centra verticalmente el contenido
    alignItems: "center" // Centra horizontalmente el contenido
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default Menu;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ onCartUpdate }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await functions.getCollection("Menu");
      setLoading(false);
      setMenuItems(menuData);
    };

    fetchMenu();
  }, []);
  const filteredMenuItems = menuItems.filter(item => {
    if (selectedCategory === "All") {
      return true;
    }
    return item.Category === selectedCategory;
  });

  const AddShoppingCart = async (item) => {
    try {
      // Obtener el carrito actual del almacenamiento local
      const cartString = await AsyncStorage.getItem('cart');
      let cart = cartString ? JSON.parse(cartString) : [];
      
      const existingItemIndex = cart.findIndex(cartItem => cartItem.Name === item.Name);
      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        cart[existingItemIndex].Quantity += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        item.Quantity = 1;
        cart.push(item);
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      // Cerrar el modal
      setModalVisible(false);
      //console.log(cart);
      //await AsyncStorage.removeItem('cart');
      // Actualizar el carrito llamando a la función proporcionada como prop
      onCartUpdate();
    } catch (error) {
      console.error('Error al añadir producto al carrito:', error);
    }
  };

  const renderMenuItem = ({ item }) => {
    const truncatedDescription = item.Description.length > 80 ? item.Description.slice(0, 60) + "..." : item.Description;

    return (
      <TouchableOpacity style={styles.menuItemContainer} onPress={() => { setSelectedItem(item); setModalVisible(true);}}>
  <View style={styles.imageContainer}>
    <Image
      source={{ uri: item.Image }}
      style={styles.image}
    />
    <TouchableOpacity style={styles.addButton} onPress={() => { AddShoppingCart(item)}}>
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
</TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Text style={styles.title}>Menu</Text>
          <View style={styles.categoryBar}>
            <TouchableOpacity onPress={() => setSelectedCategory("All")}>
              <Text style={styles.categoryButton}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory("Salad")}>
              <Text style={styles.categoryButton}>Salad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory("Pizza")}>
              <Text style={styles.categoryButton}>Pizza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory("Pasta")}>
              <Text style={styles.categoryButton}>Pasta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory("Seafood")}>
              <Text style={styles.categoryButton}>Seafood</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory("Burger")}>
              <Text style={styles.categoryButton}>Burger</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredMenuItems} // Aquí le pasas la lista filtrada
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
                <TouchableOpacity onPress={() => AddShoppingCart(selectedItem)}>
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
    paddingBottom: 30,
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
    margin: 10,
    backgroundColor: theme.colors.backgroundColor,
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
    elevation: 10
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
  categoryBar: {
    backgroundColor: theme.colors.backgroundColor,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  categoryButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    marginHorizontal: 5,
  },
});


export default Menu;

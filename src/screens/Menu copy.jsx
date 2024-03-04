import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Ionicons } from '@expo/vector-icons'; // Importa los iconos de Ionicons

const Menu = ({ onCartUpdate }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await functions.getCollection("Menu");
      setLoading(false);
      setMenuItems(menuData);
    };

    fetchMenu();
  }, []);

  const handleIngredientToggle = (ingredient) => {
    setIsChecked(prevState => ({
      ...prevState,
      [ingredient]: !prevState[ingredient]
    }));
  };

  const handleOpenModal = (item) => {
    const initialCheckedState = {};
    item.Ingredients.forEach(ingredient => {
      initialCheckedState[ingredient] = true;
    });

    setIsChecked(initialCheckedState);
    setModalVisible(true);
  };

  const renderIngredientItem = ({ item }) => (
    <View style={styles.ingredientItem}>
      <Checkbox
        value={isChecked[item]}
        onValueChange={() => handleIngredientToggle(item)}
        color={isChecked[item] ? theme.colors.secondary : undefined}
      />
      <Text style={styles.paragraph}>{item}</Text>
    </View>
  );

  const renderMenuItem = ({ item }) => {
    const truncatedDescription = item.Description.length > 80 ? `${item.Description.slice(0, 60)}...` : item.Description;

    return (
      <TouchableOpacity style={styles.menuItemContainer} onPress={() => { setSelectedItem(item); handleOpenModal(item); }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.Image }} style={styles.image} />
          <TouchableOpacity style={styles.addButton} onPress={() => { AddShoppingCart(item) }}>
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
    );
  };
  const AddShoppingCart = async (item) => {
    try {
      const ModifyIngredients = Object.entries(isChecked)
        .filter(([key, value]) => !value)
        .map(([key, value]) => key);

      const cartString = await AsyncStorage.getItem('cart');
      let cart = cartString ? JSON.parse(cartString) : [];
      const existingItemIndex = cart.findIndex(cartItem => {
        const cartItemModifyIngredientsString = JSON.stringify(cartItem.ModifyIngredients);
        return cartItem.Name === item.Name && cartItemModifyIngredientsString === JSON.stringify(ModifyIngredients);
      });
      item.ModifyIngredients = ModifyIngredients;

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].Quantity += 1;
      } else {
        item.Quantity = 1;
        cart.push(item);
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setModalVisible(false);
      console.log(cart);
      onCartUpdate();
    } catch (error) {
      console.error('Error al añadir producto al carrito:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Text style={styles.title}>Menu</Text>
          <View style={styles.categoryBar}>
            {["All", "Salad", "Pizza", "Pasta", "Seafood", "Burger"].map(category => (
              <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)}>
                <Text style={styles.categoryButton}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            data={menuItems.filter(item => selectedCategory === "All" || item.Category === selectedCategory)}
            renderItem={renderMenuItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <GestureRecognizer
            onSwipeDown={() => setModalVisible(false)}
            onSwipeRight={() => setModalVisible(false)}
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.centeredView}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalBackground} />
              </TouchableOpacity>
              <View style={styles.modalView}>

                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={32} color="black" />
                  </TouchableOpacity>
                  <View style={styles.line}></View>
                  <TouchableOpacity onPress={() => {/* Lógica para compartir */ }}>
                    <Ionicons name="share" size={32} color="black" />
                  </TouchableOpacity>
                </View>

                <Image source={{ uri: selectedItem?.Image }} style={{ width: 200, height: 200, marginBottom: 10 }} />
                <Text>{selectedItem?.Name}</Text>
                <Text>{selectedItem?.Description}</Text>
                <Text>{selectedItem?.Price} €</Text>
                <FlatList
                  style={styles.flatList}
                  contentContainerStyle={styles.flatListContent}
                  data={selectedItem?.Ingredients}
                  renderItem={renderIngredientItem}
                  keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => AddShoppingCart(selectedItem)}>
                    <Text style={styles.closeButton}>Añadir a la cesta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </GestureRecognizer>
        </View>
      )}
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
  modalView: {
    margin: 0,
    backgroundColor: theme.colors.backgroundColor,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 20,
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
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 40,
    margin: 15,
    borderRadius: 10,
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
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  paragraph: {
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  AreaScroll: {
    padding: 10,
    marginBottom: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    width: 100,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 10,
  }
});

export default Menu;

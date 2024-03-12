import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Share } from "react-native";
import Checkbox from "expo-checkbox";
import functions from "../../firebase/firebaseUtils.js";
import Loading from "../components/Loading.jsx";
import theme from "../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'; // Importa los iconos de Ionicons

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
  const handleShare = async () => {
    try {
      // Obtener la URL de la imagen de Firebase Storage u otro servidor
      const imageUri = await selectedItem?.Image; // Reemplaza "functions.getImageUrl" con la función adecuada para obtener la URL de la imagen
  
      // Crear el contenido a compartir con la URL de la imagen
      const shareContent = `¡Mira este artículo en el menú!\n\n${selectedItem?.Name}\n${selectedItem?.Description}\n\n${imageUri}`;
  
      // Compartir el contenido
      Share.share({
        message: shareContent,
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
    }
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
            {item.PriceOffer ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.price, { textDecorationLine: 'line-through'}]}>
                  {item.Price} €
                </Text>
                <Text style={[styles.price, { color: 'red' }]}>
                  {item.PriceOffer} €
                </Text>
              </View>
            ) : (
              <Text style={styles.price}>{item.Price} €</Text>
            )}
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
      //console.log(cart);
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
                <View style={styles.headerView}>
                  <Image source={{ uri: selectedItem?.Image }} style={styles.modalImage} />
                  <View style={styles.headerRow}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => setModalVisible(false)}>
                      <SimpleLineIcons name="close" size={32} color="white" />
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => handleShare()}>
                      <Ionicons name="share" size={32} color="white" />
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={styles.BottomView}>
                  <View style={styles.priceTitleRow}>
                    <Text style={styles.titleModal}>{selectedItem?.Name}</Text>
                    <Text style={styles.priceModal}>{selectedItem?.Price} €</Text>

                  </View>
                  <Text style={styles.description}>{selectedItem?.Description}</Text>
                  <FlatList
                    contentContainerStyle={{ marginTop: 5 }} // Alinea los elementos a la izquierda
                    data={selectedItem?.Ingredients}
                    renderItem={renderIngredientItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <TouchableOpacity style={styles.closeButton} onPress={() => AddShoppingCart(selectedItem)}>
                    <Text >Add to cart</Text>
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
  // Estilos para el componente Menu en general
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
    textAlign: "left", // Ajustamos el texto a la izquierda
    fontSize: 15, // Hacemos el tamaño del texto más grande
    marginRight: 10, // Agregamos un margen a la derecha para separarlo del título
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

  // Estilos para el modal
  centeredView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  modalView: {
    backgroundColor: theme.colors.backgroundColor,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  BottomView: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10
  },
  priceTitleRow: {
    marginBottom: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  priceModal: {
    fontSize: 20,
  },
  titleModal: {
    fontSize: 30,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    marginBottom: 10,
    borderRadius: 40,
    alignItems: "center"
  },

  headerView: {
    width: '100%',
    alignItems: "flex-start",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    position: "absolute"
  },
  line: {
    width: 100,
    height: 6,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  description: {
    marginBottom: 10,
  },
});


export default Menu;

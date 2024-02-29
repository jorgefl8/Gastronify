import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Platform } from "react-native";
import { useNavigate, useLocation } from "react-router-native";
import Icon from "react-native-vector-icons/Ionicons";

import theme from "../theme.js";

const AppBarTab = ({ children, to, icon }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === to;
  const containerStyles = [styles.tab, active && styles.activeTab];
  const textStyles = [styles.text, active && styles.textActive];

  const handlePress = () => {
    navigate(to);
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={handlePress}>
      <Icon name={icon} size={theme.appBar.icon.size} color={active ? "black" : theme.appBar.icon.color} />
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab to="/" icon="home-outline">
        Home
      </AppBarTab>
      <AppBarTab to="/menu" icon="reader-outline">
        Menu
      </AppBarTab>
      <AppBarTab to="/profile" icon="person-circle-outline">
        Profile
      </AppBarTab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 70 : 50,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: theme.appBar.primary,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
    borderRadius: 9,
    width: 50,
  },
  textActive: {
    color: "black",
  },
  text: {
    color: theme.appBar.textSecondary,
  },
});

export default AppBar;

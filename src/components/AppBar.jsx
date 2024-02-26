import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import theme from "../theme.js";
import { Link, useLocation } from "react-router-native";

const AppBarTab = ({ children, to, icon }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  const textStyles = [styles.text, active && styles.active];

  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <View style={styles.tab}>
        <Icon name={icon} size={24} color="#fff" />
        <Text fontWeight="bold" style={textStyles}>
          {children}
        </Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab to="/" icon="home-outline">
        {" "}
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
    zIndex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 70 : 50,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: theme.appBar.primary,
    borderTopWidth: theme.appBar.border.width,
    borderTopColor: theme.appBar.border.color,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // Alinea ícono y texto en la misma fila
  },
  text: {
    color: theme.appBar.textSecondary,
  },
  active: {
    color: theme.appBar.textPrimary,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
});

export default AppBar;

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
        <Icon name={icon} size={theme.appBar.icon.size} color={theme.appBar.icon.color} />
        <Text fontWeight={theme.fontWeights.bold} style={textStyles}>
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
  text: {
    color: theme.appBar.textSecondary,
  },
  active: {
    color: theme.appBar.textPrimary,
  }
});

export default AppBar;

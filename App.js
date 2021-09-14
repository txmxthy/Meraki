import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainMenuScreen from "./src/pages/main-menu";
import LoginScreen from "./src/pages/login";
import RadarScreen from "./src/pages/radar";
import MatrixScreen from "./src/pages/matrix";
import CalendarScreen from "./src/pages/calendar";
import GlobalScreen from "./src/pages/global";
import LateScreen from "./src/pages/overdue";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Radar" component={RadarScreen} />
        <Tab.Screen name="Matrix" component={MatrixScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Global" component={GlobalScreen} />
        <Tab.Screen name="Late" component={LateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

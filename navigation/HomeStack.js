import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RadarScreen from "../screens/Radar";
import MatrixScreen from "../screens/Matrix";
import CalendarScreen from "../screens/Calendar";
import GlobalScreen from "../screens/Global";
import OverdueScreen from "../screens/Overdue";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function Views() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Radar" component={RadarScreen} />
      <Tab.Screen name="Matrix" component={MatrixScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Global" component={GlobalScreen} />
      <Tab.Screen name="Overdue" component={OverdueScreen} />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Views" component={Views} />
    </Stack.Navigator>
  );
}


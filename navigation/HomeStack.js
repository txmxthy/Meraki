import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import RadarScreen from "../screens/RadarScreen";
import MatrixScreen from "../screens/MatrixScreen";
import CalendarScreen from "../screens/CalendarScreen";
import GlobalScreen from "../screens/GlobalScreen";
import OverdueScreen from "../screens/OverdueScreen";
import EditScreen from "./../screens/EditScreen";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function ViewScreens() {
  return (
    <Tab.Navigator
      headerMode="none"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Radar") {
            iconName = focused ? "radar" : "radar";
          } else if (route.name === "Matrix") {
            iconName = focused ? "view-grid" : "view-grid-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Global") {
            iconName = focused ? "earth-box" : "earth-box";
          } else if (route.name === "Overdue") {
            iconName = focused ? "clock" : "clock-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Radar"
        component={RadarScreen}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="Matrix"
        component={MatrixScreen}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="Global"
        component={GlobalScreen}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="Overdue"
        component={OverdueScreen}
        options={{ tabBarBadge: 3 }}
      />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewScreens" component={ViewScreens} />

      <Stack.Screen name="Todo/Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

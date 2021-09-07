import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Platform } from "react-native";

export const SafeAreaViewEx = ({ children }) => (
  <SafeAreaView
    style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }}
  >
    {children}
  </SafeAreaView>
);
import { NavigationProp, RouteProp } from "@react-navigation/core";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./../components/IconButton";
import { Switch } from "react-native-gesture-handler";

interface EditScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export default function EditScreen(props: EditScreenProps) {
  return (
    <View>
      <View>
        <MaterialCommunityIcons name="application" size={24} />
      </View>
      <View>
        <View style={styles.switch}>
          <Switch />
          <Text style={styles.text}>Urgent</Text>
        </View>
        <View style={styles.switch}>
          <Switch />
          <Text style={styles.text}>Important</Text>
        </View>
      </View>
      <View>{/* Progress */}</View>
      <View>{/* Description */}</View>
      <View>
        <Button title="Click me pls" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
});

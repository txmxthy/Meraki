import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TodoItem } from "../models/Todo";
import { categoryIcons } from "../models/Categories";

export interface TodoButtonProps {
  todo: TodoItem;
  onPress: () => void;
}

export function TodoButton({ todo, onPress }: TodoButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>{categoryIcons[todo.category]}</View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{todo.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4c566a",
    borderRadius: 24,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 4,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#2e3440",
    borderRadius: 16,
    width: 48,
    height: 48,
    marginRight: 16,
  },
  name: {},
  nameText: {
    fontSize: 16,
    color: "#eceff4",
  },
});

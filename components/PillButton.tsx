import React, { ReactNode } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export function PillButton({
  icon,
  text,
  active,
  onPress,
}: {
  icon: ReactNode;
  text: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...styles.container,
          ...(active ? styles.containerActive : {}),
        }}
      >
        {icon}
        <Text
          style={{
            ...styles.text,
            ...(active ? styles.textActive : {}),
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 48,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#2e3440",
    marginLeft: 8,
  },
  containerActive: {
    backgroundColor: "#5e81ac",
  },
  text: {
    fontSize: 16,
    color: "#eceff4",
    paddingLeft: 8,
  },
  textActive: {
    fontWeight: "bold",
  },
});

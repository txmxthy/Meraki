import React from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";

export default function MatrixScreen({ route, navigation }) {
  // Ghetto Grid
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Button
            containerStyle={{ flexShrink: 1 }}
            title={"Urgent\nImportant"}
            backgroundColor="#a3be8c"
            titleColor="#fff"
            onPress={() =>
              navigation.navigate("Todo/Edit", {
                defaults: { urgent: true, important: true },
              })
            }
          />
          <Button
            containerStyle={{ flexShrink: 1 }}
            title={"Urgent\nNot Important"}
            backgroundColor="#81a1c1"
            titleColor="#fff"
            onPress={() =>
              navigation.navigate("Todo/Edit", {
                defaults: { urgent: true, important: false },
              })
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Button
            containerStyle={{ flexShrink: 1 }}
            title={"Not Urgent\nImportant\n"}
            backgroundColor="#d08770"
            titleColor="#fff"
            onPress={() =>
              navigation.navigate("Todo/Edit", {
                defaults: { urgent: false, important: true },
              })
            }
          />
          <Button
            containerStyle={{ flexShrink: 1 }}
            title={"Not Urgent\nNot Important"}
            backgroundColor="#bf616a"
            titleColor="#fff"
            onPress={() =>
              navigation.navigate("Todo/Edit", {
                defaults: { urgent: false, important: false },
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

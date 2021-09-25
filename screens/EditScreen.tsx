import { NavigationProp, RouteProp } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Slider } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./../components/IconButton";
import { Switch } from "react-native-gesture-handler";
import Button from "./../components/Button";

interface EditScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export default function EditScreen(props: EditScreenProps) {
  const [name, setName] = useState("");
  const [isUrgent, setUrgent] = useState(false);
  const [isImportant, setImportant] = useState(false);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0.5);
  const [progress, setProgress] = useState(0);

  return (
    <View>
      <View>
        <TextInput
          style={styles.name}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.categories}>
          <MaterialCommunityIcons name="application" size={24} />
        </View>
        <View style={{ flexGrow: 3 }}>
          <View style={styles.switch}>
            <Switch value={isUrgent} onValueChange={setUrgent} />
            <Text style={styles.text}>Urgent</Text>
          </View>
          <View style={styles.switch}>
            <Switch value={isImportant} onValueChange={setImportant} />
            <Text style={styles.text}>Important</Text>
          </View>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.description}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={{ margin: 16 }}>
        <Text>Weight:</Text>
        <Slider
          value={weight}
          onValueChange={setWeight}
          minimumValue={0}
          maximumValue={1}
        />
      </View>
      <View style={{ margin: 16 }}>
        <Text>Progress:</Text>
        <Slider
          value={progress}
          onValueChange={setProgress}
          minimumValue={0}
          maximumValue={1}
        />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <Button title="Update" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
  },
  description: {
    fontSize: 16,
    padding: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 8,
  },
  categories: {
    flexGrow: 2,
    display: "flex",
    width: 64,
    borderWidth: 1,
    borderColor: "#2e3440",
    borderRadius: 8,
    margin: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#eceff4",
    borderWidth: 1,
    borderColor: "#2e3440",
    borderRadius: 8,
    padding: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 8,
  },
  text: {
    fontSize: 16,
  },
});

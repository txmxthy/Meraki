import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Slider,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./../components/IconButton";
import { Switch } from "react-native-gesture-handler";
import Button from "./../components/Button";
import { PillButton } from "../components/PillButton";
import { categories, categoryIcons } from "./../models/Categories";
import {
  deleteTodo,
  newTodo,
  syncTodo,
  TodoCategory,
  TodoItem,
} from "../models/Todo";
import { Calendar } from "react-native-calendars";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

interface EditScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<EditScreenParams>;
}

export type EditScreenParams = {
  defaults?: {
    name?: string;
    category?: TodoCategory;
    urgent?: boolean;
    important?: boolean;
    weight?: number;
    date?: string;
  };
  todo?: TodoItem;
};

export default function EditScreen({ navigation, route }: EditScreenProps) {
  const params: EditScreenParams = route.params as EditScreenParams;

  const { user } = useContext<any>(AuthenticatedUserContext);

  const [name, setName] = useState(
    params?.todo?.name ?? params?.defaults?.name ?? ""
  );
  const [category, setCategory] = useState<TodoCategory>(
    params?.todo?.category ?? params?.defaults?.category ?? categories[0]
  );
  const [isUrgent, setUrgent] = useState(
    params?.todo?.urgent ?? params?.defaults?.urgent ?? false
  );
  const [isImportant, setImportant] = useState(
    params?.todo?.important ?? params?.defaults?.important ?? false
  );

  const [description, setDescription] = useState(
    params?.todo?.description ?? ""
  );
  const [weight, setWeight] = useState(
    params?.todo?.weight ?? params?.defaults?.weight ?? 0.5
  );
  const [progress, setProgress] = useState(params?.todo?.progress ?? 0);
  const [dueDate, setDueDate] = useState(
    params?.todo?.dueDate ??
      params?.defaults?.date ??
      new Date().toISOString().substring(0, 10)
  );

  const onCommit = useCallback(async () => {
    // check all fields are valid
    if (name == "") {
      Alert.alert("The name is missing", "Try give it a witty name.");
      return;
    }

    if (params.todo) {
      // update the Todo online
      await syncTodo(user.uid, {
        ...params.todo,
        name,
        urgent: isUrgent,
        important: isImportant,
        progress,
        description,
        weight,
        category,
        dueDate,
      });
    } else {
      // create a new todo
      await newTodo(
        user.uid,
        name,
        isUrgent,
        isImportant,
        progress,
        description,
        weight,
        category,
        dueDate
      );
    }

    navigation.goBack();
  }, [
    user,
    name,
    isUrgent,
    isImportant,
    progress,
    description,
    weight,
    category,
    dueDate,
    params.todo,
  ]);

  const onDelete = useCallback(async () => {
    if (params.todo) {
      // AND HIS NAME IS 💪 JOHN CENA 💪! (dun, dahn, dun, duuuun..., dahn, dun, dun, dun)
      Alert.alert(
        "Are you sure about that?",
        "This will PERMANENTLY remove this todo item. There's no way in hell you can recover it.",
        [
          {
            text: "Delete",
            onPress: async () => {
              await deleteTodo(user.uid, params.todo);
              navigation.goBack();
            },
            style: "destructive",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );

      return;
    }

    navigation.goBack();
  }, [user, params.todo]);

  const markedDates = {};
  markedDates[dueDate] = { selected: true, marked: true };

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.name}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={{ width: 8 }} />
        {categories.map((c, index) => (
          <PillButton
            key={index}
            icon={categoryIcons[c]}
            text={c}
            active={c == category}
            onPress={() => setCategory(c)}
          />
        ))}
        <View style={{ width: 16 }} />
      </ScrollView>
      <View style={styles.header}>
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
      <Calendar
        current={dueDate}
        markedDates={markedDates}
        onDayPress={(date) => setDueDate(date.dateString)}
        enableSwipeMonths={true}
      />
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 8,
          flex: 1,
        }}
      >
        <Button title={params.todo ? "Delete" : "Cancel"} onPress={onDelete} />
        <View style={{ paddingTop: 8 }}>
          <Button
            title={params.todo ? "Update" : "Create"}
            onPress={onCommit}
          />
        </View>
      </View>
    </ScrollView>
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

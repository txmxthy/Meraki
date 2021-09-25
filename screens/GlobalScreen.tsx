import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { getTodoList, TodoItem } from "../models/Todo";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase from "../config/firebase";
import type firebase from "firebase";
import { TodoButton } from "../components/TodoButton";

export default function GlobaScreen() {
  const [todos, setTodos] = useState<TodoItem[] | undefined>();
  const { user } = useContext<any>(AuthenticatedUserContext);

  useEffect(() => {
    if (!todos) {
      getTodoList(user.uid).then((todos) => {
        setTodos(todos);
      });
    }
  }, [todos, setTodos, user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {todos?.map((todo, index) => (
        <TodoButton key={index} todo={todo} />
      ))}
    </View>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TodoButton } from "../components/TodoButton";
import { OverdueItemsContext } from "../context/OverdueItemsContext";
import { getTodoList, todoCountOverdue, TodoItem } from "../models/Todo";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { todoIsOverdue } from "./../models/Todo";

export default function CalendarScreen({ navigation }) {
  const [, setOverdueCount] = useContext(OverdueItemsContext);

  const [todos, setTodos] = useState<TodoItem[] | undefined>();
  const { user } = useContext<any>(AuthenticatedUserContext);

  useEffect(() => {
    if (!todos) {
      getTodoList(user.uid).then((todos) => {
        setOverdueCount(todoCountOverdue(todos));
        setTodos(todos);
      });
    }

    // prompt an update when we focus this screen again
    const unsubFocus = navigation.addListener("focus", () => {
      setTodos(undefined);
    });

    return () => {
      unsubFocus();
    };
  }, [todos, setTodos, user]);

  const agendaItems = todos && todosToAgendaItems(todos);

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={agendaItems}
        renderItem={(todo) => (
          <TodoButton
            todo={todo}
            onPress={() => navigation.navigate("Todo/Edit", { todo })}
          />
        )}
      />
    </View>
  );
}

function todosToAgendaItems(todos: TodoItem[]): Record<string, TodoItem[]> {
  const record = {};

  for (const item of todos) {
    if (!record[item.dueDate]) record[item.dueDate] = [];
    record[item.dueDate].push(item);
  }

  return record;
}

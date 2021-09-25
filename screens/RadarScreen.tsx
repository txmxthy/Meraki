import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, CameraRoll } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
} from "victory-native";
import { PillButton } from "../components/PillButton";
import { OverdueItemsContext } from "../context/OverdueItemsContext";
import { categories, categoryIcons } from "../models/Categories";
import { getTodoList, todoCountOverdue, TodoItem } from "../models/Todo";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const characterData = [
  {
    career: 1,
    education: 1,
    family: 1,
    happiness: 1,
    health: 1,
    relationships: 1,
    errands: 1,
  },
];

export default function RadarScreen({ navigation }) {
  const [data, setData] = useState<any>(processData(characterData));
  const [maxima, setMaxima] = useState<any>(getMaxima(characterData));

  const [, setOverdueCount] = useContext(OverdueItemsContext);

  const [todos, setTodos] = useState<TodoItem[] | undefined>();
  const { user } = useContext<any>(AuthenticatedUserContext);

  useEffect(() => {
    if (!todos) {
      getTodoList(user.uid).then((todos) => {
        setOverdueCount(todoCountOverdue(todos));
        setTodos(
          todos.sort(
            (a, b) =>
              new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf()
          )
        );
        setData(processData(todosToGraphableData(todos)));
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

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {todos ? (
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            domain={{ y: [0, 1] }}
          >
            <VictoryGroup
              colorScale={["transparent", "gold"]}
              style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
            >
              {data.map((data, i) => {
                return (
                  <VictoryArea key={i} data={data} interpolation="cardinal" />
                );
              })}
            </VictoryGroup>
            {Object.keys(maxima).map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  style={{
                    axisLabel: { padding: 10 },
                    axis: { stroke: "none" },
                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
                  }}
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical" />
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1}
                  label={key}
                  // tickFormat={(t) => Math.ceil(t * maxima[key])}
                  tickFormat={(t) => ""}
                  tickValues={[1]}
                />
              );
            })}
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ""}
              style={{
                axis: { stroke: "none" },
                grid: { stroke: "grey", opacity: 0.5 },
              }}
            />
          </VictoryChart>
        ) : (
          <Text style={{ fontSize: 16 }}>
            Precisely calculating attributes...
          </Text>
        )}
      </View>

      <View style={{ paddingBottom: 16 }}>
        <Text style={{ paddingLeft: 16, fontSize: 16, paddingBottom: 8 }}>
          Create a new todo:
        </Text>
        <ScrollView horizontal={true}>
          <View style={{ width: 8 }} />
          {categories.map((c, index) => (
            <PillButton
              key={index}
              icon={categoryIcons[c]}
              text={c}
              active={false}
              onPress={() =>
                navigation.navigate("Todo/Edit", { defaults: { category: c } })
              }
            />
          ))}
          <View style={{ width: 16 }} />
        </ScrollView>
      </View>
    </>
  );
}

function getMaxima(data) {
  const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});
}

function processData(data) {
  const maxByGroup = getMaxima(data);
  const makeDataArray = (d) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
}

function todosToGraphableData(todos: TodoItem[]) {
  const data = {
    career: 0,
    education: 0,
    family: 0,
    happiness: 0,
    health: 0,
    relationships: 0,
    errands: 0,
  };

  for (const todo of todos) {
    data[todo.category] = Math.max(
      data[todo.category],
      todo.weight * todo.progress
    );
  }

  return [
    {
      career: 1,
      education: 1,
      family: 1,
      happiness: 1,
      health: 1,
      relationships: 1,
      errands: 1,
    },
    data,
  ];
}

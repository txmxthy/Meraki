import React, { ReactNode } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TodoCategory } from "./Todo";

export const categories: TodoCategory[] = [
  "career",
  "education",
  "family",
  "happiness",
  "health",
  "relationships",
  "errands",
];

export const categoryIcons: Record<string, ReactNode> = {
  career: <MaterialCommunityIcons name="briefcase" size={24} color="#eceff4" />,
  education: <MaterialCommunityIcons name="brain" size={24} color="#eceff4" />,
  family: <MaterialIcons name="family-restroom" size={24} color="#eceff4" />,
  happiness: (
    <MaterialCommunityIcons
      name="emoticon-happy-outline"
      size={24}
      color="#eceff4"
    />
  ),
  health: (
    <MaterialCommunityIcons name="cards-heart" size={24} color="#eceff4" />
  ),
  relationships: <MaterialIcons name="group" size={24} color="#eceff4" />,
  errands: <MaterialCommunityIcons name="walk" size={24} color="#eceff4" />,
};

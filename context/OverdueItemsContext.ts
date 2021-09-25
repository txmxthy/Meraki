import { createContext } from "react";

export const OverdueItemsContext = createContext<
  [number, (count: number) => void] | undefined
>(undefined);

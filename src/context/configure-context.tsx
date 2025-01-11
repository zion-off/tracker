"use client";

import {
  useState,
  useOptimistic,
  createContext,
  useContext,
  ReactNode,
} from "react";

import { IUnit, OptimisticAction, IConfigureContext } from "@/interfaces";

const ConfigureContext = createContext<IConfigureContext | null>(null);

export function ConfigureProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [optimisticUnits, setOptimisticUnits] = useOptimistic(
    units,
    (
      state: IUnit[],
      { action, looseUnit, prefetchedUnits }: OptimisticAction
    ) => {
      switch (action) {
        case "add":
          return looseUnit ? [...state, looseUnit] : state;
        case "delete":
          return looseUnit
            ? state.filter((unit) => unit.ref !== looseUnit.ref)
            : state;
        case "reset":
          return [...(prefetchedUnits || [])];
        default:
          return state;
      }
    }
  );

  const [shaking, setIsShaking] = useState(false);
  const toggleIsShaking = () => {
    setIsShaking((prev) => !prev);
  };

  const value = {
    units,
    setUnits,
    optimisticUnits,
    setOptimisticUnits,
    shaking,
    toggleIsShaking,
  };

  return (
    <ConfigureContext.Provider value={value}>
      {children}
    </ConfigureContext.Provider>
  );
}

export function useConfigureContext() {
  const context = useContext(ConfigureContext);
  if (!context) {
    throw new Error("Configure context not available");
  }
  return context;
}

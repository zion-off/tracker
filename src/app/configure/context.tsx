"use client";

import { useState, createContext, useContext, ReactNode } from "react";

import { IUnit, IConfigureContext } from "@/interfaces";

const ConfigureContext = createContext<IConfigureContext | null>(null);

export function ConfigureProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [shaking, setIsShaking] = useState(false);
  const toggleIsShaking = () => {
    setIsShaking((prev) => !prev);
  };

  const value = {
    units,
    setUnits,
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

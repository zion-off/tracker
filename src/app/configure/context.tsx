"use client"

import { useState, createContext, useContext, ReactNode } from "react";

interface IConfigureContext {
  shaking: boolean;
  toggleIsShaking: () => void;
}

const ConfigureContext = createContext<IConfigureContext | null>(null);

export function ConfigureProvider({ children }: { children: ReactNode }) {
  const [shaking, setIsShaking] = useState(false);
  const toggleIsShaking = () => {
    setIsShaking((prev) => !prev);
  };

  const value = {
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

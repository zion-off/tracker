"use client";

import { useState, createContext, useContext, ReactNode } from "react";

import { IHomeContext } from "@/interfaces";

const HomeContext = createContext<IHomeContext | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [dots, setDots] = useState<number[]>([]);
  const updateDot = (index: number, newValue: number) => {
    setDots((prevDots) => {
      const newDots = [...prevDots];
      newDots[index] = newValue;
      return newDots;
    });
  };
  const setAllDots = (chart: number[]) => {
    setDots(chart);
  };
  const [maxChartValue, setMaxChartValue] = useState(0);
  const updateMaxValue = (count: number) => {
    if (maxChartValue > count) return;
    setMaxChartValue(count);
  };

  const value = {
    dots,
    updateDot,
    setAllDots,
    maxChartValue,
    updateMaxValue,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Home context not available");
  }
  return context;
}

export function HomeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <HomeProvider>{children}</HomeProvider>;
}

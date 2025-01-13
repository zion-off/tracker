"use client";

import { useState, createContext, useContext, ReactNode, memo } from "react";
import { IHomeContext, ChartWithColorsType } from "@/interfaces";
import { getColorIndex } from "@/utils/get-color-index";

const HomeContext = createContext<IHomeContext | null>(null);

const MemoizedHomeProvider = memo(function HomeProvider({ children }: { children: ReactNode }) {
  const [dots, setDots] = useState<ChartWithColorsType[]>(
    new Array(366).fill([0, "gh-green-five"])
  );
  const updateDot = (index: number, newValue: number) => {
    setDots((prevDots) => {
      const newDots = [...prevDots];
      newDots[index] = [newValue, getColorIndex(newValue, maxChartValue)];
      return newDots;
    });
  };
  const setAllDots = (chartWithColors: ChartWithColorsType[]) => {
    setDots(chartWithColors);
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
});

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Home context not available");
  }
  return context;
}

export function HomeProviderWrapper({ children }: { children: ReactNode }) {
  return <MemoizedHomeProvider>{children}</MemoizedHomeProvider>;
}

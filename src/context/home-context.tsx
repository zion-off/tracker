"use client";

import { useState, createContext, useContext, ReactNode, useMemo } from "react";
import { IHomeContext, ChartWithColorsType } from "@/interfaces";
import { getColorIndex } from "@/utils/get-color-index";

const HomeContext = createContext<IHomeContext | null>(null);

export function HomeProviderWrapper({ children }: { children: ReactNode }) {
  const [dots, setDots] = useState<ChartWithColorsType[]>(
    new Array(366).fill([0, "gh-green-five"])
  );

  const [maxChartValue, setMaxChartValue] = useState(0);

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

  const updateMaxValue = (count: number) => {
    if (maxChartValue > count) return;
    setMaxChartValue(count);
  };

  const value = useMemo(
    () => ({
      dots,
      updateDot,
      setAllDots,
      maxChartValue,
      updateMaxValue,
    }),
    [dots, maxChartValue]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Home context not available");
  }
  return context;
}

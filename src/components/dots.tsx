"use client";

import { useEffect } from "react";

import Dot from "./dot";
import { useHomeContext } from "@/context";
import { ChartWithColorsType } from "@/interfaces";

export default function Dots({ chart }: { chart: ChartWithColorsType[] }) {
  const { dots, setAllDots, updateMaxValue } = useHomeContext();

  const maxValue = chart.reduce(
    (max, item) => Math.max(max, item[0]),
    -Infinity
  );

  useEffect(() => {
    updateMaxValue(maxValue);
    setAllDots(chart);
  }, []);

  return (
    <>
      {dots.map((_, index) => (
        <Dot key={index} dot={dots[index]} index={index} />
      ))}
    </>
  );
}

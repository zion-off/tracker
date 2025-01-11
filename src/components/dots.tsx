"use client";

import { useEffect } from "react";

import { useHomeContext } from "@/context";
import Dot from "./dot";

export default function Dots({ chart }: { chart: number[] }) {
  const { dots, setAllDots, updateMaxValue } = useHomeContext();

  useEffect(() => {
    setAllDots(chart);
    updateMaxValue(Math.max(...chart));
  }, []);

  return (
    <>
      {dots.map((_, index) => (
        <Dot key={index} contribution={dots[index]} />
      ))}
    </>
  );
}

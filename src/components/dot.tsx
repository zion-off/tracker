"use client";

import { useMemo } from "react";
import { useHomeContext } from "@/context";

const colors = [
  "bg-gh-green-1",
  "bg-gh-green-2",
  "bg-gh-green-3",
  "bg-gh-green-4",
  "bg-gh-green-5",
] as const;


export default function Dot({ contribution }: { contribution: number }) {
  const { maxChartValue } = useHomeContext();

  const colorClass = useMemo(() => {
    if (contribution === 0) return colors[4];

    const percentage = (contribution / maxChartValue) * 100;

    if (percentage <= 25) return colors[3];
    if (percentage <= 50) return colors[2];
    if (percentage <= 75) return colors[1];
    return colors[0];
  }, [contribution, maxChartValue]);

  return (
    <div
      className={`aspect-square ${colorClass} text-xs flex items-center justify-center h-[10px] rounded-sm`}
    />
  );
}

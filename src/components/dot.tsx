"use client";

import { useMemo } from "react";

import { useHomeContext } from "@/context";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const colors = [
  "bg-gh-green-1",
  "bg-gh-green-2",
  "bg-gh-green-3",
  "bg-gh-green-4",
  "bg-gh-green-5",
] as const;

const getDayFromIndex = (dayIndex: number, year = new Date().getFullYear()) => {
  const date = new Date(year, 0);
  date.setDate(dayIndex);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const hoverCardWord = (contribution: number, dayIndex: number): string => {
  if (contribution == 1) {
    return `1 contribution on ${getDayFromIndex(dayIndex)}`;
  } else if (contribution === 0 || contribution > 1) {
    return `${contribution} contribution on ${getDayFromIndex(dayIndex)}`;
  } else return "";
};

export default function Dot({
  contribution,
  index,
}: {
  contribution: number;
  index: number;
}) {
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
    <HoverCard>
      <HoverCardTrigger>
        <div
          className={`aspect-square ${colorClass} text-xs flex items-center justify-center h-[10px] rounded-sm cursor-pointer`}
        />
      </HoverCardTrigger>
      <HoverCardContent>{hoverCardWord(contribution, index)}</HoverCardContent>
    </HoverCard>
  );
}

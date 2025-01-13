"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Dot from "./dot";
import { useHomeContext } from "@/context";
import { ChartWithColorsType } from "@/interfaces";

export default function Dots({ chart }: { chart: ChartWithColorsType[] }) {
  const { dots, setAllDots, updateMaxValue } = useHomeContext();
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);

  const maxValue = chart.reduce(
    (max, item) => Math.max(max, item[0]),
    -Infinity
  );

  useEffect(() => {
    updateMaxValue(maxValue);
    setAllDots(chart);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const DOT_SIZE = 14;
      const COLUMNS = 53;
      const ROWS = 7;
      const HORIZONTAL_GAP = 0.23;

      const col = Math.floor(x / (DOT_SIZE + HORIZONTAL_GAP));
      const row = Math.floor(y / DOT_SIZE);

      // New index calculation for top-to-bottom then wrap around
      let index: number | null = col * ROWS + row;

      if (col === COLUMNS - 1 && row >= 2) {
        index = null;
      }

      if (
        col >= 0 &&
        col < COLUMNS &&
        row >= 0 &&
        row < ROWS &&
        index !== null &&
        index < dots.length
      ) {
        setHoveredDotIndex(index);
      } else {
        setHoveredDotIndex(null);
      }
    },
    [dots.length]
  );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          onMouseMove={handleMouseMove}
          className="h-full w-full grid grid-rows-7 grid-flow-col"
        >
          {dots.map((_, index) => (
            <Dot key={index} dot={dots[index]} index={index} />
          ))}
        </div>
      </HoverCardTrigger>
      {hoveredDotIndex !== null && (
        <HoverCardContent className="w-64" >
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Dot Details</h4>
            <p className="text-sm">Value: {dots[hoveredDotIndex][0]}</p>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}

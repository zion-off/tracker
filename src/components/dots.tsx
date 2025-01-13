"use client";

import React, { useEffect, useState, useCallback, MouseEvent } from "react";
import Dot from "./dot";
import HoverBox from "./ui/hover-box";
import { useHomeContext } from "@/context";
import { ChartWithColorsType } from "@/interfaces";
import { hoverCardWord } from "@/utils";

export default function Dots({ chart }: { chart: ChartWithColorsType[] }) {
  const { dots, setAllDots, updateMaxValue } = useHomeContext();
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const maxValue = chart.reduce(
    (max, item) => Math.max(max, item[0]),
    -Infinity
  );

  useEffect(() => {
    updateMaxValue(maxValue);
    setAllDots(chart);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const DOT_SIZE = 10;
    const COLUMNS = 53;
    const ROWS = 7;
    const GAP = 4.31;

    const col = Math.floor(x / (DOT_SIZE + GAP));
    const row = Math.floor(y / (DOT_SIZE + GAP));

    let index: number | null = col * ROWS + row;

    if (
      col < 0 ||
      col >= COLUMNS ||
      row < 0 ||
      row >= ROWS ||
      index >= dots.length ||
      (col === COLUMNS - 1 && row >= 2)
    ) {
      setHoveredDotIndex(null);
      return;
    }

    setHoveredDotIndex(index);
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDotIndex(null);
  };

  const updateMousePosition = (e: MouseEvent) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        id="parent"
        onMouseMove={(e) => {
          handleMouseMove(e);
          updateMousePosition(e);
        }}
        onMouseLeave={handleMouseLeave}
        className="h-full w-full grid grid-rows-7 grid-flow-col relative"
      >
        {dots.map((_, index) => (
          <Dot key={index} dot={dots[index]} index={index} />
        ))}
      </div>

      {hoveredDotIndex !== null && (
        <HoverBox
          x={hoverPosition.x}
          y={hoverPosition.y}
          text={hoverCardWord(dots[hoveredDotIndex][0], hoveredDotIndex)}
        />
      )}
    </>
  );
}

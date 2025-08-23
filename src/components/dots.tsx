"use client";

import React, {
  useEffect,
  useState,
  MouseEvent,
  useCallback,
  useMemo,
  memo,
} from "react";

import { getChartData } from "@/actions/get-chart";
import Dot from "./dot";
import HoverBox from "./ui/hover-box";
import { useHomeContext } from "@/context";
import { ChartWithColorsType } from "@/interfaces";
import { hoverCardWord } from "@/utils";
import { getColorIndex } from "@/utils/get-color-index";

export const Dots = memo(
  ({
    id,
    padding,
  }: {
    id: string;
    padding: number[];
  }) => {
    const { dots, setAllDots, updateMaxValue } = useHomeContext();
    const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

    const fetchChartData = useCallback(async () => {
      const year = new Date().getFullYear();
      const fetchedChart = await getChartData(id, year.toString());
      return fetchedChart;
    }, [id]);

    useEffect(() => {
      const loadChartData = async () => {
        try {
          // get chart from local storage if available
          const storedChart = localStorage.getItem(`chart-${id}`);
          if (storedChart) {
            const parsedChart = JSON.parse(storedChart) as ChartWithColorsType[];
            const maxValue = parsedChart.reduce(
              (max, item) => Math.max(max, item[0]),
              -Infinity
            );
            updateMaxValue(maxValue);
            setAllDots(parsedChart);

            setTimeout(async () => {
              try {
                const fetchedChart = await fetchChartData();
                if (fetchedChart) {
                  const chartWithColors: ChartWithColorsType[] = fetchedChart.map(
                    (item: number) => [item, getColorIndex(item, maxValue)]
                  );
                  const newMaxValue = Math.max(
                    ...chartWithColors.map((item) => item[0])
                  );
                  updateMaxValue(newMaxValue);
                  setAllDots(chartWithColors);
                  localStorage.setItem(`chart-${id}`, JSON.stringify(chartWithColors));
                }
              } catch (error) {
                console.error('Error fetching fresh chart data:', error);
              }
            }, 0);
          } else {
            const fetchedChart = await fetchChartData();
            if (!fetchedChart) {
              return;
            }
            const chartWithColors: ChartWithColorsType[] = fetchedChart.map(
              (item: number) => [item, getColorIndex(item, -1)]
            );
            setAllDots(chartWithColors);
            localStorage.setItem(`chart-${id}`, JSON.stringify(chartWithColors));
          }
        } catch (error) {
          console.error('Error loading chart data:', error);
        }
      };

      loadChartData();
    }, [id, fetchChartData]);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        const container = e.currentTarget;
        if (!container) {
          return;
        }
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

        const adjustedIndex = index - padding.length;

        if (
          col < 0 ||
          col >= COLUMNS ||
          row < 0 ||
          row >= ROWS ||
          adjustedIndex >= dots.length ||
          adjustedIndex < 0 ||
          (col === COLUMNS - 1 && row >= 2)
        ) {
          setHoveredDotIndex(null);
          return;
        }

        setHoveredDotIndex(adjustedIndex);
        setHoverPosition({ x: e.clientX, y: e.clientY });
      },
      [dots, padding]
    );

    const memoizedDots = useMemo(
      () => dots.map((dot, index) => <Dot key={index} dot={dot[1]} />),
      [dots]
    );

    const invisibleDots = useMemo(
      () => padding.map((_, index) => (
        <Dot key={`invisible-${index}`} dot={"bg-transparent cursor-default"} />
      )),
      [padding]
    );

    const hoverText = useMemo(() => {
      if (hoveredDotIndex !== null && dots[hoveredDotIndex]) {
        return hoverCardWord(dots[hoveredDotIndex][0], hoveredDotIndex);
      }
      return "";
    }, [hoveredDotIndex, dots]);

    const handleMouseLeave = useCallback(() => {
      setHoveredDotIndex(null);
    }, []);

    const updateMousePosition = useCallback((e: MouseEvent) => {
      setHoverPosition({ x: e.clientX, y: e.clientY });
    }, []);

    const memoizedHoverBox = useMemo(() => {
      if (hoveredDotIndex !== null) {
        return (
          <HoverBox x={hoverPosition.x} y={hoverPosition.y} text={hoverText} />
        );
      }
      return null;
    }, [hoveredDotIndex, hoverPosition]);

    return (
      <>
        <div
          onMouseMove={(e) => {
            handleMouseMove(e);
            updateMousePosition(e);
          }}
          onMouseLeave={handleMouseLeave}
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full grid grid-rows-7 grid-flow-col relative"
        >
          {invisibleDots}
          {memoizedDots}
        </div>

        {memoizedHoverBox}
      </>
    );
  }
);

Dots.displayName = 'Dots';

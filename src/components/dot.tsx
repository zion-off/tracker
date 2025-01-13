"use client";

import React, { useMemo } from "react";
import { ChartWithColorsType } from "@/interfaces";

const Dot = React.memo(
  ({ dot, index }: { dot: ChartWithColorsType; index: number }) => {
    return useMemo(
      () => (
        <div
          className={`aspect-square ${dot[1]} text-xs  h-[10px] rounded-sm cursor-pointer`}
        />
      ),
      [dot, index]
    );
  }
);

export default Dot;

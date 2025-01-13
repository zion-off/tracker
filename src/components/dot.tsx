import React, { memo } from "react";
import { ChartWithColorsType } from "@/interfaces";

const Dot = memo(
  ({ dot }: { dot: ChartWithColorsType}) => {
    return (
      <div
        className={`aspect-square ${dot[1]} text-xs h-[10px] rounded-sm cursor-pointer`}
      />
    );
  }
);

export default Dot;

"use client";

import React, { useMemo } from "react";
import { hoverCardWord } from "@/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChartWithColorsType } from "@/interfaces";

const Dot = React.memo(
  ({ dot, index }: { dot: ChartWithColorsType; index: number }) => {
    return useMemo(() => (
      <HoverCard>
        <HoverCardTrigger>
          <div
            className={`aspect-square ${dot[1]} text-xs flex items-center justify-center h-[10px] rounded-sm cursor-pointer`}
          />
        </HoverCardTrigger>
        <HoverCardContent>{hoverCardWord(dot[0], index)}</HoverCardContent>
      </HoverCard>
    ), [dot, index]);
  }
)


export default Dot;

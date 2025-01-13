import React, { memo } from "react";

const Dot = memo(
  ({ dot }: { dot: string}) => {
    return (
      <div
        className={`aspect-square ${dot} text-xs h-[10px] rounded-sm cursor-pointer`}
      />
    );
  }
);

export default Dot;

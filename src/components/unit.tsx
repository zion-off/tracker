"use client";

import React, { memo } from "react";
import { useLongPress } from "@uidotdev/usehooks";
import { X } from "lucide-react";

import { useConfigureContext } from "@/context/configure-context";
import { IUnit } from "@/interfaces";

interface UnitProps {
  unit: IUnit;
  deleting: string;
  handleDelete: (unit: IUnit) => void;
}

const Unit = memo(function Unit({
  unit,
  deleting,
  handleDelete,
}: UnitProps) {
  const { shaking, toggleIsShaking } = useConfigureContext();
  const attrs = useLongPress(
    () => {
      toggleIsShaking();
    },
    {
      threshold: 500,
    }
  );

  return (
    <div
      {...attrs}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative origin-jiggle ${shaking && `animate-jiggle`}`}
    >
      <div
        className={`text-xs p-2 rounded-md border dark:border-zinc-800 border-gray-300 flex gap-1 cursor-pointer ${
          deleting === unit.ref
            ? `bg-neutral-50 dark:bg-neutral-800`
            : `bg-neutral-100 dark:bg-neutral-900`
        } ${!shaking && `hover:bg-neutral-50  hover:dark:bg-neutral-800`}`}
      >
        <div className="text-neutral-600 dark:text-neutral-400 no-select">
          {unit.unit}
        </div>
      </div>
      {shaking && (
        <X
          onClick={() => handleDelete(unit)}
          size={20}
          className="p-1 bg-gray-300 hover:bg-gray-400 dark:stroke-zinc-900 rounded-full dark:border dark:border-zinc-800 absolute right-0 translate-x-1/2 -translate-y-1/2 top-0 cursor-pointer"
        />
      )}
    </div>
  );
});

export default Unit;

"use client";

import { useState, useRef } from "react";
import { useLongPress } from "@uidotdev/usehooks";

import { IUnitWithCount } from "@/interfaces";
import { updateContribution } from "@/actions/update-contribution";

export default function Contribution({ unit }: { unit: IUnitWithCount }) {
  const [count, setCount] = useState(unit.count);
  const isLongPressRef = useRef(false);

  const attrs = useLongPress(
    () => {
      isLongPressRef.current = true;
      handleUpdate("decrement")();
    },
    {
      threshold: 500,
      onFinish: () => {
        setTimeout(() => {
          isLongPressRef.current = false;
        }, 0);
      },
    }
  );

  const handleClick = () => {
    if (!isLongPressRef.current) {
      handleUpdate("increment")();
    }
  };

  const handleUpdate = (action: "increment" | "decrement") => async () => {
    if (action === "decrement" && count === 0) return;

    const delta = action === "increment" ? 1 : -1;

    try {
      setCount((prev) => prev + delta);
      await updateContribution(unit.ref, action);
    } catch (error) {
      setCount((prev) => prev - delta);
      throw new Error(`Failed to update contribution: ${error}`);
    }
  };

  return (
    <button
      {...attrs}
      onClick={handleClick}
      className="bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50 hover:dark:bg-neutral-800 text-xs p-2 rounded-md border dark:border-zinc-800 border-gray-300 flex items-center gap-1 cursor-pointer"
    >
      <p className="text-neutral-500 dark:text-neutral-400 no-select">
        {unit.unit}
      </p>
      {count !== 0 && (
        <div className="bg-slate-300 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 px-2 py-[2px] rounded-full">{count}</div>
      )}
    </button>
  );
}

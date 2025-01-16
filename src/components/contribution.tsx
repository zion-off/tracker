"use client";

import { useState, useRef } from "react";
import { getDayOfYear } from "date-fns";

import { useHomeContext } from "@/context";
import { UnitWithCountType } from "@/interfaces";
import { updateContribution } from "@/actions/update-contribution";

export default function Contribution({ unit }: { unit: UnitWithCountType }) {
  const { updateDot, updateMaxValue } = useHomeContext();
  const [count, setCount] = useState(unit.count);
  const dayIndex = getDayOfYear(new Date()) - 1;

  const touchStartTimeRef = useRef<number>(0);
  const touchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasLongPressedRef = useRef(false);
  const isTouchDeviceRef = useRef(false);

  const handleUpdate = async (action: "increment" | "decrement") => {
    if (action === "decrement" && count === 0) return;

    const delta = action === "increment" ? 1 : -1;

    try {
      setCount((prev) => prev + delta);
      updateDot(dayIndex, count + delta);
      await updateContribution(unit.unit, action);
      updateMaxValue(count + delta);
    } catch (error: any) {
      setCount((prev) => prev - delta);
      updateDot(dayIndex, count + -1 * delta);
      throw new Error(`Failed to update contribution: ${error.message}`);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    isTouchDeviceRef.current = true;
    hasLongPressedRef.current = false;
    touchStartTimeRef.current = Date.now();

    touchTimeoutRef.current = setTimeout(() => {
      hasLongPressedRef.current = true;
      handleUpdate("decrement");
    }, 500);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }

    // Only trigger click if it wasn't a long press
    if (
      !hasLongPressedRef.current &&
      Date.now() - touchStartTimeRef.current < 500
    ) {
      handleUpdate("increment");
    }
  };

  const handleTouchCancel = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    hasLongPressedRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle mouse events, not touch events
    if (!isTouchDeviceRef.current && e.button === 0) {
      hasLongPressedRef.current = false;
      mouseTimeoutRef.current = setTimeout(() => {
        hasLongPressedRef.current = true;
        handleUpdate("decrement");
      }, 500);
    }
  };

  const handleMouseUp = () => {
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
    hasLongPressedRef.current = false;
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only handle mouse clicks, not touch events
    if (!isTouchDeviceRef.current && !hasLongPressedRef.current) {
      handleUpdate("increment");
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isTouchDeviceRef.current) {
      handleUpdate("decrement");
    }
  };

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className="bg-neutral-100 dark:bg-neutral-900 md:hover:bg-neutral-50 md:hover:dark:bg-neutral-800 text-xs p-2 rounded-md border dark:border-zinc-800 border-gray-300 flex items-center gap-1 cursor-pointer no-select"
    >
      <p className="text-neutral-600 dark:text-neutral-400 no-select">
        {unit.unit}
      </p>
      {count !== 0 && (
        <div className="bg-slate-300 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 px-2 py-[2px] rounded-full text-xxs">
          {count}
        </div>
      )}
    </button>
  );
}

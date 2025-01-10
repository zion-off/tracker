"use client";

import { useConfigureContext } from "@/app/configure/context";
import { useLongPress } from "@uidotdev/usehooks";
import { X } from "lucide-react";

interface UnitProps {
  text: string;
}

export default function Unit({ text }: UnitProps) {
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
      className={`relative ${shaking && `animate-jiggle origin-jiggle`}`}
    >
      <div className="bg-gray-100 dark:bg-neutral-900 text-xs p-2 rounded-md border dark:border-zinc-800 border-gray-300 flex gap-1 cursor-pointer">
        <div>{text}</div>
        <div>C</div>
      </div>
      {shaking && (
        <X
          onClick={() => toggleIsShaking()}
          size={20}
          className="p-1 bg-gray-300 dark:stroke-zinc-900 rounded-full dark:border dark:border-zinc-800 absolute right-0 translate-x-1/2 -translate-y-1/2 top-0 cursor-pointer"
        />
      )}
    </div>
  );
}

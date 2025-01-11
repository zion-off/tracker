"use client";

import { IUnitWithCount } from "@/interfaces";
import { updateContribution } from "@/actions/update-contribution";

export default function Contribution({ unit }: { unit: IUnitWithCount }) {
  return (
    <button
      onClick={() => updateContribution(unit.ref, "increment")}
      className="bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50  hover:dark:bg-neutral-800 text-xs p-2 rounded-md border dark:border-zinc-800 border-gray-300 flex gap-1 cursor-pointer"
    >
      <p className="text-neutral-500 dark:text-neutral-400 no-select">
        {unit.unit}
      </p>
      {unit.count !== 0 && <div>{unit.count}</div>}
    </button>
  );
}

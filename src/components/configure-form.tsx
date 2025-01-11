"use client";

import { useRef, startTransition } from "react";
import { v4 } from "uuid";
import { Plus } from "lucide-react";

import { IUnit } from "@/interfaces";
import { addUnit } from "@/actions";
import { useConfigureContext } from "@/context/configure-context";

export default function ConfigureForm() {
  const { units, setUnits, setOptimisticUnits } = useConfigureContext();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddUnit = async (data: FormData) => {
    const unitName = data.get("unit") as string;
    formRef.current?.reset();
    const dummyUnit: IUnit = {
      unit: unitName,
      ref: v4(),
    };
    startTransition(() => {
      setOptimisticUnits({
        action: "add",
        looseUnit: dummyUnit,
      });
    });
    try {
      const newUnit = await addUnit(data);
      startTransition(() => {
        setUnits((prev) => [...prev, newUnit]);
        setOptimisticUnits({
          action: "reset",
          prefetchedUnits: [...units, newUnit],
        });
      });
    } catch (error: any) {
      setOptimisticUnits({ action: "delete", looseUnit: dummyUnit });
      throw new Error(`Failed to add unit: ${error.message}`);
    }
  };

  return (
    <form ref={formRef} className="no-select flex gap-2" action={handleAddUnit}>
      <div className="group flex h-10 w-full rounded-md border dark:border-zinc-800 px-1 dark:bg-neutral-800 focus-within:outline-none md:text-sm dark:focus-within:border-zinc-700 focus-within:border-gray-300 justify-between gap-2">
        <input
          name="unit"
          placeholder="Read 1 chapter..."
          className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 w-full placeholder:text-muted-foreground dark:bg-neutral-800 px-2 py-2 text-sm"
        />
        <button className="h-full">
          <Plus className="bg-neutral-100 hover:bg-neutral-100/50 dark:bg-neutral-900 hover:dark:bg-neutral-900/50 border dark:border-zinc-800 h-4/5 rounded-md w-8 stroke-neutral-500 dark:stroke-neutral-400 p-1" />
        </button>
      </div>
    </form>
  );
}

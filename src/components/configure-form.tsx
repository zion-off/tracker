"use client";

import { Plus } from "lucide-react";

import { IUnit } from "@/interfaces";
import { addUnit } from "@/actions";
import { useConfigureContext } from "@/app/configure/context";

export default function ConfigureForm() {
  const { units, setUnits, optimisticUnits, setOptimisticUnits } =
    useConfigureContext();

  const handleAddUnit = async (formData: FormData) => {
    const unitName = formData.get("unit") as string;
    const dummyUnit: IUnit = {
      unit: unitName,
      ref: "",
    };
    setOptimisticUnits({
      action: "add",
      looseUnit: dummyUnit,
    });
    try {
      const newUnit = await addUnit(formData);
      setUnits((prev) => [...prev, newUnit]);
      setOptimisticUnits({ action: "reset", prefetchedUnits: units });
    } catch (error) {
      setOptimisticUnits({ action: "delete", looseUnit: dummyUnit });
      console.error("Failed to add unit:", error);
    }
  };

  return (
    <form className="flex gap-2" action={handleAddUnit}>
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

import { Suspense } from "react";
import { Plus } from "lucide-react";

import { UnitSuspense } from "@/components/unit-suspense";
import { addUnit, getUnits } from "@/actions";
import UnitBox from "@/components/unit-box";

export default async function Configure() {
  const units = await getUnits();
  return (
    <main className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
      <h2 className="font-bold text-xl text-center ">Configure your units</h2>
      <div className="flex flex-col gap-5 w-4/5 md:w-1/3">
        <form
          className="flex gap-2"
          action={async (data: FormData) => {
            "use server";
            addUnit(data);
          }}
        >
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
        <Suspense fallback={<UnitSuspense />}>
          <UnitBox units={units} />
        </Suspense>
      </div>
    </main>
  );
}

import { Plus } from "lucide-react";

import Unit from "@/components/unit";

export default function Configure() {
  return (
    <main className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
      <h2 className="font-bold text-xl text-center ">Configure your units</h2>
      <div className="flex flex-col gap-5 w-4/5 md:w-1/3">
        <form
          className="flex gap-2"
          action={async () => {
            "use server";
            //   await signIn("github");
          }}
        >
          <div className="group flex h-10 w-full rounded-md border dark:border-zinc-800 px-1 text-base dark:bg-neutral-800 focus-within:outline-none md:text-sm dark:focus-within:border-zinc-700 focus-within:border-gray-300 justify-between gap-2">
            <input
              placeholder="Task"
              className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 w-full placeholder:text-muted-foreground text-base dark:bg-neutral-800 px-2 py-2"
            />
            <button className="h-full">
              <Plus className="bg-neutral-100 dark:bg-neutral-900 border dark:border-zinc-800 h-4/5 rounded-md w-8 stroke-neutral-400 p-1" />
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-1 ">
          <Unit text="Read about 1 topic" />
        </div>
      </div>
    </main>
  );
}

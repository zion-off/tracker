function SuspenseItem() {
  return (
    <div className="bg-neutral-100 hover:bg-neutral-100/50 dark:bg-neutral-900 hover:dark:bg-neutral-900/50 text-xs p-2 rounded-md border dark:border-zinc-800 border-gray-300 flex gap-1 cursor-pointer basis-1/3 h-8 animate-pulse"></div>
  );
}

export function UnitSuspense() {
  return (
    <div className="flex w-full gap-3">
      <SuspenseItem />
      <SuspenseItem />
      <SuspenseItem />
    </div>
  );
}

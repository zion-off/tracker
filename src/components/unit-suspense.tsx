function SuspenseItem() {
  return (
    <div className="bg-neutral-100 hover:bg-neutral-100/50 dark:bg-neutral-800  rounded-md border dark:border-zinc-800 border-gray-300 cursor-pointer animate-pulse basis-1/4 h-[34px]" />
  );
}

export function UnitSuspense() {
  return (
    <div className="flex w-full gap-3 overflow-y-scroll fade-out hide-scrollbar my-4">
      <SuspenseItem />
      <SuspenseItem />
      <SuspenseItem />
      <SuspenseItem />
    </div>
  );
}

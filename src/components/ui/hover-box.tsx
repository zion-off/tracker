import { cn } from "@/lib/utils";

export default function HoverBox({
  x,
  y,
  text,
  className,
}: {
  x: number;
  y: number;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none text-neutral-800 dark:text-gray-200 rounded-md border bg-gray-200 dark:bg-neutral-800 dark:border-neutral-700 p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-xxs z-50",
        className
      )}
      style={{
        left: x,
        top: y + 70,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="space-y-2">
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

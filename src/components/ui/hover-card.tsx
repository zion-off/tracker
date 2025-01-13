"use client";

import React, { memo, useMemo } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = memo(
  React.forwardRef<
    React.ElementRef<typeof HoverCardPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
  >(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    return useMemo(() => (
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className="z-50 text-neutral-800 dark:text-gray-200 rounded-md border bg-gray-200 dark:bg-neutral-800 dark:border-neutral-700 p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-xs"
        {...props}
      />
    ), [align, sideOffset, className, props]);
  })
);
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

"use client";

import { useEffect, useRef } from "react";

import { useConfigureContext } from "@/app/configure/context";
import Unit from "@/components/unit";

export default function UnitBox() {
  const unitBoxRef = useRef<HTMLDivElement>(null);
  const { shaking, toggleIsShaking } = useConfigureContext();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        unitBoxRef.current &&
        !unitBoxRef.current.contains(event.target as Node)
      ) {
        console.log("clicked");
        if (shaking) toggleIsShaking();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shaking]);
  
  return (
    <div ref={unitBoxRef} className="flex flex-wrap gap-1 ">
      <Unit text="Read about 1 topic" />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

import Unit from "@/components/unit";
import { IUnit } from "@/interfaces";
import { deleteUnit } from "@/actions/delete-unit";
import { useConfigureContext } from "@/app/configure/context";

export default function UnitBox({ units }: { units: IUnit[] }) {
  const [configuredUnits, setConfiguredUnits] = useState(units);
  const { shaking, toggleIsShaking } = useConfigureContext();

  const boxRef = useClickAway(() => {
    if (shaking) {
      toggleIsShaking();
    }
  }) as React.MutableRefObject<HTMLDivElement>;

  async function handleDelete(path: string) {
    try {
      await deleteUnit(path);
      setConfiguredUnits((prev) => prev.filter((item) => item.ref !== path));
    } catch (error: any) {
      throw new Error("Unable to delete unit", error.message);
    }
  }
  
  return (
    <div ref={boxRef} className="flex flex-wrap gap-3">
      {configuredUnits.map((item, index) => (
        <Unit
          key={index}
          text={item.unit}
          path={item.ref}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

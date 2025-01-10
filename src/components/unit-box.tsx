"use client";

import { useEffect } from "react";
import { useOptimistic, useCallback, useState, useTransition } from "react";
import { useClickAway } from "@uidotdev/usehooks";

import Unit from "@/components/unit";
import { IUnit } from "@/interfaces";
import { deleteUnit } from "@/actions/delete-unit";
import { useConfigureContext } from "@/app/configure/context";

export default function UnitBox({
  prefetchedUnits,
}: {
  prefetchedUnits: IUnit[];
}) {
  const { units, setUnits, shaking, toggleIsShaking } = useConfigureContext();
  const [optimisticUnits, updateOptimisticUnits] = useOptimistic<
    IUnit[],
    string
  >(units, (state, pathToDelete) =>
    state.filter((unit) => unit.ref !== pathToDelete)
  );

  useEffect(() => {
    setUnits(prefetchedUnits);
  }, []);

  const [deleting, setDeleting] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const boxRef = useClickAway(() => {
    if (shaking) {
      toggleIsShaking();
    }
  }) as React.MutableRefObject<HTMLDivElement>;

  const handleDelete = useCallback(
    async (path: string) => {
      const previousUnits = [...units];
      setDeleting(path);
      startTransition(() => {
        updateOptimisticUnits(path);
      });
      try {
        await deleteUnit(path);
        setUnits((prev) => prev.filter((unit) => unit.ref !== path));
      } catch (error: any) {
        setUnits(previousUnits);
      } finally {
        setDeleting("");
      }
    },
    [units, updateOptimisticUnits]
  );

  return (
    <div ref={boxRef} className="flex flex-wrap gap-3">
      {optimisticUnits.map((item, index) => (
        <Unit
          key={index}
          text={item.unit}
          path={item.ref}
          deleting={deleting}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

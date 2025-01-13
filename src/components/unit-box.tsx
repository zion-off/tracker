"use client";

import { useEffect, useState, useCallback, startTransition, memo } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import Unit from "@/components/unit";
import { IUnit } from "@/interfaces";
import { deleteUnit } from "@/actions";
import { useConfigureContext } from "@/context/configure-context";

export const UnitBox = memo(
  ({ prefetchedUnits }: { prefetchedUnits: IUnit[] }) => {
    const {
      units,
      setUnits,
      optimisticUnits,
      setOptimisticUnits,
      shaking,
      toggleIsShaking,
    } = useConfigureContext();

    useEffect(() => {
      setUnits(prefetchedUnits);
      startTransition(() => {
        setOptimisticUnits({
          action: "reset",
          prefetchedUnits,
        });
      });
    }, []);

    const [deleting, setDeleting] = useState<string>("");
    const boxRef = useClickAway(() => {
      if (shaking) {
        toggleIsShaking();
      }
    }) as React.MutableRefObject<HTMLDivElement>;

    const handleDelete = useCallback(
      async (unit: IUnit) => {
        const previousUnits = [...units];
        setDeleting(unit.ref);
        startTransition(() => {
          setOptimisticUnits({
            action: "delete",
            looseUnit: unit,
          });
        });
        try {
          await deleteUnit(unit.ref);
          setUnits((prev) => prev.filter((u) => u.ref !== unit.ref));
        } catch (error: any) {
          setUnits(previousUnits);
        } finally {
          setDeleting("");
        }
      },
      [units, setOptimisticUnits]
    );

    return (
      <div ref={boxRef} className="flex flex-wrap gap-3">
        {optimisticUnits.map((item) => (
          <Unit
            key={item.ref}
            unit={item}
            deleting={deleting}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    );
  }
);

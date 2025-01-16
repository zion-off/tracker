"use client";

import { useEffect, useState, useCallback, startTransition, memo } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { v4 } from "uuid";

import Unit from "@/components/unit";
import { UnitType } from "@/interfaces";
import { deleteUnit } from "@/actions";
import { useConfigureContext } from "@/context/configure-context";

export const UnitBox = memo(
  ({ prefetchedUnits }: { prefetchedUnits: UnitType[] }) => {
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
      async (unit: UnitType) => {
        const previousUnits = [...units];
        setDeleting(unit);
        startTransition(() => {
          setOptimisticUnits({
            action: "delete",
            looseUnit: unit,
          });
        });
        try {
          await deleteUnit(unit);
          setUnits((prev) => prev.filter((u) => u !== unit));
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
            key={v4()}
            unit={item}
            deleting={deleting}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    );
  }
);

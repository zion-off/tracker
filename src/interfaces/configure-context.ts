import { Dispatch, SetStateAction } from "react";

import { UnitType } from "./unit";

export interface OptimisticAction {
  action: "add" | "delete" | "reset";
  looseUnit?: UnitType;
  prefetchedUnits?: UnitType[];
}

export interface IConfigureContext {
  units: UnitType[];
  setUnits: Dispatch<SetStateAction<UnitType[]>>;
  optimisticUnits: UnitType[];
  setOptimisticUnits: ({
    action,
    looseUnit,
    prefetchedUnits,
  }: OptimisticAction) => void;
  shaking: boolean;
  toggleIsShaking: () => void;
}

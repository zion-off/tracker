import { Dispatch, SetStateAction } from "react";

import { IUnit } from "./unit";

export interface OptimisticAction {
  action: "add" | "delete" | "reset";
  looseUnit?: IUnit;
  prefetchedUnits?: IUnit[];
}

export interface IConfigureContext {
  units: IUnit[];
  setUnits: Dispatch<SetStateAction<IUnit[]>>;
  optimisticUnits: IUnit[];
  setOptimisticUnits: ({
    action,
    looseUnit,
    prefetchedUnits,
  }: OptimisticAction) => void;
  shaking: boolean;
  toggleIsShaking: () => void;
}

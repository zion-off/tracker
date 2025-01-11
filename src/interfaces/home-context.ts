import { Dispatch, SetStateAction } from "react";

import { IUnitWithCount } from "./unit";

export interface optimisticContributionUpdate {
  action: "increment" | "decrement";
  contribution?: IUnitWithCount;
}

export interface IHomeContext {
  contributions: IUnitWithCount[];
  setContributions: Dispatch<SetStateAction<IUnitWithCount[]>>;
  optimisticContributions: IUnitWithCount[];
  setOptimisticContributions: ({
    action,
    contribution,
  }: optimisticContributionUpdate) => void;
}

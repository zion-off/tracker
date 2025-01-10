import { Dispatch, SetStateAction } from "react";

import { IUnit } from "./unit";

export interface IConfigureContext {
  units: IUnit[];
  setUnits: Dispatch<SetStateAction<IUnit[]>>;
  shaking: boolean;
  toggleIsShaking: () => void;
}

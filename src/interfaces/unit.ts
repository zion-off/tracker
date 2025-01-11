export interface IUnit {
  unit: string;
  ref: string;
}

export interface IUnitWithCount extends IUnit {
  count?: number;
}
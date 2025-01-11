export interface IHomeContext {
  dots: number[];
  updateDot: (index: number, newValue: number) => void;
  setAllDots: (chart: number[]) => void;
  maxChartValue: number;
  updateMaxValue: (count: number) => void;
}

export type ChartWithColorsType = [number, string];

export interface IHomeContext {
  dots: ChartWithColorsType[];
  updateDot: (index: number, newValue: number) => void;
  setAllDots: (chart: ChartWithColorsType[]) => void;
  maxChartValue: number;
  updateMaxValue: (count: number) => void;
}

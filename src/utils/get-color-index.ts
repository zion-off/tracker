import { colors } from "./colors";

export const getColorIndex = (contribution: number, maxChartValue: number) => {
  if (contribution === 0) return colors[4];
  const percentage = (contribution / maxChartValue) * 100;
  if (percentage <= 25) return colors[3];
  if (percentage <= 50) return colors[2];
  if (percentage <= 75) return colors[1];
  return colors[0];
};

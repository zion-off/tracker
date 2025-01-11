import { getDayFromIndex } from "./get-day-from-index";

export const hoverCardWord = (
  contribution: number,
  dayIndex: number
): string => {
  if (contribution == 1) {
    return `1 contribution on ${getDayFromIndex(dayIndex)}`;
  } else if (contribution === 0 || contribution > 1) {
    return `${contribution} contribution on ${getDayFromIndex(dayIndex)}`;
  } else return "";
};

import { getDayFromIndex } from "./get-day-from-index";

export const hoverCardWord = (
  contribution: number,
  dayIndex: number
): string => {
  if (contribution == 0) {
    return `No contributions on ${getDayFromIndex(dayIndex)}`;
  } else if (contribution === 1) {
    return `1 contribution on ${getDayFromIndex(dayIndex)}`;
  } else if (contribution > 1) {
    return `${contribution} contributions on ${getDayFromIndex(dayIndex)}`;
  } else return "Data unavailable";
};

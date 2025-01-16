import { getDayFromIndex } from "./get-day-from-index";

export const hoverCardWord = (
  contribution: number,
  dayIndex: number
): string => {
  const date = getDayFromIndex(dayIndex + 1);
  if (contribution == 0) {
    return `No contributions on ${date}`;
  } else if (contribution === 1) {
    return `1 contribution on ${date}`;
  } else if (contribution > 1) {
    return `${contribution} contributions on ${date}`;
  } else return "Data unavailable";
};

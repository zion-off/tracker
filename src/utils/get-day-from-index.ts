export const getDayFromIndex = (
  dayIndex: number,
  year = new Date().getFullYear()
) => {
  const date = new Date(year, 0);
  date.setDate(dayIndex);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

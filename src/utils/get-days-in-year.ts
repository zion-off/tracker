export function getDaysInYear(
  year: string | number = new Date().getFullYear()
) {
  if (typeof year === "string") {
    year = parseInt(year as string, 10);
  }
  return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
}

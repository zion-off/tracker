import { TableLayout } from "./table-layout";

export default function Chart({ chart }: { chart: number[] }) {
  const maxContributions = Math.max(...chart);
  const colors = [
    "bg-gh-green-1",
    "bg-gh-green-2",
    "bg-gh-green-3",
    "bg-gh-green-4",
    "bg-gh-green-5",
  ];

  const getColorClass = (contribution: number) => {
    if (contribution === 0) return colors[4];

    const percentage = (contribution / maxContributions) * 100;

    if (percentage <= 25) return colors[3];
    if (percentage <= 50) return colors[2];
    if (percentage <= 75) return colors[1];
    return colors[0];
  };

  return (
    <TableLayout>
      <div className="h-full w-full grid grid-rows-7 grid-flow-col">
        {chart.map((contribution, index) => {
          return (
            <div
              key={index}
              className={`aspect-square ${getColorClass(
                contribution
              )} text-xs flex items-center justify-center h-[10px] rounded-sm`}
            ></div>
          );
        })}
      </div>
    </TableLayout>
  );
}

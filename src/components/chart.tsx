import { Dots } from "./dots";
import { TableLayout } from "./table-layout";
import { getChartData } from "@/actions/get-chart";
import { ChartWithColorsType } from "@/interfaces";
import { getColorIndex } from "@/utils/get-color-index";

export default async function Chart({userId}: {userId: string}) {
  // TODO: Change this to accepting year as a prop
  const year = new Date().getFullYear();
  const chart = await getChartData(userId, year.toString());
  const invisibleDots = new Array(new Date(year, 0).getDay()).fill(-1);
  const maxValue = Math.max(...chart);
  const chartWithColors: ChartWithColorsType[] = chart.map((item: number) => [
    item,
    getColorIndex(item, maxValue),
  ]);

  return (
    <div className="w-full h-auto items-end flex">
      <div className="my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
        <TableLayout>
          <Dots chart={chartWithColors} padding={invisibleDots} />
        </TableLayout>
      </div>
    </div>
  );
}

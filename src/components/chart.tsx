import Dots from "./dots";
import { TableLayout } from "./table-layout";
import { getChartData } from "@/actions/get-chart";
import { ChartWithColorsType } from "@/interfaces";
import { getColorIndex } from "@/utils/get-color-index";

export default async function Chart() {
  const chart = await getChartData(new Date().getFullYear().toString());
  const maxValue = Math.max(...chart);
  const chartWithColors: ChartWithColorsType[] = chart.map((item: number) => [
    item,
    getColorIndex(item, maxValue),
  ]);

  return (
    <div className="w-5/6 md:max-w-[900px] basis-1/5 h-auto items-end flex">
      <div className="my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll ">
        <TableLayout>
          <div className="h-full w-full grid grid-rows-7 grid-flow-col">
            <Dots chart={chartWithColors} />
          </div>
        </TableLayout>
      </div>
    </div>
  );
}

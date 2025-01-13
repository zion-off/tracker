import Dots from "./dots";
import { auth } from "@/auth";
import { TableLayout } from "./table-layout";
import { getChartData } from "@/actions/get-chart";
import { ChartWithColorsType } from "@/interfaces";
import { getColorIndex } from "@/utils/get-color-index";

export default async function Chart() {
  const session = await auth();
  const id = session?.user?.id as string;
  const chart = await getChartData(id, new Date().getFullYear().toString());
  const maxValue = Math.max(...chart);
  const chartWithColors: ChartWithColorsType[] = chart.map((item: number) => [
    item,
    getColorIndex(item, maxValue),
  ]);

  return (
    <div className="w-full h-auto items-end flex">
      <div className="my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
        <TableLayout>
          <Dots chart={chartWithColors} />
        </TableLayout>
      </div>
    </div>
  );
}

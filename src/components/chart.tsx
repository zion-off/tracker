import { TableLayout } from "./table-layout";
import Dots from "./dots";
import { getChartData } from "@/actions/get-chart";

export default async function Chart() {
  const chart = await getChartData(new Date().getFullYear().toString());
  return (
    <div className="w-5/6 md:max-w-[900px] my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
      <TableLayout>
        <div className="h-full w-full grid grid-rows-7 grid-flow-col">
          <Dots chart={chart} />
        </div>
      </TableLayout>
    </div>
  );
}

import Logger from "@/components/logger";
import Chart from "@/components/chart";
import { getUnitsCount } from "@/actions";
import { getChartData } from "@/actions/get-chart";

export default async function Home() {
  const units = await getUnitsCount();
  const chart = await getChartData(new Date().getFullYear().toString());
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div className="w-5/6 md:max-w-screen-lg my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
          <Chart chart={chart} />
      </div>
      <Logger contributions={units} />
    </main>
  );
}

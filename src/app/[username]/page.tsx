export const runtime = 'edge' 

import { notFound } from "next/navigation";

import { getUserIdByUsername, getChartByID } from "@/actions";
import { TableLayout } from "@/components/table-layout";
import { ServerDot } from "@/components/server-dot";

type Params = Promise<{ username: string }>;

export default async function Page({ params }: { params: Params }) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFound();
  }
  const chart: number[] = await getChartByID(userId);
  const max = Math.max(...chart);

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="w-5/6 md:max-w-[900px] my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
        <TableLayout>
          <div className="h-full w-full grid grid-rows-7 grid-flow-col">
            {chart.map((_, index) => (
              <ServerDot
                key={index}
                contribution={chart[index]}
                index={index}
                maxChartValue={max}
              />
            ))}
          </div>
        </TableLayout>
      </div>
    </main>
  );
}

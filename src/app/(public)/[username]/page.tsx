import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getUserIdByUsername, getChartByID } from "@/actions";
import { TableLayout } from "@/components/table-layout";
import { ServerDot } from "@/components/server-dot";
import SignUpLink from "@/components/ui/sign-up-button";
import { Spectrum } from "@/components/ui/spectrum";

type Params = Promise<{ username: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username}'s chart` || "tracker",
  };
}

export default async function Page({ params }: { params: Params }) {
  const { username } = await params;
  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return notFound();
  }
  const year = new Date().getFullYear();
  const invisibleDots = new Array(new Date(year, 0).getDay()).fill(-1);

  const chart: number[] = await getChartByID(userId);
  const max = Math.max(...chart);

  return (
    <main className=" absolute inset-0 flex flex-col justify-center items-center">
      <div className="w-5/6 md:max-w-[900px] my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
        <TableLayout>
          <div className="h-full w-full grid grid-rows-7 grid-flow-col">
            {invisibleDots.map((_, index) => (
              <div
                key={index}
                className="aspect-squarebg-transparent text-xs flex items-center justify-center h-[10px] rounded-sm cursor-pointer"
              />
            ))}
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
      <div className="flex justify-between w-5/6">
        <p className="text-xxs">
          {username}'s daily contributions in {year}
        </p>
        <Spectrum />
      </div>

      <SignUpLink />
    </main>
  );
}

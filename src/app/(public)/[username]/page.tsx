import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getUserIdByUsername, getChartByID } from "@/actions";
import { TableLayout } from "@/components/table-layout";
import { ServerDot } from "@/components/server-dot";
import SignUpLink from "@/components/ui/sign-up-button";

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
  const chart: number[] = await getChartByID(userId);
  const max = Math.max(...chart);

  return (
    <main className=" absolute inset-0 flex flex-col justify-center items-center">
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
      <SignUpLink />
    </main>
  );
}

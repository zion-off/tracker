import { Suspense } from "react";

import { auth } from "@/auth";
import Logger from "@/components/logger";
import Chart from "@/components/chart";
import { UnitSuspense } from "@/components/unit-suspense";
import ChartFallback from "@/components/chart-fallback";
import ConfigureLink from "@/components/ui/configure-button";
import { HomeProviderWrapper } from "@/context";
import CopyLink from "@/components/ui/copy-button";

export default async function Home() {
  const session = await auth();
  if (!session) return;
  return (
    <main className="flex flex-col absolute inset-0 justify-center items-center ">
      <HomeProviderWrapper>
        <div className="w-5/6 md:max-w-[842px]">
          <Suspense fallback={<ChartFallback />}>
            <Chart />
          </Suspense>
          <Suspense fallback={<UnitSuspense />}>
            <Logger />
          </Suspense>
        </div>
      </HomeProviderWrapper>
      <CopyLink />
      <ConfigureLink />
    </main>
  );
}

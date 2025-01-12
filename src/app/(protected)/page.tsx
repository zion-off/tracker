import { auth } from "@/auth";
import Logger from "@/components/logger";
import Chart from "@/components/chart";
import ConfigureLink from "@/components/ui/configure-button";
import { HomeProviderWrapper } from "@/context";
import CopyLink from "@/components/ui/copy-button";

export default async function Home() {
  const session = await auth();
  if (!session) return;
  return (
    <main className="flex flex-col absolute inset-0 justify-center items-center">
      <HomeProviderWrapper>
        <Chart />
        <Logger />
      </HomeProviderWrapper>
      <CopyLink />
      <ConfigureLink />
    </main>
  );
}

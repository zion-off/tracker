import Logger from "@/components/logger";
import Chart from "@/components/chart";
import ConfigureLink from "@/components/ui/configure-button";
import { HomeProviderWrapper } from "@/context";
import CopyLink from "@/components/ui/copy-button";

export default async function Home() {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <HomeProviderWrapper>
        <Chart />
        <Logger />
      </HomeProviderWrapper>
      <CopyLink />
      <ConfigureLink />
    </main>
  );
}

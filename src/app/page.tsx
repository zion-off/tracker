import Logger from "@/components/logger";
import Chart from "@/components/chart";
import { HomeProviderWrapper } from "@/context";

export default async function Home() {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <HomeProviderWrapper>
        <Chart />
        <Logger />
      </HomeProviderWrapper>
    </main>
  );
}

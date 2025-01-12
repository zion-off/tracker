import Logger from "@/components/logger";
import Chart from "@/components/chart";
import ConfigureLink from "@/components/ui/configure-button";
import { HomeProviderWrapper } from "@/context";
import CopyLink from "@/components/ui/copy-button";
import AuthCheck from "@/auth/auth-provider";

export default async function Home() {
  return (
    <AuthCheck>
      <main className="flex flex-col absolute inset-0 justify-center items-center">
        <HomeProviderWrapper>
          <Chart />
          <Logger />
        </HomeProviderWrapper>
        <CopyLink />
        <ConfigureLink />
      </main>
    </AuthCheck>
  );
}

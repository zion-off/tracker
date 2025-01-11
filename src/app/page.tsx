import Logger from "@/components/logger";
import { getUnitsCount } from "@/actions";

export default async function Home() {
  const units = await getUnitsCount();
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div className="w-5/6 md:w-2/3 bg-gh-green-1 basis-1/3 my-4">chart</div>
      <Logger units={units} />
    </main>
  );
}

import { Suspense } from "react";
import { Instrument_Serif } from "next/font/google";

import { UnitSuspense } from "@/components/unit-suspense";
import { getUnits } from "@/actions";
import UnitBox from "@/components/unit-box";
import ConfigureForm from "@/components/configure-form";
import HomeLink from "@/components/ui/home-button";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Configure() {
  const units = await getUnits();
  return (
    <main className="absolute inset-0 w-screen flex flex-col gap-2 items-center">
      <div className="basis-1/3 flex flex-col justify-end py-4">
        <h2
          className={`font-bold text-4xl text-center no-select ${instrumentSerif.className}`}
        >
          Configure your units
        </h2>
      </div>
      <div className="w-4/5 md:w-1/3">
        <ConfigureForm />
      </div>
      <div className="flex flex-col gap-5 w-4/5 md:w-1/3 basis-2/5 overflow-y-scroll py-4 fade-out hide-scrollbar">
        <Suspense fallback={<UnitSuspense />}>
          <UnitBox prefetchedUnits={units} />
        </Suspense>
      </div>
      <HomeLink />
    </main>
  );
}

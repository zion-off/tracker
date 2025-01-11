import { Suspense } from "react";
import { Plus } from "lucide-react";

import { UnitSuspense } from "@/components/unit-suspense";
import { addUnit, getUnits } from "@/actions";
import UnitBox from "@/components/unit-box";
import ConfigureForm from "@/components/configure-form";

export default async function Configure() {
  const units = await getUnits();
  return (
    <main className="h-screen w-screen flex flex-col gap-5 items-center">
      <div className="basis-1/3 flex flex-col justify-end">
        <h2 className="font-bold text-xl text-center no-select">Configure your units</h2>
      </div>
      <div className="w-4/5 md:w-1/3">
        <ConfigureForm />
      </div>

      <div className="flex flex-col gap-5 w-4/5 md:w-1/3">
        <Suspense fallback={<UnitSuspense />}>
          <UnitBox prefetchedUnits={units} />
        </Suspense>
      </div>
    </main>
  );
}

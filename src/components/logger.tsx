import Contribution from "./contribution";
import { getUnitsCount } from "@/actions";

export default async function Logger() {
  const units = await getUnitsCount();
  return (
    <div className="w-5/6 md:max-w-[900px] overflow-y-scroll basis-1/4 fade-out hide-scrollbar">
      <div className="flex flex-wrap gap-3 my-4 ">
        {units.map((item, index) => (
          <Contribution key={index} unit={item} />
        ))}
      </div>
    </div>
  );
}

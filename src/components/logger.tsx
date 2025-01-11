import Contribution from "./contribution";
import { getUnitsCount } from "@/actions";

export default async function Logger() {
  const units = await getUnitsCount();
  return (
    <div className="flex flex-wrap gap-3 my-4 w-5/6 md:max-w-[900px] max-h-28">
      {units.map((item, index) => (
        <Contribution key={index} unit={item} />
      ))}
    </div>
  );
}

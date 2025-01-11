import { IUnitWithCount } from "@/interfaces";
import Contribution from "./contribution";

export default function Logger({ units }: { units: IUnitWithCount[] }) {
  return (
    <div className="flex flex-wrap gap-3 my-4 w-5/6 md:w-2/3 max-h-28">
      {units.map((item, index) => (
        <Contribution key={index} unit={item} />
      ))}
    </div>
  );
}

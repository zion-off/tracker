import Contribution from "./contribution";
import { getUnitsCount } from "@/actions";

export default async function Logger() {
  const units = await getUnitsCount();
  return (

      <div className="w-full flex flex-wrap gap-3 my-4 ">
        {units.map((item, index) => (
          <Contribution key={index} unit={item} />
        ))}
      </div>
  );
}

import { auth } from "@/auth";
import Contribution from "./contribution";
import { getUnitsCount } from "@/actions";

export default async function Logger({userId}: {userId: string}) {
  const units = await getUnitsCount(userId);
  return (
    <div className="w-full flex flex-wrap gap-3 my-4 ">
      {units.map((item, index) => (
        <Contribution key={index} unit={item} />
      ))}
    </div>
  );
}

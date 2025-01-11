import { IUnitWithCount } from "@/interfaces";
import Contribution from "./contribution";

export default function Logger({
  contributions,
}: {
  contributions: IUnitWithCount[];
}) {
  return (
    <div className="flex flex-wrap gap-3 my-4 w-5/6 md:max-w-screen-lg max-h-28">
      {contributions.map((item, index) => (
        <Contribution key={index} unit={item} />
      ))}
    </div>
  );
}

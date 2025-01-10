import { collection, addDoc } from "firebase/firestore";

import Unit from "@/components/unit";
import { db } from "@/firebase";
export default function UnitBox() {
  return (
    <div className="flex flex-wrap gap-1 ">
      <Unit text="Read about 1 topic" />
    </div>
  );
}

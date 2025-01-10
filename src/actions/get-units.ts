import { query, where, doc, getDocs, collection } from "firebase/firestore";

import { auth } from "@/auth";
import { db } from "@/firebase";
import { IUnit } from "@/interfaces";

export async function getUnits(): Promise<IUnit[]> {
  const session = await auth();
  const id = session?.user?.id as string;
  const user = doc(db, "users", id);
  const req = query(collection(db, "units"), where("owner", "==", user));
  try {
    const res = await getDocs(req);
    const units: IUnit[] = res.docs.map((doc) => {
      const unitData = doc.data();
      return {
        unit: unitData.unit,
        ref: doc.ref.path,
      };
    });
    return units;
  } catch (error: any) {
    throw new Error("Error fetching units: ", error);
  }
}

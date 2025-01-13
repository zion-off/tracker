"use server";

import { unstable_cache } from "next/cache";
import { query, where, doc, getDocs, collection } from "firebase/firestore";

import { db } from "@/firebase";
import { IUnit } from "@/interfaces";

export const getUnits = unstable_cache(
  async (id: string): Promise<IUnit[]> => {
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
      throw new Error(`Error fetching units: ${error.message}`);
    }
  },
  undefined,
  { revalidate: 21600, tags: ["units"] }
);

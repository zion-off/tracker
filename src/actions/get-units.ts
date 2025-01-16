"use server";

import { unstable_cache } from "next/cache";

import { db } from "@/lib/firebase";
import { UnitType } from "@/interfaces";

export const getUnits = unstable_cache(
  async (id: string): Promise<UnitType[]> => {
    const unitsRef = db.collection("units");
    try {
      const unitsSnapshot = await unitsRef
        .where("owner", "==", db.doc(`users/${id}`))
        .get();
      const units: UnitType[] = unitsSnapshot.docs.map((doc) => {
        const unitData = doc.data();
        return unitData.units;
      });
      return units.flat();
    } catch (error: any) {
      throw new Error(`Error fetching units: ${error.message}`);
    }
  },
  undefined,
  { revalidate: 3600, tags: ["units"] }
);

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

      return unitsSnapshot.docs.length === 0
        ? []
        : unitsSnapshot.docs[0].data().units;
    } catch (error: any) {
      throw new Error(`Error fetching units: ${error.message}`);
    }
  },
  undefined,
  { revalidate: 21600, tags: ["units"] }
);

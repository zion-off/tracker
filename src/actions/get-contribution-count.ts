"use server";

import { unstable_cache } from "next/cache";
import { format } from "date-fns";

import { db } from "@/lib/firebase";
import { UnitWithCountType } from "@/interfaces";
import { getUnits } from "./get-units";

export const getUnitsCount = unstable_cache(
  async (userId: string): Promise<UnitWithCountType[]> => {
    const dateString = format(new Date(), "yyyy-MM-dd");
    const contributionRef = db.doc(
      `contributions/${dateString}/users/${userId}`
    );

    try {
      const [units, contributionDoc] = await Promise.all([
        getUnits(userId),
        contributionRef.get(),
      ]);

      const unitsData = units.map((unit) => ({
        unit: unit,
        count: 0,
      }));

      const contributions = contributionDoc.exists
        ? contributionDoc.data()?.counts || {}
        : {};

      return unitsData.map((data) => ({
        unit: data.unit,
        count: contributions[data.unit] || 0,
      }));
    } catch (error) {
      throw error;
    }
  },
  undefined,
  { revalidate: 21600, tags: ["unit-count"] }
);

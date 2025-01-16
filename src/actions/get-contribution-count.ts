"use server";

import { unstable_cache } from "next/cache";
import { format } from "date-fns";

import { db } from "@/lib/firebase";
import { UnitWithCountType } from "@/interfaces";
import { getUnits } from "./get-units";

export const getUnitsCount = unstable_cache(
  async (userId: string): Promise<UnitWithCountType[]> => {
    const dateString = format(new Date(), "yyyy-MM-dd");

    try {
      const units = await getUnits(userId);
      const unitsData = units.map((unit) => ({
        unit: unit,
        count: 0,
      }));

      const contributionRef = db.doc(
        `contributions/${dateString}/users/${userId}`
      );
      const contributionDoc = await contributionRef.get();

      const contributions = contributionDoc.exists
        ? contributionDoc.data()?.counts
        : {};

      const unitsWithCounts = unitsData.map((data) => ({
        unit: data.unit,
        count: contributions[data.unit] || 0,
      }));

      return unitsWithCounts;
    } catch (error) {
      throw error;
    }
  },
  undefined,
  { revalidate: false, tags: ["unit-count"] }
);

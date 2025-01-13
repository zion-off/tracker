"use server";

import { doc, getDoc, collection } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { db } from "@/firebase";

export const getChartData = unstable_cache(
  async (id: string, year: string) => {
    const chartRef = doc(
      collection(doc(collection(db, "charts"), id), "years"),
      year
    );

    try {
      const chartDoc = await getDoc(chartRef);
      if (!chartDoc.exists()) {
        return new Array(366).fill(0);
      }

      return chartDoc.data().counts;
    } catch (error: any) {
      throw new Error(`Failed to fetch chart data: ${error.message}`);
    }
  },
  undefined,
  { revalidate: false, tags: ["chart"] }
);

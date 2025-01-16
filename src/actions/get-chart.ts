"use server";

import { unstable_cache } from "next/cache";

import { db } from "@/lib/firebase";
import { getDaysInYear } from "@/utils";

export const getChartData = unstable_cache(
  async (id: string, year: string) => {
    const chartRef = db.doc(`charts/${id}/years/${year}`);
    const daysInYear = getDaysInYear(year);

    try {
      const chartDoc = await chartRef.get();

      if (!chartDoc.exists) {
        return new Array(daysInYear).fill(0);
      }

      const chartData = chartDoc.data() || {};
      const chart = new Array(daysInYear).fill(0);

      const indices = Object.keys(chartData);
      const len = indices.length;

      for (let i = 0; i < len; i++) {
        const index = parseInt(indices[i], 10);
        if (index >= 0 && index < daysInYear) {
          chart[index] = chartData[indices[i]];
        }
      }

      return chart;
    } catch (error: any) {
      throw new Error(`Failed to fetch chart data: ${error.message}`);
    }
  },
  undefined,
  { revalidate: false, tags: ["chart"] }
);

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
      } else {
        const chartData = chartDoc.data() || {};
        const chart = new Array(daysInYear).fill(0);
        
        for (const [dayIndex, value] of Object.entries(chartData)) {
          const index = parseInt(dayIndex, 10);
          if (!isNaN(index) && index >= 0 && index < daysInYear) {
            chart[index] = value;
          }
        }

        return chart;
      }
    } catch (error: any) {
      throw new Error(`Failed to fetch chart data: ${error.message}`);
    }
  },
  undefined,
  { revalidate: false, tags: ["chart"] }
);

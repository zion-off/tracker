"use server";

import { db } from "@/lib/firebase";
import { getDaysInYear } from "@/utils";

export async function getChartByID(
  userId: string,
  year = new Date().getFullYear()
) {
  const chartRef = db.doc(`charts/${userId}/years/${year}`);
  const daysInYear = getDaysInYear(year);

  try {
    const chartDoc = await chartRef.get();

    if (!chartDoc.exists) {
      return new Array(daysInYear).fill(0);
    }

    const chartData = chartDoc.data() || {};
    const chart = new Array(daysInYear).fill(0);

    Object.entries(chartData).forEach(([dayIndex, value]) => {
      const index = parseInt(dayIndex, 10);
      if (!isNaN(index) && index >= 0 && index < daysInYear) {
        chart[index] = value;
      }
    });

    return chart;
  } catch (error: any) {
    throw new Error(`Failed to fetch chart data: ${error.message}`);
  }
}

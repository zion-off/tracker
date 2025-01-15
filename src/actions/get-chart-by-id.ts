"use server";

import { db } from "@/lib/firebase";
import { getDaysInYear } from "@/utils";

export async function getChartByID(
  userId: string,
  year = new Date().getFullYear()
) {
  const chartRef = db.doc(`charts/${userId}/years/${year}`);

  try {
    const chartDoc = await chartRef.get();
    if (!chartDoc.exists) {
      return new Array(getDaysInYear(year)).fill(0);
    }

    return chartDoc.data()?.counts;
  } catch (error: any) {
    throw new Error(`Failed to fetch chart data: ${error.message}`);
  }
}

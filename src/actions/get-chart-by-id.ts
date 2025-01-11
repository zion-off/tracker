"use server";

import { doc, getDoc, collection } from "firebase/firestore";

import { db } from "@/firebase";

export async function getChartByID(
  userId: string,
  year = new Date().getFullYear()
) {
  const chartRef = doc(
    collection(doc(collection(db, "charts"), userId), "years"),
    year.toString()
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
}

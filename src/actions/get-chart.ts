"use server"

import { doc, getDoc, collection } from "firebase/firestore";

import { db } from "@/firebase";
import { auth } from "@/auth";

export async function getChartData(year: string) {
  const session = await auth();
  const id = session?.user?.id as string;
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
}

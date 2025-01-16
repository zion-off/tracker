"use server";

import { revalidateTag } from "next/cache";
import { format, getDayOfYear } from "date-fns";
import { FieldValue } from "firebase-admin/firestore";

import { auth } from "@/auth";
import { db } from "@/lib/firebase";
import { getDaysInYear } from "@/utils";

export async function updateContribution(
  path: string,
  operation: "increment" | "decrement"
) {
  const session = await auth();
  const userId = session?.user?.id as string;
  const dateString = format(new Date(), "yyyy-MM-dd");
  const currentYear = new Date().getFullYear();
  const daysInYear = getDaysInYear(currentYear);
  const dayIndex = getDayOfYear(new Date());
  try {
    const contributionRef = db.doc(
      `contributions/${dateString}/users/${userId}`
    );

    const delta = operation === "increment" ? 1 : -1;

    await contributionRef.set(
      {
        owner: userId,
        counts: {
          [path]: FieldValue.increment(delta),
        },
      },
      { merge: true }
    );

    const chartRef = db.doc(`charts/${userId}/years/${currentYear}`);

    const chartDoc = await chartRef.get();
    let counts = chartDoc.exists
      ? chartDoc.data()?.counts
      : new Array(daysInYear).fill(0);

    counts[dayIndex] = (counts[dayIndex] || 0) + delta;

    await chartRef.set(
      {
        [dayIndex]: FieldValue.increment(delta),
      },
      { merge: true }
    );
  } catch (error: any) {
    throw new Error(`Error updating contributions: ${error.message}`);
  } finally {
    revalidateTag("unit-count");
    revalidateTag("chart");
  }
}

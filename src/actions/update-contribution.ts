"use server";

import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  increment,
  getDoc,
} from "firebase/firestore";
import { format, getDayOfYear } from "date-fns";

import { auth } from "@/auth";
import { db } from "@/firebase";

export async function updateContribution(
  path: string,
  operation: "increment" | "decrement"
) {
  const session = await auth();
  const userId = session?.user?.id as string;
  const dateString = format(new Date(), "yyyy-MM-dd");
  const currentYear = new Date().getFullYear().toString();
  const dayIndex = getDayOfYear(new Date()) - 1;
  try {
    const contributionRef = doc(
      collection(doc(collection(db, "contributions"), dateString), "users"),
      userId
    );

    const incrementValue = operation === "increment" ? 1 : -1;

    await setDoc(
      contributionRef,
      {
        owner: userId,
        date: serverTimestamp(),
        contributions: {
          [path]: increment(incrementValue),
        },
      },
      { merge: true }
    );

    const chartRef = doc(
      collection(doc(collection(db, "charts"), userId), "years"),
      currentYear
    );

    const chartDoc = await getDoc(chartRef);
    let counts = chartDoc.exists()
      ? chartDoc.data().counts
      : new Array(366).fill(0);

    counts[dayIndex] = (counts[dayIndex] || 0) + incrementValue;

    await setDoc(
      chartRef,
      {
        year: currentYear,
        counts: counts,
      },
      { merge: true }
    );
  } catch (error) {
    throw new Error(`Error updating contributions: ${error}`);
  }
}

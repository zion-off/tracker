"use server";

import { revalidateTag } from "next/cache";
import { format, getDayOfYear } from "date-fns";
import { FieldValue } from "firebase-admin/firestore";

import { auth } from "@/auth";
import { db } from "@/lib/firebase";
import { getDaysInYear } from "@/utils";

export async function updateContribution(
  unitName: string,
  operation: "increment" | "decrement"
) {
  const session = await auth();
  const userId = session?.user?.id as string;
  const dateString = format(new Date(), "yyyy-MM-dd");
  const currentYear = new Date().getFullYear();
  const dayIndex = getDayOfYear(new Date());
  const contributionRef = db.doc(`contributions/${dateString}/users/${userId}`);
  const chartRef = db.doc(`charts/${userId}/years/${currentYear}`);
  const delta = operation === "increment" ? 1 : -1;

  console.log(unitName, operation);
  const batch = db.batch();

  batch.set(
    contributionRef,
    {
      counts: {
        [unitName]: FieldValue.increment(delta),
      },
    },
    { merge: true }
  );

  batch.set(
    chartRef,
    {
      [dayIndex - 1]: FieldValue.increment(delta),
    },
    { merge: true }
  );

  try {
    await batch.commit();
  } catch (error: any) {
    throw new Error(`Error updating contributions: ${error.message}`);
  } finally {
    revalidateTag("unit-count");
    revalidateTag("chart");
  }
}

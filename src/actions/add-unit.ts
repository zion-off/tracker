"use server";

import { revalidateTag } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";

import { UnitType } from "@/interfaces";
import { db } from "@/lib/firebase";
import { auth } from "@/auth";

export async function addUnit(data: FormData): Promise<UnitType> {
  const unit = data.get("unit") as string;
  const session = await auth();
  const id = session?.user?.id as string;
  const userRef = db.doc(`users/${id}`);
  const unitsRef = db.collection("units");

  try {
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(
        unitsRef.where("owner", "==", userRef)
      );

      if (snapshot.empty) {
        transaction.create(unitsRef.doc(), {
          owner: userRef,
          units: [unit],
        });
      } else {
        transaction.update(snapshot.docs[0].ref, {
          units: FieldValue.arrayUnion(unit),
        });
      }
    });

    return unit;
  } catch (error: any) {
    throw new Error(`Unable to add unit: ${error.message}`);
  } finally {
    revalidateTag("units");
    revalidateTag("unit-count");
  }
}

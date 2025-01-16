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
    const snapshot = await unitsRef.where("owner", "==", userRef).get();

    if (snapshot.empty) {
      await unitsRef.add({
        owner: userRef,
        units: [unit],
      });
    } else {
      const docRef = snapshot.docs[0].ref;
      await docRef.update({
        units: FieldValue.arrayUnion(unit),
      });
    }
    
    return unit;
  } catch (error: any) {
    throw new Error(`Unable to add unit: ${error.message}`);
  } finally {
    revalidateTag("units");
    revalidateTag("unit-count");
  }
}

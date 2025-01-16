"use server";

import { revalidateTag } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function deleteUnit(name: string): Promise<void> {
  const session = await auth();
  const id = session?.user?.id as string;
  const unitsRef = db.collection("units");
  try {
    const snapshot = await unitsRef
      .where("owner", "==", db.doc(`users/${id}`))
      .get();

    if (snapshot.empty) {
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        units: FieldValue.arrayRemove(name),
      });
    });

    await batch.commit();
  } catch (error: any) {
    throw new Error(`Unable to delete unit ${error.message}`);
  } finally {
    revalidateTag("units");
    revalidateTag("unit-count");
  }
}

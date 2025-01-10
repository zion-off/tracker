"use server";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";

import { IUnit } from "@/interfaces";
import { db } from "@/firebase";
import { auth } from "@/auth";

export async function addUnit(data: FormData): Promise<IUnit> {
  const unit = data.get("unit") as string;
  const session = await auth();
  const id = session?.user?.id as string;
  const userRef = doc(db, "users", id);

  try {
    const doc = await addDoc(collection(db, "units"), {
      owner: userRef,
      unit: unit,
      created_at: serverTimestamp(),
    });

    return {
      unit: unit,
      ref: doc.path,
    };
  } catch (error: any) {
    throw new Error("Unable to add unit: ", error.message);
  }
}

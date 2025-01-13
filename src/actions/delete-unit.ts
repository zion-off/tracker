"use server";

import { revalidateTag } from "next/cache";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function deleteUnit(path: string): Promise<void> {
  try {
    const documentRef = doc(db, path);
    await deleteDoc(documentRef);
    revalidateTag("units");
  } catch (error: any) {
    throw new Error(`Unable to delete unit ${error.message}`);
  }
}

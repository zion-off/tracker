"use server"

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function deleteUnit(path: string): Promise<void> {
  try {
    const documentRef = doc(db, path);
    await deleteDoc(documentRef);
  } catch (error: any) {
    throw new Error(`Unable to delete unit ${error.message}`);
  }
}

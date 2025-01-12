"use server"

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { auth } from "@/auth";

export async function getUsernameById(): Promise<string | null> {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.username || null;
    }
    return null;
  } catch (error: any) {
    throw new Error(`Unable to get username: ${error.message}`);
  }
}

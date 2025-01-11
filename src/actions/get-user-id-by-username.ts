import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/firebase";

export async function getUserIdByUsername(username: string): Promise<string | null> {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;
      return userId;
    }
  } catch (error: any) {
    throw new Error(`Unable to get user's ID: ${error.message}`);
  }
  return null;
}

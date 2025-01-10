import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/firebase";

export async function userExists(email: string): Promise<boolean> {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    return false;
  }
}

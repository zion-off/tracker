import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export async function createUser(email: string) {
  try {
    await addDoc(collection(db, "users"), {
      email: email,
      username: email.split("@")[0],
      created_at: serverTimestamp(),
    });
    return true;
  } catch (error: any) {
    throw new Error(`Unable to create user: ${error.message}`)
  }
}

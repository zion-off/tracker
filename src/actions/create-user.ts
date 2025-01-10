import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function createUser(email: string) {
  try {
    await addDoc(collection(db, "users"), {
      email: email,
      username: email.split("@")[0],
      created_at: Date.now(),
    });
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create user");
  }
}

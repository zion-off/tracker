import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { auth } from "@/auth";
import { IUnit } from "@/interfaces";

export async function addUnit(data: FormData): Promise<void> {
  "use server";

  const unit = data.get("unit") as string;
  const session = await auth();
  const id = session?.user?.id as string;
  const userRef = doc(db, "users", id);

  try {
    await addDoc(collection(db, "units"), {
      owner: userRef,
      unit: unit,
      created_at: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error("Unable to add unit: ", error.message);
  }
}

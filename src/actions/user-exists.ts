"use server";

import { db } from "@/lib/firebase";

export async function userExists(email: string): Promise<boolean> {
  const usersRef = db.collection("users");
  try {
    const userSnapshot = await usersRef.where("email", "==", email).get();
    if (userSnapshot.empty) return false;
    return true;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}

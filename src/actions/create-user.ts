"use server";

import { FieldValue } from "firebase-admin/firestore";
import { db, redis } from "@/lib";

export async function createUser(email: string) {
  try {
    await db.collection("users").add({
      email: email,
      username: email.split("@")[0],
      created_at: FieldValue.serverTimestamp(),
    });
    await redis.sadd("users", email);
    return true;
  } catch (error: any) {
    throw new Error(`Unable to create user: ${error.message}`);
  }
}

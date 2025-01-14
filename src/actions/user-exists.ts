"use server";

import { redis } from "@/lib";

export async function userExists(email: string): Promise<boolean> {
  try {
    const isRegistered = await redis.sismember("users", email);
    return isRegistered === 1;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}

"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  if (!key || !value) {
    throw new Error("Invalid key=value pair");
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value: value,
    path: "/",
  });

  return `Cookie key=${key};value=${value} set`;
}

export async function getCookie(key: string) {
  if (!key) {
    throw new Error("Key must be provided");
  }

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(key);

  if (cookieValue) {
    return `Cookie value for ${key}: ${cookieValue.value}`;
  } else {
    throw new Error(`No cookie found with key=${key}`);
  }
}

export async function deleteCookie(key: string) {
  if (!key) {
    throw new Error("Key must be provided");
  }

  const cookieStore = await cookies();
  cookieStore.delete(key);

  return `Deleted cookie with key=${key}`;
}

export async function cookieExists(key: string): Promise<boolean> {
  if (!key) {
    throw new Error("Key must be provided");
  }

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(key);

  return !!cookieValue;
}

"use client";

import { getUsernameById } from "@/actions";
import { Link } from "lucide-react";

export default function CopyLink() {
  async function getLink() {
    const username = await getUsernameById();
    const link = `https://tracker.zzzzion.com/${username}`;
    await navigator.clipboard.writeText(link);
  }

  return (
    <Link
      onClick={getLink}
      size={25}
      className="p-1 bg-gray-100 stroke-gray-500 border-gray-50 hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer absolute bottom-14 left-5 hover:animate-wiggle"
    />
  );
}

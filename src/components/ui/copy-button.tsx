"use client";

import { getUsernameById } from "@/actions";
import Link from "next/link";

export default function CopyLink() {
  async function getLink() {
    const username = await getUsernameById();
    const link = `https://tracker.zzzzion.com/${username}`;
    setTimeout(() => {
      navigator.clipboard.writeText(link);
    }, 0);
  }

  return (
    <Link
      href="#"
      onClick={getLink}
      className="p-[6px] bg-gray-100 stroke-gray-500 border-gray-50 md:hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer absolute bottom-16 left-5"
    >
      🔗
    </Link>
  );
}

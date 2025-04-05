import Link from "next/link";
import { Settings } from "lucide-react";

export default function ConfigureLink() {
  return (
    <Link
      aria-label="Configure"
      aria-description="Configure your units"
      href="configure"
      className="absolute bottom-5 left-5 p-[6px] bg-gray-100 stroke-gray-500 border-gray-50 md:hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer md:hover:animate-wiggle md:hover:dark:stroke-zinc-300 md:hover:stroke-gray-500"
    >
      ⚙️
    </Link>
  );
}

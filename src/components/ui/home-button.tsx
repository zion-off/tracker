import Link from "next/link";
import { House } from "lucide-react";

export default function HomeLink() {
  return (
    <Link aria-description="Home" href="/" className="absolute bottom-5 left-5">
      <House
        size={25}
        className="p-1 bg-gray-100 stroke-gray-500 border-gray-50 hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer"
      />
    </Link>
  );
}

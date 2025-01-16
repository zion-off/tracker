import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

import { auth } from "@/auth";

export default async function SignUpLink() {
  const session = await auth();

  if (!session)
    return (
      <Link
        href="/"
        className="absolute bottom-5 left-5 bg-gray-100 stroke-gray-500 text-gray-500 border-gray-50 md:hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 dark:text-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer md:hover:dark:stroke-zinc-300 md:hover:stroke-gray-500 px-2 py-1 flex gap-1 text-xxs items-center animate-border"
      >
        <UserRoundPlus size={12} /> Sign up
      </Link>
    );
  else return null;
}

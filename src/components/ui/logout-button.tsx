import { LogOut } from "lucide-react";

import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    <button
      aria-label="Logout"
      onClick={async () => {
        "use server";
        await signOut();
      }}
      className="p-1 bg-gray-100 stroke-gray-500 border-gray-50 md:hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer absolute bottom-14 left-5"
    >
      <LogOut size={20} className="p-[4px]" />
    </button>
  );
}

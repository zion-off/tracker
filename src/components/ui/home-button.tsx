import Link from "next/link";

export default function HomeLink() {
  return (
    <Link
      aria-label="Home"
      aria-description="Log your daily contributions"
      href="/"
      className="absolute bottom-5 left-5 p-[6px] bg-gray-100 stroke-gray-500 border-gray-50 md:hover:dark:bg-zinc-800 dark:bg-zinc-900 dark:stroke-zinc-300 rounded-full dark:border dark:border-zinc-800 cursor-pointer"
    >
      🏠
    </Link>
  );
}

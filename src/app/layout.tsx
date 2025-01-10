import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthCheck from "@/auth/auth-provider";
import "./globals.css";

const inter = Inter({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`text-zinc-800 dark:text-zinc-100 ${inter.className}`}>
        <AuthCheck>{children}</AuthCheck>
      </body>
    </html>
  );
}

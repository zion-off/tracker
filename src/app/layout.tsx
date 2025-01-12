import type { Metadata } from "next";
import { Raleway } from "next/font/google";

import "./globals.css";

const raleway = Raleway({ weight: ["400", "700"], subsets: ["latin"] });

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
      <body className={`text-zinc-800 dark:text-zinc-100 ${raleway.className}`}>
        {children}
      </body>
    </html>
  );
}

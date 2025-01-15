import type { Metadata } from "next";
import type { Viewport } from "next";
import { Raleway } from "next/font/google";

import "./globals.css";

const raleway = Raleway({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tracker",
  description: "contribution chart for every day tasks",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

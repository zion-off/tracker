import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tracker",
};

import AuthCheck from "@/auth/auth-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCheck>{children}</AuthCheck>;
}

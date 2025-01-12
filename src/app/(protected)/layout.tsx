import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tracker",
};

import { Toaster } from "@/components/ui/toaster";
import AuthCheck from "@/auth/auth-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthCheck>
      {children}
      <Toaster />
    </AuthCheck>
  );
}

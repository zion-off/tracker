"use client";

import { ConfigureProvider } from "../../context/configure-context";

export default function ConfigureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ConfigureProvider>{children}</ConfigureProvider>;
}

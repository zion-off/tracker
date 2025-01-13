import { ConfigureProvider } from "@/context";

export default function ConfigureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ConfigureProvider>{children}</ConfigureProvider>;
}

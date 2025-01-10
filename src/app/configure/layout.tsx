import { ConfigureProvider } from "./context";

export default async function ConfigureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ConfigureProvider>{children}</ConfigureProvider>;
}

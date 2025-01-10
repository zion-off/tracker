import { auth } from "@/auth";
import Hero from "@/components/hero";
interface AuthCheckProps {
  children: React.ReactNode;
}

export default async function AuthCheck({ children }: AuthCheckProps) {
  const session = await auth();

  if (!session?.user) {
    return <Hero />;
  } else if (session?.user) {
    return <>{children}</>;
  }
}

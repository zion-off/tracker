import { signIn } from "@/auth";

export default function Hero() {
  const delays = [0, 0.4, 0.8, 1.2, 1.4];
  return (
    <main className="flex flex-col justify-center items-center gap-5 absolute inset-0">
      <div className="flex gap-3">
        {delays.map((delay, index) => (
          <div
            key={index}
            className="w-5 h-5 animate-interpolate rounded-md outline outline-1 -outline-offset-1 outline-gh-outline"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          className="hover:underline decoration-2 underline-offset-8"
          type="submit"
        >
          Login with GitHub
        </button>
      </form>
    </main>
  );
}

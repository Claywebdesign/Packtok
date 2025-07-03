import SignUpForm from "@/components/auth/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Sign Up</h1>
      <p className="text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-orange-400 hover:text-orange-500 font-medium underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </p>
      <SignUpForm />
    </main>
  );
}

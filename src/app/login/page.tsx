import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container flex justify-center py-6 md:py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Log in to your account
        </h1>
        <p className="mt-2 mb-6 text-subtle">
          Join to track orders and save favorites.
        </p>

        <LoginForm />

        <p className="mt-6 text-center text-subtle">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand transition-colors hover:text-ink hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
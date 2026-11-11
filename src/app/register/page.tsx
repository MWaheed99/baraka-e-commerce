import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Baraka",
  description: "Browse all products",
};
export default function RegisterPage() {
  return (
    <div className="container flex justify-center py-6 md:py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Create account
        </h1>
        <p className="mt-2 mb-6 text-subtle">
          Join to track orders and save favorites.
        </p>

        <RegisterForm />

        <p className="mt-6 text-center text-subtle">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand transition-colors hover:text-ink hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
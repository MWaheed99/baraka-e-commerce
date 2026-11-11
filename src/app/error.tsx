"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | Baraka",
  description: "Browse all products",
};
type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <section
      role="alert"
      className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center"
    >
      <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-10" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl md:text-4xl">
        Something went wrong
      </h1>

      <p className="max-w-lg rounded-lg border border-line bg-white px-4 py-3 text-sm break-words text-subtle sm:text-base">
        {error.message}
      </p>

      {error.digest && (
        <p className="text-xs text-subtle">Error ID: {error.digest}</p>
      )}

      <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button
          type="button"
          onClick={retry}
          className="h-11 px-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <RefreshCw aria-hidden="true" />
          Try again
        </Button>

        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            className:
              "h-11 px-6 transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-brand-foreground",
          })}
        >
          <Home aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
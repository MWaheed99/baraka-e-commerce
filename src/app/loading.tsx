import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container flex min-h-[60vh] flex-col items-center justify-center gap-3"
    >
      <Loader2 className="size-10 animate-spin text-brand" aria-hidden="true" />
      <p className="text-subtle">Loading...</p>
    </div>
  );
}
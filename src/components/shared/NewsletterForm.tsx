"use client";

export default function NewsletterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email address"
        aria-label="Newsletter email"
        className="h-11 w-full rounded-lg border border-field bg-white px-3.5 text-base text-ink"
      />
      <button
        type="submit"
        className="mt-2 h-11 w-full rounded-lg bg-sand font-semibold text-ink"
      >
        Subscribe
      </button>
    </form>
  );
}
"use client";

import { useState, useTransition } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { addToWishlist } from "@/services/wishlist.service";

type Props = { productId: string; title: string };

const base =
  "flex size-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-all duration-200 hover:scale-110 active:scale-95 sm:size-10";

export default function WishlistButton({ productId, title }: Props) {
  const [wished, setWished] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleAdd() {
    if (wished || pending) return;

    startTransition(async () => {
      const result = await addToWishlist(productId);

      if (result.status === "success") {
        setWished(true);
        toast.add({ type: "success", title: result.message });
      } else {
        toast.add({
          type: "error",
          title: result.message ?? "Could not add to the wishlist.",
        });
      }
    });
  }

  return (
    <button
      type="button"
      aria-pressed={wished}
      aria-busy={pending}
      aria-label={
        wished ? `${title} is in your wishlist` : `Add ${title} to wishlist`
      }
      onClick={handleAdd}
      className={`${base} ${
        wished
          ? "text-destructive hover:bg-hover"
          : "text-ink hover:bg-brand hover:text-brand-foreground"
      }`}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin sm:size-5" aria-hidden="true" />
      ) : (
        <Heart
          aria-hidden="true"
          className={`size-4 transition-transform sm:size-5 ${
            wished ? "scale-110 fill-current" : ""
          }`}
        />
      )}
    </button>
  );
}
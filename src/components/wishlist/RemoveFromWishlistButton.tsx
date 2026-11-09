"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { removeFromWishlist } from "@/services/wishlist.service";

type Props = { productId: string; title: string };

export default function RemoveFromWishlistButton({ productId, title }: Props) {
  const [pending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      const result = await removeFromWishlist(productId);

      toast.add({
        type: result.status === "success" ? "success" : "error",
        title: result.message,
      });
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={pending}
      aria-label={`Remove ${title} from wishlist`}
      onClick={handleRemove}
      className="h-11 w-full transition-all hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      {pending ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 aria-hidden="true" />
      )}
      Remove
    </Button>
  );
}
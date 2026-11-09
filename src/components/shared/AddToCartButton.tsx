"use client";

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";

type Props = { title: string };

export default function AddToCartButton({ title }: Props) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <button
      type="button"
      aria-label={`Add ${title} to cart`}
      onClick={() => setAdded(true)}
      className="group/add relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
    >
      {added ? (
        <Check className="size-5" />
      ) : (
        <Plus className="size-5 transition-transform duration-300 group-hover/add:rotate-90" />
      )}
    </button>
  );
}
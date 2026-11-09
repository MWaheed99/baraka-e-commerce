"use client";

import { useEffect, useState } from "react";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantityStepper from "@/components/shared/QuantityStepper";

type Props = { stock: number };

export default function ProductPurchase({ stock }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const soldOut = stock <= 0;

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-ink">Quantity</span>
        <QuantityStepper value={quantity} onChange={setQuantity} max={stock} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          disabled={soldOut}
          onClick={() => setAdded(true)}
          className="h-12 flex-1 text-base transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          {added ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}
          {soldOut ? "Out of stock" : added ? "Added to cart" : "Add to cart"}
        </Button>

        <Button
          type="button"
          variant="outline"
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className="h-12 text-base transition-all hover:-translate-y-0.5 sm:px-6"
        >
          <Heart
            aria-hidden="true"
            className={wished ? "fill-current text-destructive" : ""}
          />
          {wished ? "In wishlist" : "Add to wishlist"}
        </Button>
      </div>
    </div>
  );
}
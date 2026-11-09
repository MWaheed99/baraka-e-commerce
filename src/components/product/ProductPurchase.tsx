"use client";

import {  useState } from "react";
import {  Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantityStepper from "@/components/shared/QuantityStepper";
import { addToCart } from "@/services/addToCart.service";
import { toast } from "../ui/toast";
import { useCart } from "@/context/CartContext";

type Props = { stock: number,
  id : string
 };

export default function ProductPurchase({ stock , id}: Props) {
  const [quantity, setQuantity] = useState(1);

  const [wished, setWished] = useState(false);
  const soldOut = stock <= 0;
const { updateNumberOfCartItems } = useCart();
  async function handleAddToCart(id : string) {
      const data = await addToCart(id)
      if(data.status === "success"){
        toast.add({
          type: "success",
          title: data.message,
        })
        updateNumberOfCartItems(data.numOfCartItems)
      }else{
        toast.add({
          type: "error",
          title: data.message,
        })
      }
    }

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
          onClick={() => handleAddToCart(id)}
          className="h-12 flex-1 text-base transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          Add to cart
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
"use client";

import {  useState, useTransition } from "react";
import {  Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantityStepper from "@/components/shared/QuantityStepper";
import { addToCart } from "@/services/addToCart.service";
import { toast } from "../ui/toast";
import { useCart } from "@/context/CartContext";
import { addToWishlist } from "@/services/wishlist.service";

type Props = { stock: number,
  id : string
 };

export default function ProductPurchase({ stock , id}: Props) {

  
    const [pending, startTransition] = useTransition();
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

    function handleAdd() {
        if (wished || pending) return;
    
        startTransition(async () => {
          const result = await addToWishlist(id);
    
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
    <div className="space-y-4">
      {/* <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-ink">Quantity</span>
        <QuantityStepper value={quantity} onChange={setQuantity} max={stock} />
      </div> */}

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
          onClick={handleAdd}
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
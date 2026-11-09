"use client";

import { Plus } from "lucide-react";
import { addToCart } from "@/services/addToCart.service";
import { toast } from "../ui/toast";
import { useCart } from "@/context/CartContext";

type Props = { 
  title: string,
  id: string,
 };

export default function AddToCartButton({ title, id }: Props) {

  const { updateNumberOfCartItems , updateCartId } = useCart();


   async function handleAddToCart(id : string) {
    const data = await addToCart(id)
    if(data.status === "success"){
      toast.add({
        type: "success",
        title: data.message,
      })
      updateNumberOfCartItems(data.numOfCartItems)
      updateCartId(data.cartId)
    }else{
      toast.add({
        type: "error",
        title: data.message,
      })
    }
  }
  return (
    <button
      type="button"
      aria-label={`Add ${title} to cart`}
      onClick={() => handleAddToCart(id)}
      className="group/add relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
    >
        <Plus className="size-5 transition-transform duration-300 group-hover/add:rotate-90" />
    </button>
  );
}
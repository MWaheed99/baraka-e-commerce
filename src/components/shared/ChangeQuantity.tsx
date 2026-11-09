"use client";

import { updateCartCount } from "@/services/updateCart.service";

import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";

interface ChangeQuantityProps {
  count: number;
  id: string;
}
export default function ChangeQuantity({count , id}: ChangeQuantityProps) {

  const { updateNumberOfCartItems } = useCart();
  async function handleCountChange(id : string, count: number) {
    const response = await updateCartCount(id, count)
    if(response.status === "success"){
      toast.add({
        type: "success",
        title: response.message,
      })
      updateNumberOfCartItems(response.numOfCartItems)
    }else{
      toast.add({
        type: "error",
        title: response.message,
      })
    }
    
  }
	return (
		<div className="flex items-center gap-2">
			<Button onClick={() => handleCountChange(id, count + 1)} className={"h-5 w-5 flex items-center justify-center rounded-full bg-brand text-white"}>+</Button>
			<span className="text-md font-bold text-subtle">{count}</span>
			<Button onClick={() => handleCountChange(id, count - 1)} className={"h-5 w-5 flex items-center justify-center rounded-full bg-brand text-white"}>-</Button>
		</div>
	);
}

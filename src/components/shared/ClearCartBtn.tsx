"use client";
import { Button } from '../ui/button'
import { toast } from "../ui/toast";
import { useCart } from "@/context/CartContext";
import { clearCart } from '@/services/clearCart.service';
export default function ClearCartBtn() {

  const { updateNumberOfCartItems } = useCart();
    async function deleteItems() {
      const response = await clearCart();
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
    <Button onClick={() => deleteItems()} className="mt-6 h-12 w-full bg-red-700 hover:bg-red-600 text-base transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
        Clear All Cart Items
      </Button>
  )
}

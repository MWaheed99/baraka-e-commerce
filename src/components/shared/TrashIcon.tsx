"use client";

import { deleteCartItem } from "@/services/deleteCartItem.service";
import { Trash } from "lucide-react";
import { toast } from "../ui/toast";
import { useCart } from "@/context/CartContext";

export default function TrashIcon({ id }: { id: string }) {
const { updateNumberOfCartItems } = useCart();
  async function deleteItem(id: string) {
    const response = await deleteCartItem(id);
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
	return <Trash onClick={() => deleteItem(id)} size={"20"} className="text-red-600" />;
}

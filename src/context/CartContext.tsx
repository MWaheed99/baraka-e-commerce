import { createContext, useContext, useState } from "react";

interface CartContextType {
  numberOfCartItems: number;
  updateNumberOfCartItems: (count: number) => void;
  cartId: string;
  updateCartId: (cartId: string) => void;
}

const CartContext =  createContext<CartContextType | null>(null)



export default function CartProvider({ children }: { children: React.ReactNode }) {

const[numberOfCartItems, setNumberOfCartItems] = useState(0);
const [cartId , setCartId] = useState("");
function updateNumberOfCartItems(count: number) {
  setNumberOfCartItems(count);
}
function updateCartId(cartId: string) {
  setCartId(cartId);
}


  return (
    <CartContext.Provider value={{ numberOfCartItems , updateNumberOfCartItems ,updateCartId ,cartId }}>
      {children}
    </CartContext.Provider>
  )
}


export function useCart () {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  } 
  return context;
}
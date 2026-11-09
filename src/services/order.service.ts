"use server";

import { PaymentValues } from "@/schemas/PaymentSchema";
import { decode } from "next-auth/jwt";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";


export async function CreateOrder (id: string , formValues : PaymentValues) {

  const cookie = (await cookies()).get("next-auth.session-token")?.value;

  const tokenAfterDecode = await decode({
    token: cookie!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const accessToken = tokenAfterDecode?.accessToken;

  if (!accessToken) {
    return {
      status : "failed",
      message : "Please login to update cart"
    };
  }

  const {paymentMethod , ...shippingAddress} = formValues;
  const endPoint = paymentMethod === "Cash" ? `v2/orders/${id}` : `v1/orders/checkout-session/${id}?${process.env.NEXTAUTH_URL}`

  const response = await fetch(`https://ecommerce.routemisr.com/api/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: accessToken 
    },
    body: JSON.stringify({shippingAddress}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error( data.message || `${response.status} Error Occurred while placing order`);
  }

  if(data.status === "success"){

    updateTag("get-cart")

  }

  return data;
}
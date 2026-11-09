"use server";

import { decode } from "next-auth/jwt";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function clearCart () {

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

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: accessToken 
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to Clear cart");
  }

  if(data.status === "success"){

    updateTag("get-cart")

  }

  return data;
}
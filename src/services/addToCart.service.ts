"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addToCart (id: string) {

   const storedCookies = await cookies()

  const cookie = storedCookies.get("next-auth.session-token")?.value || storedCookies.get("__Secure-next-auth.session-token")?.value;

  const tokenAfterDecode = await decode({
    token: cookie!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const accessToken = tokenAfterDecode?.accessToken;

  if (!accessToken) {
    return {
      status : "failed",
      message : "Please login to add product to cart"
    };
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({ productId  : id }),
    headers: {
      "Content-Type": "application/json",
      token: accessToken as string
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return await response.json();
}
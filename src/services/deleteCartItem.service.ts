"use server";

import { decode } from "next-auth/jwt";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCartItem (id: string) {

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
      message : "Please login to update cart"
    };
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: accessToken 
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update quantity");
  }

  if(data.status === "success"){

    updateTag("get-cart")

  }

  return data;
}
"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getCart () {

  const storedCookies = await cookies()

  const cookie = storedCookies.get("next-auth.session-token")?.value || storedCookies.get("__Secure-next-auth.session-token")?.value;

  const tokenAfterDecode = await decode({
    token: cookie!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const accessToken = tokenAfterDecode?.accessToken;

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {token: accessToken as string},
    next : {tags : ["get-cart"]}
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return await response.json();
}
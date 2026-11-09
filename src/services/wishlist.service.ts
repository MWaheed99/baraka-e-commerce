"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { WishlistResponse } from "@/interfaces/wishlist";

import { revalidatePath, updateTag } from "next/cache";
export async function getWishlist(): Promise<WishlistResponse> {
  const storedCookies = await cookies()

  const cookie = storedCookies.get("next-auth.session-token")?.value || storedCookies.get("__Secure-next-auth.session-token")?.value;

  if (!cookie) {
    throw new Error("You need to log in to see your wishlist");
  }

  const tokenAfterDecode = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const accessToken = tokenAfterDecode?.accessToken;

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: { token: accessToken as string },
    next: { tags: ["get-wishlist"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return await response.json();
}


export async function addToWishlist(productId: string) {
  const storedCookies = await cookies()

  const cookie = storedCookies.get("next-auth.session-token")?.value || storedCookies.get("__Secure-next-auth.session-token")?.value;

  if (!cookie) {
    return { status: "fail", message: "Please log in first." };
  }

  const tokenAfterDecode = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const accessToken = tokenAfterDecode?.accessToken;

  if (!accessToken) {
    return { status: "fail", message: "Please log in first." };
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: accessToken as string,
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  const json = await response.json();

  if (response.ok) revalidatePath("/wishlist");

  return json;
}

export async function removeFromWishlist(id: string) {
  const storedCookies = await cookies()

  const cookie = storedCookies.get("next-auth.session-token")?.value || storedCookies.get("__Secure-next-auth.session-token")?.value;

  if (!cookie) {
    return {
      status: "failed",
      message: "Please login to update your wishlist",
    };
  }

  const tokenAfterDecode = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const accessToken = tokenAfterDecode?.accessToken;

  if (!accessToken) {
    return {
      status: "failed",
      message: "Please login to update your wishlist",
    };
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: accessToken as string,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to remove from wishlist");
  }

  if (data.status === "success") {
    updateTag("get-wishlist");
  }

  return data;
}
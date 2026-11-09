"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { Order } from "@/interfaces/order";

// function readUserId(
//   decoded: Record<string, unknown> | null,
//   accessToken: string,
// ): string | null {
//   const direct = decoded?.id ?? decoded?.userId ?? decoded?.sub;
//   if (typeof direct === "string") return direct;

//   try {
//     const payload = accessToken.split(".")[1];
//     const json = JSON.parse(Buffer.from(payload, "base64url").toString());
//     return typeof json.id === "string" ? json.id : null;
//   } catch {
//     return null;
//   }
// }


// async  function getUserId (){
//   const encryptedToken = (await cookies()).get("next-auth.session-token")?.value;
//   const token = await decode({
//     token : encryptedToken,
//     secret : process.env.NEXTAUTH_SECRET!
//   })

//   return token?.sub
// }

export async function getOrders() {
 
    const cookie = (await cookies()).get("next-auth.session-token")?.value;

  const tokenAfterDecode = await decode({
    token: cookie!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const userId = tokenAfterDecode?.sub;


  if (!userId) {
    return {
      status : "failed",
      message : "Please login to update cart"
    };
  }


  if (!userId) {
    throw new Error("User id not found in token");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      next: { tags: ["get-orders"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await response.json();
}
// "use server";

// import type { RegisterResult } from "@/interfaces/auth";
// import { registerSchema, type RegisterValues } from "@/schemas/auth.schema";

// const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// export async function registerUser(
//   values: RegisterValues,
// ): Promise<RegisterResult> {
//   const parsed = registerSchema.safeParse(values);

//   if (!parsed.success) {
//     return { success: false, message: "Please check the form and try again." };
//   }

//   try {
//     const res = await fetch(`${BASE_URL}/auth/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(parsed.data),
//       cache: "no-store",
//     });

//     const json = await res.json().catch(() => null);

//     if (!res.ok) {
//       return {
//         success: false,
//         message:
//           typeof json?.message === "string"
//             ? json.message
//             : "Could not create the account. Please try again.",
//       };
//     }

//     return { success: true, message: "Account created successfully" };
//   } catch {
//     return {
//       success: false,
//       message: "Could not reach the server. Check your connection and try again.",
//     };
//   }
// }

"use server";
import {
  type ForgotPasswordValues,
  type ResetPasswordValues,
} from "@/schemas/auth.schema";
import { type RegisterValues } from "@/schemas/auth.schema";
import { LoginValues } from "@/schemas/login.schema";
import { cookies } from "next/headers";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function registerUser(
  values: RegisterValues,
) {

  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export async function loginUser(
  values: LoginValues,
) {

  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-store",
  });

  const json = await res.json();

  const cookie = await cookies();
  cookie.set("token", json.token, { 
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: true,
   });

  return json;
}


export async function forgotPassword(values: ForgotPasswordValues) {
  const res = await fetch(`${BASE_URL}/auth/forgotPasswords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-store",
  });

  const json = await res.json();

  return { ...json, ok: res.ok };
}

export async function resetPassword(values: ResetPasswordValues) {
  const res = await fetch(`${BASE_URL}/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-store",
  });

  const json = await res.json();

  return { ...json, ok: res.ok };
}
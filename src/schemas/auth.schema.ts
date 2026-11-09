import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
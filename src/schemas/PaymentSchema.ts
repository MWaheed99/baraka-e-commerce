import { z } from "zod";

export const paymentSchema = z
  .object({
    details: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    paymentMethod: z.enum(["Cash", "Card"], {
     error: "Payment method must be either 'Cash' or 'Card'",
    }),
  })
  

export type PaymentValues = z.infer<typeof paymentSchema>;
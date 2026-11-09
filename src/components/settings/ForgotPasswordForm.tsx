"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/schemas/auth.schema";
import { forgotPassword } from "@/services/auth.service";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    const result = await forgotPassword(values);

    if (result.ok) {
      toast.add({
        type: "success",
        title: result.message ?? "Reset code sent to your email",
      });
      form.reset();
    } else {
      toast.add({
        type: "error",
        title: result.message ?? "Could not send the reset code",
      });
    }
  }

  return (
    <form id="form-forgot" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-forgot-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-forgot-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                autoComplete="email"
                className="h-11"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-11 w-full text-base transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin" aria-hidden="true" />
          )}
          {form.formState.isSubmitting ? "Sending..." : "Send reset code"}
        </Button>
      </FieldGroup>
    </form>
  );
}
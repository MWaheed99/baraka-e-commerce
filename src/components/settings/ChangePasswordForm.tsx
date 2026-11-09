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
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/schemas/auth.schema";
import { resetPassword } from "@/services/auth.service";

export default function ChangePasswordForm() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  async function onSubmit(values: ResetPasswordValues) {
    const result = await resetPassword(values);

    if (result.ok) {
      toast.add({ type: "success", title: "Password changed successfully" });
      form.reset();
    } else {
      toast.add({
        type: "error",
        title: result.message ?? "Could not change the password",
      });
    }
  }

  return (
    <form id="form-change-password" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-change-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-change-email"
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

        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-change-password">New password</FieldLabel>
              <Input
                {...field}
                id="form-change-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="At least 8 characters"
                autoComplete="new-password"
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
          {form.formState.isSubmitting ? "Saving..." : "Change password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
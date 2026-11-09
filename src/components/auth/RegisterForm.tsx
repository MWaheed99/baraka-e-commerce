"use client";

import { useState } from "react";
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
import { registerSchema, type RegisterValues } from "@/schemas/auth.schema";
import { registerUser } from "@/services/auth.service";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(values: RegisterValues) {

    const result = await registerUser(values);
    if(result.message === "success"){
      toast.add({
        type: "success",
        title: "Account created successfully",
      })
      router.push("/login");
    }else{
      toast.add({
        type: "error",
        title: result.message,
      })
    }
  }

  return (
    <form id="form-register" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-register-name">Full name</FieldLabel>
              <Input
                {...field}
                id="form-register-name"
                aria-invalid={fieldState.invalid}
                placeholder="Your name"
                autoComplete="name"
                className="h-11"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-register-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-register-email"
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
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-register-phone">Phone</FieldLabel>
              <Input
                {...field}
                id="form-register-phone"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="01012345678"
                autoComplete="tel"
                className="h-11"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-register-password">Password</FieldLabel>
              <Input
                {...field}
                id="form-register-password"
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

        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-register-repassword">
                Confirm password
              </FieldLabel>
              <Input
                {...field}
                id="form-register-repassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Repeat password"
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
          {form.formState.isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
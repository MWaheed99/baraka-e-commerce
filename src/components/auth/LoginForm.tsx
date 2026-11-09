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
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { loginSchema, LoginValues } from "@/schemas/login.schema";
import { signIn } from "next-auth/react";

export default function LoginForm() {

  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 
 // async function onSubmit(values: LoginValues) {

  //   const result = await loginUser(values);
  //   if(result.message === "success"){
  //     toast.add({
  //       type: "success",
  //       title: "Login successfully",
  //     })
  //     router.push("/");
  //   }else{
  //     toast.add({
  //       type: "error",
  //       title: result.message,
  //     })
  //   }
  // }

  async function onSubmit(values: LoginValues) {

    const response = await signIn("credentials" , {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if(response?.ok){
      toast.add({
        type: "success",
        title: "Login successfully",
      })
      router.push("/");
    }else{
      toast.add({
        type: "error",
        title: "Invalid email or password",
      })
    }
  }


  return (
    <form id="form-register" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        

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

        
        
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-11 w-full text-base transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin" aria-hidden="true" />
          )}
          {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { paymentSchema, PaymentValues } from "@/schemas/PaymentSchema";

import { FieldContent, FieldDescription, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateOrder } from "@/services/order.service";
import { toast } from "../ui/toast";
import { useCart } from "@/context/CartContext";
const plans = [
	{
		id: "Cash",
		title: "Cash",
	},
	{
		id: "Card",
		title: "Card",
	},
] as const;
export default function CashPayment() {
	const router = useRouter();
	const { cartId, updateNumberOfCartItems } = useCart();

	const form = useForm<PaymentValues>({
		resolver: zodResolver(paymentSchema),
		defaultValues: {
			details: "",
			phone: "",
			city: "",
			postalCode: "",
			paymentMethod: "Cash",
		},
	});

	console.log("cartId", cartId);

	async function onSubmit(values: PaymentValues) {
		const res = await CreateOrder(cartId, values);
		if (res.status === "success") {
			if (form.getValues("paymentMethod") === "Cash") {
				toast.add({
					type: "success",
					title: res.message,
				});
				router.push("/allorders");
				updateNumberOfCartItems(0);
			}else{
				open(res.session.url, "_self");
			}
		} else {
			toast.add({
				type: "error",
				title: res.message,
			});
		}
	}

	return (
		<form id="form-register" onSubmit={form.handleSubmit(onSubmit)} noValidate>
			<FieldGroup>
				<Controller
					name="details"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="details">Address Details</FieldLabel>
							<Input {...field} id="details" aria-invalid={fieldState.invalid} placeholder="Your address details" autoComplete="name" className="h-11" />
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="phone"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-register-phone">phone</FieldLabel>
							<Input {...field} id="form-register-phone" type="tel" aria-invalid={fieldState.invalid} placeholder="01012345678" autoComplete="tel" className="h-11" />
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="city"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-register-city">city</FieldLabel>
							<Input {...field} id="form-register-city" type="text" aria-invalid={fieldState.invalid} placeholder="Your city" autoComplete="city" className="h-11" />
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="postalCode"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-register-postalCode">postalCode</FieldLabel>
							<Input {...field} id="form-register-postalCode" type="text" aria-invalid={fieldState.invalid} placeholder="At least 8 characters" autoComplete="new-postalCode" className="h-11" />
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="paymentMethod"
					control={form.control}
					render={({ field, fieldState }) => (
						<FieldSet>
							<FieldLegend>Payment Method</FieldLegend>
							<RadioGroup name={field.name} value={field.value} onValueChange={field.onChange}>
								{plans.map((plan) => (
									<FieldLabel key={plan.id} htmlFor={`form-rhf-radiogroup-${plan.id}`}>
										<Field orientation="horizontal" data-invalid={fieldState.invalid}>
											<FieldContent>
												<FieldTitle>{plan.title}</FieldTitle>
											</FieldContent>
											<RadioGroupItem value={plan.id} id={`form-rhf-radiogroup-${plan.id}`} aria-invalid={fieldState.invalid} />
										</Field>
									</FieldLabel>
								))}
							</RadioGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</FieldSet>
					)}
				/>

				<Button type="submit" disabled={form.formState.isSubmitting} className="h-11 w-full text-base transition-all hover:-translate-y-0.5 hover:shadow-lg">
					{form.formState.isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
					{form.formState.isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</FieldGroup>
		</form>
	);
}

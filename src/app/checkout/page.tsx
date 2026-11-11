import CashPayment from "@/components/paymentForm/CashPayment";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Checkout | Baraka",
  description: "Browse all products",
};

export default function Checkout() {
	return (
		<div className="container flex justify-center py-6 md:py-12">
			<div className="w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-8">
				<h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Checkout</h1>
				<p className="mt-2 mb-6 text-subtle">Please fill in your details to complete the purchase.</p>

				<CashPayment />
			</div>
		</div>
	);
}

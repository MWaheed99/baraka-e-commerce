import { Suspense } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { buttonVariants } from "@/components/ui/button";
import type { CartResponse } from "@/interfaces/cart";
import { getCart } from "@/services/cart.service";
// import { getCart } from "@/services/cart.service";

async function CartContent() {
	const cart: CartResponse = await getCart();
	const items = cart.data.products;

	return (
		<>
			<PageHeader title="Shopping Cart" subtitle={`${cart.numOfCartItems} ${cart.numOfCartItems === 1 ? "item" : "items"} in your cart`} icon={ShoppingCart} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

			<div className="container pt-6 md:pt-10">
				{items.length === 0 ? (
					<div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-white px-4 py-12 text-center">
						<ShoppingCart className="size-12 text-subtle" aria-hidden="true" />
						<h2 className="text-xl font-bold text-ink">Your cart is empty</h2>
						<p className="text-subtle">Add some products and they will show up here.</p>
						<Link
							href="/products"
							className={buttonVariants({
								className: "h-11 px-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
							})}
						>
							Browse products
						</Link>
					</div>
				) : (
					<div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
						<ul className="space-y-3 sm:space-y-4">
							{items.map((item) => (
								<CartItemRow key={item._id} item={item} />
							))}
						</ul>

						<CartSummary itemsCount={cart.numOfCartItems} total={cart.data.totalCartPrice} />
					</div>
				)}
			</div>
		</>
	);
}

export default function CartPage() {
	return (
		<Suspense
			fallback={
				<div className="container grid gap-6 pt-6 md:pt-10 lg:grid-cols-[1fr_380px]">
					<div className="h-96 animate-pulse rounded-2xl bg-sand" />
					<div className="h-64 animate-pulse rounded-2xl bg-sand" />
				</div>
			}
		>
			<CartContent />
		</Suspense>
	);
}

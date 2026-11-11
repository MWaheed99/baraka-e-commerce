import { Suspense } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ProductCard from "@/components/shared/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { getWishlist } from "@/services/wishlist.service";
import RemoveFromWishlistButton from "@/components/wishlist/RemoveFromWishlistButton";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Wishlist | Baraka",
	description: "Browse all products",
};
async function WishlistContent() {
	const wishlist = await getWishlist();
	const products = wishlist.data;

	return (
		<>
			<PageHeader title="My Wishlist" subtitle={`${products.length} ${products.length === 1 ? "item" : "items"} saved`} icon={Heart} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />

			<div className="container pt-6 md:pt-10">
				{products.length === 0 ? (
					<div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-white px-4 py-12 text-center">
						<Heart className="size-12 text-subtle" aria-hidden="true" />
						<h2 className="text-xl font-bold text-ink">Your wishlist is empty</h2>
						<p className="text-subtle">Save products you like and they will show up here.</p>
						<Link
							href="/shop"
							className={buttonVariants({
								className: "h-11 px-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
							})}
						>
							Browse products
						</Link>
					</div>
				) : (
					<ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
						{products.map((product) => (
							<li key={product._id} className="flex flex-col gap-2">
								<div className="flex-1">
									<ProductCard product={product} />
								</div>
								<RemoveFromWishlistButton productId={product._id} title={product.title} />
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}

export default function WishlistPage() {
	return (
		<Suspense
			fallback={
				<div className="container grid grid-cols-2 gap-3 pt-6 sm:grid-cols-3 md:pt-10 lg:grid-cols-4 lg:gap-6">
					{Array.from({ length: 4 }, (_, i) => (
						<div key={i} className="h-80 animate-pulse rounded-2xl bg-sand" />
					))}
				</div>
			}
		>
			<WishlistContent />
		</Suspense>
	);
}

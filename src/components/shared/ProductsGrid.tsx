import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import type { Product } from "@/interfaces/product";

type Props = {
  products: Product[];
  emptyText?: string;
};

export default function ProductsGrid({
  products,
  emptyText = "There are no products here yet.",
}: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-white px-4 py-12 text-center">
        <ShoppingBag className="size-12 text-subtle" aria-hidden="true" />
        <h2 className="text-xl font-bold text-ink">No products found</h2>
        <p className="text-subtle">{emptyText}</p>
        <Link
          href="/shop"
          className={buttonVariants({
            className: "h-11 px-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
          })}
        >
          View all products
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-subtle">{products.length} products</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
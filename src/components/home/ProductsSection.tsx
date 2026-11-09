import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/shared/ProductCard";
import { getProducts } from "@/services/products.service";
import Link from "next/link";

// const HOME_PRODUCTS_LIMIT = 8;

export default async function ProductsSection() {
  const products = await getProducts();
  const featured = products.filter((product) => product.sold > 999);

  return (
    <section>
      <SectionHeader title="Most popular products" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        { featured.length > 0 ? featured.map((product) => (
          <ProductCard key={product._id} product={product} />
        )): (
          <p className="rounded-xl border border-line bg-white p-6 text-center text-subtle">
            No products available right now.
          </p>
        )}
      </div>

      <Link href="/products" className="mt-6 block text-start text-sm text-brand underline">
      View all products
      </Link>
    </section>
  );
}
import { ShoppingBag } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ProductCard from "@/components/shared/ProductCard";
import { getProducts } from "@/services/products.service";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        title="All Products"
        subtitle="Browse everything we have in store"
        icon={ShoppingBag}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <div className="container pt-6 md:pt-10">
        {products.length === 0 ? (
          <p className="rounded-xl border border-line bg-white p-6 text-center text-subtle">
            No products available right now.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-subtle">{products.length} products</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
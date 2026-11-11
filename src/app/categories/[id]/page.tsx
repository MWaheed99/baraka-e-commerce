import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ProductsGrid from "@/components/shared/ProductsGrid";
import { getCategory } from "@/services/categories.service";
import { getProductsByCategory } from "@/services/products.service";
import type { Metadata } from "next";



type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Category | Baraka",
  description: "Browse all products",
};


async function CategoryContent({ params }: Props) {
  const { id } = await params;

  const category = await getCategory(id);
  if (!category) notFound();

  const products = await getProductsByCategory(id);

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle={`Browse our ${category.name} collection`}
        icon={ShoppingBag}
        image={category.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
      />

      <div className="container pt-6 md:pt-10">
        <ProductsGrid
          products={products}
          emptyText="There are no products in this category yet."
        />
      </div>
    </>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="container grid grid-cols-2 gap-3 pt-6 sm:grid-cols-3 md:pt-10 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-sand sm:h-96" />
          ))}
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
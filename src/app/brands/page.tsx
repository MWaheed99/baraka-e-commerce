import { Tags } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import BrandCard from "@/components/brands/BrandCard";
import { getBrands } from "@/services/brands.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands | Baraka",
  description: "Browse all products",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <>
      <PageHeader
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        icon={Tags}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <div className="container pt-6 md:pt-10">
        {brands.length === 0 ? (
          <p className="rounded-xl border border-line bg-white p-6 text-center text-subtle">
            No brands available right now.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
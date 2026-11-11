import CategoriesSection from "@/components/home/CategoriesSection";
import HeroSlider from "@/components/home/HeroSlider";
import ProductsSection from "@/components/home/ProductsSection";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Baraka",
  description: "Browse all products",
};

export default function Home() {
  return (
    <>
    <div className="container space-y-20">
      <Suspense>
        <HeroSlider />
      </Suspense>
      <CategoriesSection />
      <ProductsSection />
    </div>
    </>
  );
}

import CategoriesSection from "@/components/home/CategoriesSection";
import HeroSlider from "@/components/home/HeroSlider";
import ProductsSection from "@/components/home/ProductsSection";
import { Suspense } from "react";

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

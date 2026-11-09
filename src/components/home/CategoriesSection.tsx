import SectionHeader from "@/components/shared/SectionHeader";
import CategoriesSlider from "@/components/home/CategoriesSlider";
import { getCategories } from "@/services/categories.service";

export default async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section aria-labelledby="categories-title">
      <SectionHeader title="Shop by category" href="/products" />
      <CategoriesSlider categories={categories} />
    </section>
  );
}
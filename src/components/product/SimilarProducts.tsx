import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/shared/ProductCard";
import { getProductsByCategory } from "@/services/products.service";

type Props = { categoryId: string; currentId: string };

export default async function SimilarProducts({ categoryId, currentId }: Props) {
  const products = await getProductsByCategory(categoryId);
  const similar = products.filter((p) => p._id !== currentId).slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <section>
      <SectionHeader title="You may also like" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {similar.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
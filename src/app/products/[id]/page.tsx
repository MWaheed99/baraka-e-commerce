import { Suspense } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReviews from "@/components/product/ProductReviews";
import SimilarProducts from "@/components/product/SimilarProducts";
import { getProduct } from "@/services/products.service";

type Props = { params: Promise<{ id: string }> };



export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);



  const images = Array.from(new Set([product.imageCover, ...product.images]));

  return ( 
    <div className="container">
      <Suspense
        fallback={
          <div className="grid gap-8 pt-4 md:pt-8 lg:grid-cols-2 lg:gap-12">
            <div className="aspect-square animate-pulse rounded-2xl bg-sand" />
            <div className="h-96 animate-pulse rounded-2xl bg-sand" />
          </div>
        }
      >
        <div className="space-y-12 pt-4 md:space-y-16 md:pt-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <ProductReviews
        reviews={product.reviews ?? []}
        average={product.ratingsAverage}
        count={product.ratingsQuantity}
      />

      
        <SimilarProducts
          categoryId={product.category._id}
          currentId={product._id}
        />
      
    </div>
      </Suspense>
    </div>
  );
}
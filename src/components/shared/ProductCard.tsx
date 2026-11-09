import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/interfaces/product";
import { formatPrice } from "@/lib/format";
import Rating from "@/components/shared/Rating";
import ProductActions from "@/components/shared/ProductActions";
import AddToCartButton from "@/components/shared/AddToCartButton";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const current = product.priceAfterDiscount ?? product.price;
  const hasDiscount = current < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - current / product.price) * 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
        <Image
          src={product.imageCover}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 45vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 rounded-md bg-destructive px-2 py-1 text-xs font-bold text-white">
            -{discountPercent}%
          </span>
        )}

        <ProductActions title={product.title} />
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <p className="text-xs text-subtle sm:text-sm">{product.category.name}</p>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-ink sm:min-h-12 sm:text-base">
          <Link
            href={`/products/${product._id}`}
            className="transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand"
          >
            {product.title}
          </Link>
        </h3>

        <Rating average={product.ratingsAverage} count={product.ratingsQuantity} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-x-2">
            <span className="text-base font-bold text-brand sm:text-lg">
              {formatPrice(current)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-subtle line-through sm:text-sm">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <AddToCartButton title={product.title} />
        </div>
      </div>
    </article>
  );
}
import Image from "next/image";
import { RotateCcw, Truck } from "lucide-react";
import type { ProductDetails } from "@/interfaces/product";
import { formatPrice } from "@/lib/format";
import Rating from "@/components/shared/Rating";
import Tag from "@/components/shared/Tag";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductDescription from "@/components/product/ProductDescription";

type Props = { product: ProductDetails };

export default function ProductInfo({ product }: Props) {
  const current = product.priceAfterDiscount ?? product.price;
  const hasDiscount = current < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - current / product.price) * 100)
    : 0;
  const inStock = product.quantity > 0;
  const lowStock = inStock && product.quantity <= 10;

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{product.category.name}</Tag>
        {product.subcategory.map((s) => (
          <Tag key={s._id}>{s.name}</Tag>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-subtle">
        <div className="relative size-8">
          <Image
            src={product.brand.image}
            alt=""
            fill
            sizes="32px"
            className="object-contain"
          />
        </div>
        <span className="font-medium">{product.brand.name}</span>
      </div>

      <h1 className="text-2xl font-extrabold break-words text-ink sm:text-3xl">
        {product.title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Rating average={product.ratingsAverage} count={product.ratingsQuantity} />
        <span className="text-sm text-subtle">
          {product.sold.toLocaleString("en-US")} sold
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-3xl font-bold text-brand">
          {formatPrice(current)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-subtle line-through">
              {formatPrice(product.price)}
            </span>
            <span className="rounded-md bg-destructive px-2 py-1 text-xs font-bold text-white">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      <p
        className={`flex items-center gap-2 text-sm font-medium ${
          inStock ? "text-brand" : "text-destructive"
        }`}
      >
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-current"
        />
        {!inStock
          ? "Out of stock"
          : lowStock
            ? `Only ${product.quantity} left`
            : "In stock"}
      </p>

      <hr className="border-line" />

      <ProductPurchase stock={product.quantity} id={product._id} />

      <ul className="space-y-2 text-sm text-subtle">
        <li className="flex items-center gap-2">
          <RotateCcw className="size-4 text-brand" aria-hidden="true" />
          Free returns within 14 days
        </li>
        <li className="flex items-center gap-2">
          <Truck className="size-4 text-brand" aria-hidden="true" />
          Ships in 2-3 days
        </li>
      </ul>

      <hr className="border-line" />

      <ProductDescription text={product.description} />
    </div>
  );
}
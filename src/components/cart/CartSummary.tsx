import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import ClearCartBtn from "../shared/ClearCartBtn";

type Props = { itemsCount: number; total: number };

export default function CartSummary({ itemsCount, total }: Props) {
  return (
    <aside className="rounded-2xl border border-line bg-white p-5 sm:p-6 lg:sticky lg:top-6">
      <h2 className="mb-4 text-lg font-bold text-ink">Order summary</h2>

      <dl className="space-y-3 text-sm sm:text-base">
        <div className="flex items-center justify-between">
          <dt className="text-subtle">Items</dt>
          <dd className="font-medium text-ink">{itemsCount}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3 text-base font-bold sm:text-lg">
          <dt className="text-ink">Total</dt>
          <dd className="text-brand">{formatPrice(total)}</dd>
        </div>
      </dl>

      <Link
        href="/checkout"
        className={buttonVariants({
          className:
            "mt-6 h-12 w-full text-base transition-all hover:-translate-y-0.5 hover:shadow-lg",
        })}
      >
        Proceed to checkout
      </Link>

      <Link
        href="/shop"
        className="mt-3 flex min-h-11 items-center justify-center text-sm font-medium text-brand transition-colors hover:text-ink hover:underline"
      >
        Continue shopping
      </Link>
      <ClearCartBtn />
    </aside>
  );
}
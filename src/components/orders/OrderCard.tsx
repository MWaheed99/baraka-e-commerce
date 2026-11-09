import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Order } from "@/interfaces/order";
import { formatDate, formatPrice } from "@/lib/format";
import Tag from "@/components/shared/Tag";

type Props = { order: Order };

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Cash on delivery",
  card: "Card",
};

const PREVIEW_COUNT = 4;

export default function OrderCard({ order }: Props) {
  const items = order.cartItems;
  const preview = items.slice(0, PREVIEW_COUNT);
  const extra = items.length - preview.length;
  const subtotal = items.reduce((sum, i) => sum + i.price * i.count, 0);

  return (
    <article className="rounded-2xl border border-line bg-white p-4 transition-shadow duration-300 hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-ink sm:text-xl">
            Order #{order.id}
          </h2>
          <p className="text-sm text-subtle">{formatDate(order.createdAt)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag>{order.isDelivered ? "Delivered" : "Processing"}</Tag>
          <Tag>{order.isPaid ? "Paid" : "Unpaid"}</Tag>
        </div>
      </div>

      <ul className="mt-4 flex items-center gap-2" aria-label="Order items">
        {preview.map((item) => (
          <li
            key={item._id}
            className="relative size-14 overflow-hidden rounded-lg border border-line bg-white sm:size-16"
          >
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              fill
              sizes="64px"
              className="object-contain"
            />
          </li>
        ))}
        {extra > 0 && (
          <li className="flex size-14 items-center justify-center rounded-lg bg-sand text-sm font-semibold text-ink sm:size-16">
            +{extra}
          </li>
        )}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="font-semibold text-ink">Total</span>
        <span className="text-lg font-bold text-brand">
          {formatPrice(order.totalOrderPrice)}
        </span>
      </div>

      <details className="group mt-2">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 font-medium text-brand transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
          View details
          <ChevronDown
            className="size-4 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="mt-3 space-y-5">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item._id} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                  <Image
                    src={item.product.imageCover}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-ink">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-subtle">
                    {item.count} × {formatPrice(item.price)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink">
                  {formatPrice(item.price * item.count)}
                </span>
              </li>
            ))}
          </ul>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-bold text-ink">Shipping address</h3>
              <address className="text-sm text-subtle not-italic">
                {order.shippingAddress.details}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.phone}
              </address>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-bold text-ink">Summary</h3>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-subtle">Items</dt>
                  <dd className="text-ink">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-subtle">Shipping</dt>
                  <dd className="text-ink">{formatPrice(order.shippingPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-subtle">Tax</dt>
                  <dd className="text-ink">{formatPrice(order.taxPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-subtle">Payment</dt>
                  <dd className="text-ink">
                    {PAYMENT_LABELS[order.paymentMethodType] ??
                      order.paymentMethodType}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </details>
    </article>
  );
}
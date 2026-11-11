import { Suspense } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import OrderCard from "@/components/orders/OrderCard";
import { buttonVariants } from "@/components/ui/button";
import { getOrders } from "@/services/orders.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Orders | Baraka",
  description: "Browse all products",
};

async function OrdersContent() {
  const orders = await getOrders();
  const sorted = [...orders].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <>
      <PageHeader
        title="My Orders"
        subtitle={`${sorted.length} ${sorted.length === 1 ? "order" : "orders"} placed`}
        icon={Package}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Orders" }]}
      />

      <div className="container pt-6 md:pt-10">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-white px-4 py-12 text-center">
            <Package className="size-12 text-subtle" aria-hidden="true" />
            <h2 className="text-xl font-bold text-ink">No orders yet</h2>
            <p className="text-subtle">Your orders will show up here once you place one.</p>
            <Link
              href="/shop"
              className={buttonVariants({
                className: "h-11 px-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
              })}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <ul className="space-y-4 sm:space-y-6">
            {sorted.map((order) => (
              <li key={order._id}>
                <OrderCard order={order} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="container space-y-4 pt-6 md:pt-10">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl bg-sand" />
          ))}
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
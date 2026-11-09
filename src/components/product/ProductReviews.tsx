import type { Review } from "@/interfaces/product";
import { formatDate } from "@/lib/format";
import Stars from "@/components/shared/Stars";

type Props = { reviews: Review[]; average: number; count: number };

export default function ProductReviews({ reviews, average, count }: Props) {
  const sorted = [...reviews].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <section aria-labelledby="reviews-title" className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 md:mb-6">
        <h2 id="reviews-title" className="text-xl font-bold text-ink md:text-2xl">
          Customer reviews
        </h2>
        {count > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-ink">
              {average.toFixed(1)}
            </span>
            <Stars value={average} />
            <span className="text-sm text-subtle">({count})</span>
          </div>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-xl border border-line bg-white p-6 text-center text-subtle">
          No reviews yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sorted.map((r) => (
            <li
              key={r._id}
              className="min-w-0 rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sand font-bold text-brand"
                >
                  {r.user.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{r.user.name}</p>
                  <p className="text-xs text-subtle">{formatDate(r.createdAt)}</p>
                </div>
                <div className="shrink-0">
                  <Stars value={r.rating} className="size-3.5" />
                </div>
              </div>
              <p className="mt-3 text-sm wrap-anywhere text-subtle sm:text-base">
                {r.review}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
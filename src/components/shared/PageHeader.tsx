import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  image?: string;
  breadcrumbs: Crumb[];
};

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  image,
  breadcrumbs,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-brand to-ink text-white">
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 size-56 rounded-full bg-white/5 sm:size-72"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-white/5"
      />

      <div className="container relative py-6 sm:py-8 md:py-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;

              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-4 flex items-center gap-4 sm:mt-6 sm:gap-5">
          <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/20 transition-transform duration-300 hover:scale-105 sm:size-20">
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <Icon className="size-7 sm:size-10" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold wrap-anywhere sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-white/85 sm:text-base md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
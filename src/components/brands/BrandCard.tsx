import Image from "next/image";
import type { BrandItem } from "@/interfaces/brand";

type Props = { brand: BrandItem };

export default function BrandCard({ brand }: Props) {
  return (
    <article className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl sm:p-6">
      <div className="relative aspect-square w-full max-w-32">
        <Image
          src={brand.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 128px, 30vw"
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h2 className="text-center text-sm font-semibold text-ink transition-colors group-hover:text-brand sm:text-base">
        {brand.name}
      </h2>
    </article>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";

type Props = { images: string[]; title: string };

export default function ProductGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-w-0 flex-col gap-3 lg:flex-row-reverse">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white lg:w-auto lg:min-w-0 lg:flex-1">
        <Image
          key={active}
          src={images[active]}
          alt={`${title}, image ${active + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 95vw"
          className="animate-in fade-in object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {images.length > 1 && (
        <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-20 lg:shrink-0 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-0">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all hover:-translate-y-0.5 sm:size-20 ${
                i === active
                  ? "border-brand"
                  : "border-line hover:border-brand/50"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
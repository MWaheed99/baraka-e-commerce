"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Category } from "@/interfaces/category";

import "swiper/css";

type Props = { categories: Category[] };

const navBtn =
  "absolute top-18 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-md transition-all hover:bg-brand hover:text-brand-foreground active:scale-95 sm:top-22 md:size-11 lg:top-26";

function NavButtons() {
  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        aria-label="Previous categories"
        onClick={() => swiper.slidePrev()}
        className={`${navBtn} left-2`}
      >
        <ChevronLeft className="size-5 md:size-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next categories"
        onClick={() => swiper.slideNext()}
        className={`${navBtn} right-2`}
      >
        <ChevronRight className="size-5 md:size-6" aria-hidden="true" />
      </button>
    </>
  );
}

export default function CategoriesSlider({ categories }: Props) {
  return (
    <Swiper
      modules={[Autoplay]}
      rewind
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      slidesPerView={2.2}
      spaceBetween={12}
      breakpoints={{
        480: { slidesPerView: 3.2, spaceBetween: 16 },
        768: { slidesPerView: 4.2, spaceBetween: 16 },
        1024: { slidesPerView: 5.2, spaceBetween: 20 },
        1280: { slidesPerView: 6, spaceBetween: 24 },
      }}
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <Link href={`/products?category=${category._id}`} className="group block">
            <div className="relative h-36 overflow-hidden rounded-xl bg-sand sm:h-44 lg:h-52">
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 180px, (min-width: 768px) 22vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
              />
            </div>
            <p className="mt-3 truncate font-semibold text-ink transition-colors group-hover:text-brand">
              {category.name}
            </p>
          </Link>
        </SwiperSlide>
      ))}

      <NavButtons />
    </Swiper>
  );
}
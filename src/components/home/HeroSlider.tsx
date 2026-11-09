"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { buttonVariants } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from "@/assets/images/images.jpeg";
import slide2 from "@/assets/images/images (1).jpeg";
import slide3 from "@/assets/images/images (2).jpeg";

const slides = [
	{
		image: slide1,
		title: "New season essentials",
		text: "[YOUR TAGLINE] Everyday pieces, delivered to your door.",
		cta: "Shop now",
	},
	{
		image: slide2,
		title: "Up to [X]% off",
		text: "[SALE TEXT] Limited time offers on selected items.",
		cta: "Shop the sale",
	},
	{
		image: slide3,
		title: "Free delivery",
		text: "[CONDITION] On orders over [AMOUNT].",
		cta: "Start shopping",
	},
];

export default function HeroSlider() {
	return (
		<section aria-label="Featured offers">
			<Swiper
				modules={[Autoplay, Pagination]}
				pagination={{ clickable: true }}
				loop
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				className="overflow-hidden rounded-2xl [--swiper-pagination-bullet-inactive-color:#fff] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:var(--brand)] [--swiper-pagination-bullet-size:12px]"
			>
				{slides.map((s, i) => (
					<SwiperSlide key={s.title}>
						<div className="group relative h-80 overflow-hidden sm:h-96 lg:h-115">
							<Image src={s.image} alt="" fill sizes="(min-width: 1280px) 1200px, 95vw" priority={i === 0} className="object-cover transition-transform duration-700 group-hover:scale-105" />
							<div aria-hidden="true" className="absolute inset-0 bg-black/40" />

						
							<div className="absolute inset-x-3 bottom-10 rounded-xl bg-white/95 p-4 md:inset-x-auto md:top-1/2 md:bottom-auto md:left-12 md:max-w-115 md:-translate-y-1/2 md:p-8">
								<h2 className="mb-2 text-2xl font-extrabold text-ink md:mb-3 md:text-5xl">{s.title}</h2>
								<p className="mb-4 text-sm text-subtle md:mb-6 md:text-lg">{s.text}</p>
								<div className="flex flex-wrap gap-2 md:gap-3">
									<Link
										href="/products"
										className={buttonVariants({
											className: "h-10 px-4 transition-transform hover:-translate-y-0.5 md:h-11 md:px-6",
										})}
									>
										{s.cta}
									</Link>
									<Link
										href="/products?sale=true"
										className={buttonVariants({
											variant: "outline",
											className: "h-10 px-4 transition-transform hover:-translate-y-0.5 md:h-11 md:px-6",
										})}
									>
										View deals
									</Link>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}

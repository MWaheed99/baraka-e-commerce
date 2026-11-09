import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/interfaces/cart";
import { formatPrice } from "@/lib/format";
import { Button } from "@base-ui/react";
import { Trash } from "lucide-react";
import ChangeQuantity from "../shared/ChangeQuantity";
import TrashIcon from "../shared/TrashIcon";

type Props = { item: CartItem };

export default function CartItemRow({ item }: Props) {
	const { product } = item;
	const href = `/products/${product._id}`;

	return (
		<li className="flex gap-3 rounded-2xl border border-line bg-white p-3 transition-shadow duration-300 hover:shadow-md sm:gap-5 sm:p-4">
			<Link href={href} aria-label={product.title} className="group relative size-24 shrink-0 overflow-hidden rounded-xl bg-white sm:size-32">
				<Image src={product.imageCover} alt="" fill sizes="(min-width: 640px) 128px, 96px" className="object-contain transition-transform duration-500 group-hover:scale-105" />
			</Link>

			<div className="relative flex min-w-0 flex-1 flex-col gap-1">
				<div className="absolute right-0 top-0">
          <TrashIcon id={item.product._id}/>
				</div>
				<p className="truncate text-xs text-subtle sm:text-sm">
					{product.category.name} · {product.brand.name}
				</p>

				<h2 className="line-clamp-2 text-sm font-semibold text-ink sm:text-base">
					<Link href={href} className="transition-colors hover:text-brand">
						{product.title}
					</Link>
				</h2>

				<p className="text-sm text-subtle">{formatPrice(item.price)} each</p>

				<div className="mt-auto flex items-end justify-between gap-2 pt-2">
					<ChangeQuantity count={item.count} id={item.product._id}/>
					<span className="text-base font-bold text-brand sm:text-lg">{formatPrice(item.price * item.count)}</span>
				</div>
			</div>
		</li>
	);
}

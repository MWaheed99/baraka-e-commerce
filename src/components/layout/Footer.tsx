import Link from "next/link";
import Logo from "@/components/shared/Logo";
import LinkColumn, { type NavLink } from "@/components/shared/LinkColumn";
import Tag from "@/components/shared/Tag";
import NewsletterForm from "@/components/shared/NewsletterForm";

const columns: { title: string; links: NavLink[] }[] = [
	{
		title: "Shop",
		links: [
			{ href: "/products", label: "All products" },
			{ href: "/products?sort=new", label: "New arrivals" },
			{ href: "/products?sort=best", label: "Best sellers" },
			{ href: "/products?sale=true", label: "Sale" },
			{ href: "/search", label: "Search" },
		],
	},
	{
		title: "My account",
		links: [
			{ href: "/login", label: "Login" },
			{ href: "/register", label: "Register" },
			{ href: "/account", label: "My account" },
			{ href: "/orders", label: "My orders" },
			{ href: "/wishlist", label: "Wishlist" },
			{ href: "/cart", label: "Cart" },
		],
	},
	{
		title: "Help",
		links: [
			{ href: "/contact", label: "Contact us" },
			{ href: "/faq", label: "FAQ" },
			{ href: "/returns", label: "Shipping & returns" },
			{ href: "/orders", label: "Track my order" },
			{ href: "/checkout", label: "Checkout" },
		],
	},
];

const social = ["Facebook", "Instagram", "TikTok"];
const payments = ["Visa", "Mastercard", "Cash on delivery"];

export default function Footer() {
	return (
		<footer className="mt-12 bg-ink pt-10 pb-6 text-sm text-sand md:mt-20 md:pt-14">
			<div className="container">
				<div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] lg:gap-10">
					<div className="col-span-2 lg:col-span-1">
						<Logo variant="light" />
						<p className="mt-4 leading-relaxed text-footer-muted">[STORE DESCRIPTION] Quality everyday products, delivered to your door.</p>
						<p className="mt-4 leading-relaxed text-footer-muted">
							[ADDRESS]
							<br />
							[PHONE]
							<br />
							[EMAIL]
						</p>
						<div className="mt-4 flex flex-wrap gap-x-4">
							{social.map((s) => (
								<Link key={s} href="#" className="py-1 transition-colors hover:text-white hover:underline">
									{s}
								</Link>
							))}
						</div>
					</div>

					{columns.map((col) => (
						<LinkColumn key={col.title} title={col.title} links={col.links} />
					))}

					<div className="col-span-2 lg:col-span-1">
						<h4 className="mb-4 text-base font-semibold text-white">Newsletter</h4>
						<p className="mb-3 text-footer-muted">Get offers and new arrivals.</p>
						<NewsletterForm />
					</div>
				</div>

				<div className="mt-10 flex flex-col items-start gap-4 border-t border-white/10 pt-6 text-footer-muted md:flex-row md:flex-wrap md:items-center md:justify-between">
					<span>© [YEAR] Baraka. All rights reserved.</span>
					<span className="flex gap-4">
						<Link href="/privacy" className="transition-colors hover:text-white hover:underline">
							Privacy policy
						</Link>
						<Link href="/terms" className="transition-colors hover:text-white hover:underline">
							Terms of service
						</Link>
					</span>
					<span className="flex flex-wrap gap-2">
						{payments.map((p) => (
							<Tag key={p}>{p}</Tag>
						))}
					</span>
				</div>
			</div>
		</footer>
	);
}

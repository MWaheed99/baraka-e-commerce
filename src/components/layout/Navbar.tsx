import Link from "next/link";
import { Heart, Search, Settings, ShoppingBag } from "lucide-react";
import Logo from "@/components/shared/Logo";
import IconLink from "@/components/shared/IconLink";
import LogoutButton from "@/components/layout/LogoutButton";
import MobileMenu from "@/components/layout/MobileMenu";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/orders", label: "Orders" },
  { href: "/brands", label: "Brands" },
];

export default function Navbar() {
  const cartCount = 2;

  return (
    <header className="relative border-b border-line bg-white">
      <div className="container flex min-h-18 items-center gap-2 lg:gap-8">
        <MobileMenu links={links} />
        <Logo />

        <nav aria-label="Main" className="hidden flex-1 gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink transition-colors hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="relative hidden w-full max-w-65 lg:block">
          <Search
            aria-hidden="true"
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
          />
          <Input
            type="search"
            placeholder="Search products"
            aria-label="Search"
            className="h-11 bg-white pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
          <IconLink href="/wishlist" label="Wishlist" icon={Heart} />
          <IconLink
            href="/cart"
            label={`Cart, ${cartCount} items`}
            icon={ShoppingBag}
            badge={cartCount}
          />

          <div className="hidden items-center gap-2 lg:flex">
            <IconLink href="/settings" label="Settings" icon={Settings} />
            <Link
              href="/login"
              className={buttonVariants({ variant: "ghost", className: "h-11 hover:text-brand" })}
            >
              Login
            </Link>
            <Link href="/register" className={buttonVariants({ className: "h-11 px-5" })}>
              Register
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
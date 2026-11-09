"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, Settings, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoutButton from "@/components/layout/LogoutButton";
import type { NavLink } from "@/components/shared/LinkColumn";

const itemClass =
  "flex items-center gap-3 rounded-lg px-3 py-3 text-ink transition-colors hover:bg-hover hover:text-brand";

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="ghost"
        className="size-11 p-0 hover:bg-hover hover:text-brand"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </Button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-50 border-b border-line bg-white shadow-lg"
        >
          <div className="container flex flex-col gap-3">
            <div className="relative">
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

            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className={itemClass} onClick={close}>
                  {l.label}
                </Link>
              ))}
              <Link href="/settings" className={itemClass} onClick={close}>
                <Settings className="size-5" aria-hidden="true" />
                Settings
              </Link>
            </nav>

            <div className="grid grid-cols-2 gap-2 border-t border-line pt-4">
              <Link
                href="/login"
                onClick={close}
                className={buttonVariants({ variant: "outline", className: "h-11" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={close}
                className={buttonVariants({ className: "h-11" })}
              >
                Register
              </Link>
              <div className="col-span-2 [&>button]:w-full">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
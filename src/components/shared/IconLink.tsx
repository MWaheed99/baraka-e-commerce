import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export default function IconLink({ href, label, icon: Icon, badge }: Props) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex size-11 items-center justify-center rounded-full text-ink transition-all hover:bg-hover hover:text-brand active:scale-95"
    >
      <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
      {badge !== undefined && (
        <span className="absolute top-0.5 right-0 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-brand-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}
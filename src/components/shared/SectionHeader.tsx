import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  linkLabel?: string;
};

export default function SectionHeader({ title, href, linkLabel = "View all" }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
      <h2 className="text-xl font-bold text-ink md:text-2xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="group flex min-h-11 items-center gap-1 font-medium text-brand transition-colors hover:text-ink"
        >
          {linkLabel}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
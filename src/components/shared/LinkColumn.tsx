import Link from "next/link";

export type NavLink = { href: string; label: string };

type Props = { title: string; links: NavLink[] };

export default function LinkColumn({ title, links }: Props) {
  return (
    <nav aria-label={title}>
      <h4 className="mb-4 text-base font-semibold text-white">{title}</h4>
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          className="block py-1.5 text-sand transition-all hover:translate-x-1 hover:text-white hover:underline"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
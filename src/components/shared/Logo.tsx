import Link from "next/link";

const variants = {
  brand: "text-brand",
  light: "text-white",
};

type Props = { variant?: keyof typeof variants };

export default function Logo({ variant = "brand" }: Props) {
  return (
    <Link href="/" className={`text-2xl font-extrabold transition-opacity hover:opacity-80 ${variants[variant]}`}>
      Baraka
    </Link>
  );
}
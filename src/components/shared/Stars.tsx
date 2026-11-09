import { Star } from "lucide-react";

type Props = { value: number; className?: string };

export default function Stars({ value, className = "size-4" }: Props) {
  const percent = Math.min(100, Math.max(0, (value / 5) * 100));

  return (
    <div
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className="relative flex text-amber-400"
    >
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`${className} shrink-0`} />
        ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 flex overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`${className} shrink-0 fill-current`} />
        ))}
      </div>
    </div>
  );
}
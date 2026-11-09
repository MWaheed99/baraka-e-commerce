import Stars from "@/components/shared/Stars";

type Props = { average: number; count: number };

export default function Rating({ average, count }: Props) {
  if (count === 0) {
    return <p className="text-sm text-subtle">No reviews yet</p>;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Stars value={average} />
      <span className="text-subtle">
        {average.toFixed(1)} ({count})
      </span>
    </div>
  );
}
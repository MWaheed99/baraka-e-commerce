"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const btn =
  "flex size-11 items-center justify-center text-ink transition-colors hover:bg-hover hover:text-brand active:scale-90 disabled:pointer-events-none disabled:opacity-40";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: Props) {
  return (
    <div
      role="group"
      aria-label="Quantity"
      className="inline-flex items-center overflow-hidden rounded-lg border border-field bg-white"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={btn}
      >
        <Minus className="size-4" />
      </button>
      <span
        aria-live="polite"
        className="min-w-10 text-center font-semibold tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={btn}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Eye, Heart, RefreshCw } from "lucide-react";

const base =
  "flex size-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-all duration-200 hover:scale-110 active:scale-95 sm:size-10";
const idle = "text-ink hover:bg-brand hover:text-brand-foreground";
const wishedStyle = "text-destructive hover:bg-hover";

type Props = { title: string };

export default function ProductActions({ title }: Props) {
  const [wished, setWished] = useState(false);

  return (
    <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
      <button
        type="button"
        aria-pressed={wished}
        aria-label={
          wished ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`
        }
        onClick={() => setWished((v) => !v)}
        className={`${base} ${wished ? wishedStyle : idle}`}
      >
        <Heart
          className={`size-4 transition-transform sm:size-5 ${
            wished ? "scale-110 fill-current" : ""
          }`}
        />
      </button>

      <button
        type="button"
        aria-label={`Compare ${title}`}
        className={`${base} ${idle}`}
      >
        <RefreshCw className="size-4 sm:size-5" />
      </button>

      <button
        type="button"
        aria-label={`Quick view ${title}`}
        className={`${base} ${idle}`}
      >
        <Eye className="size-4 sm:size-5" />
      </button>
    </div>
  );
}
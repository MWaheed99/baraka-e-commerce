import { Eye, RefreshCw } from "lucide-react";
import WishlistButton from "@/components/shared/WishlistButton";

const base =
  "flex size-9 items-center justify-center rounded-full bg-white text-ink shadow-md ring-1 ring-black/5 transition-all duration-200 hover:scale-110 hover:bg-brand hover:text-brand-foreground active:scale-95 sm:size-10";

type Props = { productId: string; title: string };

export default function ProductActions({ productId, title }: Props) {
  return (
    <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
      <WishlistButton productId={productId} title={title} />

      <button type="button" aria-label={`Compare ${title}`} className={base}>
        <RefreshCw className="size-4 sm:size-5" />
      </button>

      <button type="button" aria-label={`Quick view ${title}`} className={base}>
        <Eye className="size-4 sm:size-5" />
      </button>
    </div>
  );
}
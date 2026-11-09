import type { Product } from "@/interfaces/product";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishlistActionResponse {
  status: string;
  message: string;
  data: string[];
}
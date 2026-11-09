import type { Brand } from "@/interfaces/product";
import type { Metadata } from "@/interfaces/category";

export interface BrandItem extends Brand {
  createdAt: string;
  updatedAt: string;
}

export interface BrandsResponse {
  results: number;
  metadata: Metadata;
  data: BrandItem[];
}
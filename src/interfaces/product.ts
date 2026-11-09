import type { Category, Metadata } from "@/interfaces/category";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  availableColors?: string[];
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Pick<Category, "_id" | "name" | "slug" | "image">;
  subcategory: Subcategory[];
  brand: Brand;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetails extends Product {
  reviews?: Review[];
}

export interface ProductResponse {
  data: ProductDetails;
}
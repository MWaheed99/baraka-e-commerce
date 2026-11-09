import type { Category } from "@/interfaces/category";
import type { Brand, Subcategory } from "@/interfaces/product";

export interface CartProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  category: Pick<Category, "_id" | "name" | "slug" | "image">;
  subcategory: Subcategory[];
  brand: Brand;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
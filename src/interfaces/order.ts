import type { Category } from "@/interfaces/category";
import type { Brand, Subcategory } from "@/interfaces/product";

export interface OrderProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Pick<Category, "_id" | "name" | "slug" | "image">;
  subcategory: Subcategory[];
  brand: Brand;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  id: number;
  user: OrderUser;
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}
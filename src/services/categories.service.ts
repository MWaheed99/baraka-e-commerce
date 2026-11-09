import type { CategoriesResponse, Category } from "@/interfaces/category";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`);
  }

  const json: CategoriesResponse = await res.json();
  return json.data;
}
import type { BrandItem, BrandsResponse } from "@/interfaces/brand";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getBrands(): Promise<BrandItem[]> {
  const res = await fetch(`${BASE_URL}/brands`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch brands (${res.status})`);
  }

  const json: BrandsResponse = await res.json();
  return json.data;
}
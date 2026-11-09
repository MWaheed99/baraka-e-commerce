import type {
  Product,
  ProductDetails,
  ProductResponse,
  ProductsResponse,
} from "@/interfaces/product";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

export async function getProduct(id: string): Promise<ProductDetails> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 600 },
  });


  if (!res.ok) {
    throw new Error(`Failed to fetch product (${res.status})`);
  }

  const json: ProductResponse = await res.json();
  return json.data;
}

export async function getProductsByCategory(
  categoryId: string,
): Promise<Product[]> {
  const params = new URLSearchParams({ "category[in]": categoryId });

  const res = await fetch(`${BASE_URL}/products?${params}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch similar products (${res.status})`);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}
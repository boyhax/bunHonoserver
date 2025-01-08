import { client } from "@/App";
import getPromise from "@/lib/getpromise";
import { Product, ProductsFilter, UserProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function fetchProducts(
  filter: ProductsFilter
): Promise<Product[]> {
  const response = await client.get("/products", { query: filter });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

async function getUserProducts() {
  const { data, error } = await getPromise(client.get("/account/products"));
  if (error || !data.success) {
    throw Error("cant fetch user products", error);
  }
  return data.data as UserProduct[];
}
export function useUserProducts() {
  return useQuery({
    queryKey: ["myproducts"],
    queryFn: getUserProducts,
  });
}
export function uesSearchProducts(filter: ProductsFilter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => fetchProducts(filter),
  });
}
export function useAddProduct(filter: ProductsFilter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => client.get("/products"),
  });
}

export async function addProduct(product: FormData): Promise<Product> {
  const response = await client.post("/account/products", { form: product });
  let body = await response.json();
  if (!response.ok || !body.success) {
    throw new Error("Failed to add product");
  }

  return body.data;
}

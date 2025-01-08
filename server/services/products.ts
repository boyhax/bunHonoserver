/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/models/product";

export async function listProducts(find: any) {
  return Product.find(find).limit(20).populate("user").exec();
}
export async function updateProduct(id: string, data: any) {
  return Product.findOneAndUpdate({ _id: id }, data).exec();
}
export async function findProduct(id: string) {
  return Product.findOne({ _id: id }).populate("user").exec();
}
export async function deleteProduct(id: string) {
  return Product.findOneAndDelete({ _id: id }).exec();
}
export const createProduct = Product.create;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@server/models/product";
import getPromise from "@server/utils/getpromise";

export async function listProducts(find: any) {
  return getPromise(Product.find(find).limit(20).populate("user").exec());
}
export async function updateProduct(id: string, data: any) {
  return getPromise(Product.findOneAndUpdate({ _id: id }, data).exec());
}
export async function findProduct(id: string) {
  return getPromise(Product.findOne({ _id: id }).populate("user").exec());
}
export async function deleteProduct(id: string) {
  return getPromise(Product.findOneAndDelete({ _id: id }).exec());
}
export async function createProduct(data: any) {
  return getPromise(Product.create(data));
}

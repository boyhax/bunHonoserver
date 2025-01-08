export interface Product {
  _id: string;
  name: string;
  description: string;
  discount?: number;
  image: string;
  images: string[];
  price: number;
}
export type UserProduct = Product & {
  files: File[];
  status: string;
};
export type Responce<T = null> = {
  success: boolean;
  message: string;
  data: T;
};
interface File {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}
export type Session = {
  token: string;
  user: User;
};
export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ProductsFilter {
  id?: string;
  user?: string;
  text?: string;
  categories?: string[];
  tags?: string[];
  cost?: [number, number];
  order?: FilterOrder;
}

export interface FilterOrder {
  name: FilterOrderField;
  asc: boolean;
}
export type FilterOrderField = "cost" | "created" | "text";

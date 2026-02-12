// src/types/api.ts

export interface ProductApiResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

export interface ProductsListApiResponse {
  products: ProductApiResponse[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductCategoriesApiResponse = string[];

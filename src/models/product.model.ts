// src/models/product.model.ts

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

export interface ProductsResult {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
}

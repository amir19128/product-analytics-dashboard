import { fetcher } from '@/lib/api/httpClient';
import {
  ProductApiResponse, 
  ProductsListApiResponse,
  ProductCategoriesApiResponse,
} from '@/types/api';
import { ProductQueryParams } from '../types/product-query.types';

export interface ProductRepository {
  getProducts(params: ProductQueryParams): Promise<ProductsListApiResponse>;
  getProductById(id: number): Promise<ProductApiResponse>;
  getCategories(): Promise<ProductCategoriesApiResponse>;
}

export class HttpProductRepository implements ProductRepository {
  async getProducts(params: ProductQueryParams): Promise<ProductsListApiResponse> {
    const { limit, skip, search, category } = params;

    let url = `/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    if (category) {
      url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    return fetcher<ProductsListApiResponse>(url);
  }

  async getProductById(id: number): Promise<ProductApiResponse> {
    return fetcher<ProductApiResponse>(`/products/${id}`);
  }

  async getCategories(): Promise<ProductCategoriesApiResponse> {
    return fetcher<ProductCategoriesApiResponse>('/products/category-list');
  }
}

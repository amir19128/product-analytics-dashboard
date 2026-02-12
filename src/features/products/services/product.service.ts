// src/features/products/services/product.service.ts

import { Product, ProductsResult } from '@/models/product.model';
import { ProductApiResponse, ProductsListApiResponse } from '@/types/api';
import {
  HttpProductRepository,
  ProductRepository,
} from '../repositories/product.repository';
import { ProductQueryParams } from '../types/product-query.types';
export class ProductService {
  constructor(
    private readonly repository: ProductRepository = new HttpProductRepository()
  ) {}

  async getCategories(): Promise<string[]> {
    return this.repository.getCategories();
  }

  async getProducts(params: ProductQueryParams): Promise<ProductsResult> {
    const data: ProductsListApiResponse =
      await this.repository.getProducts(params);

    return {
      products: data.products.map(this.mapApiToDomain),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  }

  async getProductById(id: number): Promise<Product> {
    const data: ProductApiResponse = await this.repository.getProductById(id);
    return this.mapApiToDomain(data);
  }

  private mapApiToDomain(apiData: ProductApiResponse): Product {
    return {
      id: apiData.id,
      title: apiData.title,
      description: apiData.description,
      price: apiData.price,
      category: apiData.category,
      thumbnail: apiData.thumbnail,
    };
  }
}

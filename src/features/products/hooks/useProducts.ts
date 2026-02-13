// src/features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../services/product.service';
import { ProductsResult } from '@/models/product.model';
import {
  ProductQueryParams,
  ProductSortOption,
} from '../types/product-query.types';
import {
  applyProductsQuery,
  buildProductsFetchParams,
} from '../utils/products-query';

const productService = new ProductService();

interface UseProductsOptions extends Partial<ProductQueryParams> {
  sortBy?: ProductSortOption;
  initialData?: ProductsResult;
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    limit = 20,
    skip = 0,
    search,
    category,
    sortBy,
    initialData,
  } = options;

  return useQuery<ProductsResult, Error>({
    queryKey: ['products', { limit, skip, search, category, sortBy }],
    queryFn: async () => {
      const { fetchParams } = buildProductsFetchParams({
        limit,
        skip,
        search,
        category,
        sortBy,
      });
      const result = await productService.getProducts(fetchParams);
      return applyProductsQuery(result, {
        limit,
        skip,
        search,
        category,
        sortBy,
      });
    },
    initialData,
    placeholderData: previous => previous,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
}

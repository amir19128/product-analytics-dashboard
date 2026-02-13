import { Product, ProductsResult } from '@/models/product.model';
import {
  ProductQueryParams,
  ProductSortOption,
} from '../types/product-query.types';

const SEARCH_FETCH_LIMIT = 100;

export interface ProductQueryInput extends Partial<ProductQueryParams> {
  sortBy?: ProductSortOption;
}

export function buildProductsFetchParams(input: ProductQueryInput): {
  isSearching: boolean;
  fetchParams: ProductQueryParams;
} {
  const limit = input.limit ?? 20;
  const skip = input.skip ?? 0;
  const search = input.search;
  const category = input.category;
  const isSearching = !!search?.trim();

  if (isSearching) {
    return {
      isSearching: true,
      fetchParams: { limit: SEARCH_FETCH_LIMIT, skip: 0, search },
    };
  }

  return {
    isSearching: false,
    fetchParams: { limit, skip, search, category },
  };
}

export function applyProductsQuery(result: ProductsResult, input: ProductQueryInput): ProductsResult {
  const limit = input.limit ?? 20;
  const skip = input.skip ?? 0;
  const search = input.search;
  const category = input.category;
  const sortBy = input.sortBy;
  const isSearching = !!search?.trim();
  let products = result.products;

  if (isSearching) {
    const term = search!.trim().toLowerCase();
    products = products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
    if (category) {
      products = products.filter((product) => product.category === category);
    }
  }

  products = sortProducts(products, sortBy);

  if (isSearching) {
    return {
      products: products.slice(skip, skip + limit),
      total: products.length,
      skip,
      limit,
    };
  }

  return {
    products,
    total: result.total,
    skip: result.skip,
    limit: result.limit,
  };
}

function sortProducts(products: Product[], sortBy?: ProductSortOption): Product[] {
  if (!sortBy) return products;

  if (sortBy === 'title') {
    return [...products].sort((a, b) => a.title.localeCompare(b.title));
  }

  return [...products].sort((a, b) => a.price - b.price);
}
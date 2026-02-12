export interface ProductQueryParams {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
}

export type ProductSortBy = 'title' | 'price';
export type ProductSortOption = '' | ProductSortBy;

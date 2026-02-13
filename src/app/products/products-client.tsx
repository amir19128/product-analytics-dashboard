'use client';

import { useState, useMemo, useCallback } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductList } from '@/features/products/components/ProductList';
import { ProductListSkeleton } from '@/features/products/components/ProductListSkeleton';
import { ProductFilter } from '@/features/products/components/ProductFilter';
import { Pagination } from '@/features/products/components/Pagination';
import { ProductsResult } from '@/models/product.model';
import { ProductSortOption } from '@/features/products/types/product-query.types';

interface Props {
  initialProducts: ProductsResult;
  categories: string[];
}

export default function ProductsClient({ initialProducts, categories }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<ProductSortOption>('');
  const [page, setPage] = useState(1);
  const limit = 9;

  const queryOptions = useMemo(
    () => ({
      limit,
      skip: (page - 1) * limit,
      search,
      category,
      sortBy: sortBy || undefined,
      initialData:
        page === 1 && !search && !category && !sortBy
          ? initialProducts
          : undefined,
    }),
    [limit, page, search, category, sortBy, initialProducts]
  );

  const { data, isLoading, isFetching, isError, error } = useProducts(queryOptions);

  const products = data?.products ?? [];
  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const isInitialLoading = isLoading && !data;
  const isFilterLoading = isFetching && !isInitialLoading;

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: ProductSortOption) => {
    setSortBy(value);
    setPage(1);
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Products</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Browse, filter, and analyze product trends.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <ProductFilter
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          isLoading={isFetching}
        />

        {isInitialLoading && <ProductListSkeleton count={limit} />}

        {isError && (
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm font-semibold text-red-700">
            {error?.message || 'Error loading products.'}
          </div>
        )}

        {isFilterLoading && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
              <span>Updating products...</span>
            </div>
            <ProductListSkeleton count={limit} />
          </div>
        )}

        {!isInitialLoading && !isFilterLoading && products.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted-foreground)]">
            No products found.
          </div>
        )}

        {!isInitialLoading && !isFilterLoading && products.length > 0 && (
          <>
            <ProductList products={products} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </main>
  );
}

'use client';

import { useState, useMemo, useCallback } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductList } from '@/features/products/components/ProductList';
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

  const { data, isLoading, isError, error } = useProducts(queryOptions);

  const products = data?.products ?? [];
  const totalPages = data ? Math.ceil(data.total / limit) : 1;

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
        />

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {Array.from({ length: limit }).map((_, idx) => (
              <div
                key={idx}
                className="h-64 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm font-semibold text-red-700">
            {error?.message || 'Error loading products.'}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted-foreground)]">
            No products found.
          </div>
        )}

        {!isLoading && products.length > 0 && (
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

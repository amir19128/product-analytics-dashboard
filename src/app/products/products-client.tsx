'use client';

import { useState } from 'react';
import { ProductList } from '@/features/products/components/ProductList';
import { ProductFilter } from '@/features/products/components/ProductFilter';
import { Pagination } from '@/features/products/components/Pagination';
import { ProductsResult } from '@/models/product.model';
import { ProductSortOption } from '@/features/products/types/product-query.types';

interface Props {
  initialProducts: ProductsResult;
  categories: string[];
}

const PAGE_SIZE = 9;

export default function ProductsClient({ initialProducts, categories }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<ProductSortOption>('');
  const [page, setPage] = useState(1);

  const normalizedSearch = search.trim().toLowerCase();
  let processedProducts = initialProducts.products.filter((product) => {
    const matchSearch =
      normalizedSearch.length === 0 ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch);
    const matchCategory = category.length === 0 || product.category === category;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'title') {
    processedProducts = [...processedProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortBy === 'price') {
    processedProducts = [...processedProducts].sort((a, b) => a.price - b.price);
  }

  const totalPages = Math.max(1, Math.ceil(processedProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const products = processedProducts.slice(start, start + PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSortChange = (value: ProductSortOption) => {
    setSortBy(value);
    setPage(1);
  };

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
          search={search}
          category={category}
          sortBy={sortBy}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />

        {products.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted-foreground)]">
            No products found.
          </div>
        )}

        {products.length > 0 && (
          <>
            <ProductList products={products} />
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </main>
  );
}

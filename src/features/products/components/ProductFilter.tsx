'use client';

import { ChangeEvent, memo, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { ProductSortOption } from '../types/product-query.types';

interface ProductFilterProps {
  onSearchChange?: (search: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sortBy: ProductSortOption) => void;
  categories?: string[];
  isLoading?: boolean;
}

interface FilterFormValues {
  search: string;
  category: string;
  sortBy: ProductSortOption;
}

export const ProductFilter = memo(function ProductFilter({
  onSearchChange,
  onCategoryChange,
  categories = [],
  onSortChange,
  isLoading = false,
}: ProductFilterProps) {
  const { register, watch } = useForm<FilterFormValues>({
    defaultValues: {
      search: '',
      category: '',
      sortBy: '',
    },
  });

  const search = watch('search');

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearchChange?.(value);
      }, 500),
    [onSearchChange]
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  return (
    <form className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm md:grid-cols-3">
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        disabled={isLoading}
        {...register('search')}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
      />

      <select
        aria-label="Category"
        disabled={isLoading}
        {...register('category', {
          onChange: (event: ChangeEvent<HTMLSelectElement>) =>
            onCategoryChange?.(event.target.value),
        })}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort"
        disabled={isLoading}
        {...register('sortBy', {
          onChange: (event: ChangeEvent<HTMLSelectElement>) =>
            onSortChange?.(event.target.value as ProductSortOption),
        })}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
      >
        <option value="">Sort: Default</option>
        <option value="title">Sort: Name (A-Z)</option>
        <option value="price">Sort: Price (Low-High)</option>
      </select>
    </form>
  );
});

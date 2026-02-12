'use client';

import { ProductSortOption } from '../types/product-query.types';

interface ProductFilterProps {
  search: string;
  category: string;
  sortBy: ProductSortOption;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: ProductSortOption) => void;
  categories: string[];
}

export function ProductFilter({
  search,
  category,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  categories,
}: ProductFilterProps) {
  return (
    <form className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm md:grid-cols-3">
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
      />

      <select
        aria-label="Category"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
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
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as ProductSortOption)}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
      >
        <option value="">Sort: Default</option>
        <option value="title">Sort: Name (A-Z)</option>
        <option value="price">Sort: Price (Low-High)</option>
      </select>
    </form>
  );
}

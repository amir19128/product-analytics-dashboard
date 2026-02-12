// src/features/products/components/ProductList.tsx
'use client';

import { memo } from 'react';
import { Product } from '@/models/product.model';
import Link from 'next/link';
import Image from 'next/image';

export interface ProductListProps {
  products: Product[];
}

export const ProductList = memo(function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="relative h-48 w-full bg-[var(--surface-soft)]">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={false}
            />
          </div>

          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold line-clamp-1">
              {product.title}
            </h2>

            <p className="text-sm capitalize text-[var(--muted-foreground)]">
              {product.category}
            </p>

            <p className="text-lg font-bold text-[var(--accent)]">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
});

'use client';

import { memo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | 'ellipsis';

function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    items.push('ellipsis');
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < totalPages - 1) {
    items.push('ellipsis');
  }

  items.push(totalPages);
  return items;
}

export const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageItems = buildPageItems(currentPage, totalPages);

  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      {pageItems.map((item, idx) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-sm text-[var(--muted-foreground)]"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`rounded-lg border px-3 py-1 text-sm ${
              item === currentPage
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)]'
            }`}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
});

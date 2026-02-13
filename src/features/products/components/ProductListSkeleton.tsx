interface ProductListSkeletonProps {
  count?: number;
}

export function ProductListSkeleton({ count = 9 }: ProductListSkeletonProps) {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
        >
          <div className="h-48 w-full bg-[var(--surface-soft)]" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 rounded bg-[var(--surface-soft)]" />
            <div className="h-4 w-1/2 rounded bg-[var(--surface-soft)]" />
            <div className="h-5 w-1/3 rounded bg-[var(--surface-soft)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

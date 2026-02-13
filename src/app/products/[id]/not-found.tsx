import Link from 'next/link';

export default function ProductDetailNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center shadow-sm">
        <h2 className="text-xl font-semibold">Product not found</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          The product you are looking for does not exist.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}

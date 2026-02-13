export default function ProductDetailLoading() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center p-6">
      <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-sm">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <span className="text-sm text-[var(--muted-foreground)]">Loading product details...</span>
      </div>
    </main>
  );
}

'use client';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-xl border border-red-400/40 bg-red-500/10 p-5">
        <h2 className="text-lg font-semibold text-red-700">Failed to load products</h2>
        <p className="mt-2 text-sm text-red-700/90">{error.message || 'Unexpected error occurred.'}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-md border border-red-700/40 px-3 py-2 text-sm font-medium text-red-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

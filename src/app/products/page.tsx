// src/app/products/page.tsx
import { ProductService } from '@/features/products/services/product.service';
import Link from 'next/link';

export const revalidate = 60;

const productService = new ProductService();

export default async function ProductsPage() {
    const productsData = await productService.getProducts({
        limit: 9,
        skip: 0,
    });

    return (
        <main className="mx-auto max-w-5xl p-4 md:p-6">
            <h1 className="mb-6 text-2xl font-bold">Products</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {productsData.products.map((product) => (
                    <article
                        key={product.id}
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
                    >
                        <h2 className="line-clamp-1 text-lg font-semibold">{product.title}</h2>
                        <p className="mt-2 line-clamp-2 text-sm text-[var(--muted-foreground)]">
                            {product.description}
                        </p>
                        <p className="mt-3 text-base font-semibold">${product.price}</p>
                        <Link
                            href={`/products/${product.id}`}
                            className="mt-3 inline-block text-sm font-medium text-[var(--accent)]"
                        >
                            View details
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
}

// src/app/products/[id]/page.tsx
import { ProductService } from '@/features/products/services/product.service';
import { HttpError } from '@/lib/api/httpError';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { MonthlySalesChart } from '@/features/products/components/MonthlySalesChart';

interface PageProps {
    params: Promise<{ id: string }>;
}
const productService = new ProductService();

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
        return { title: 'Product Not Found' };
    }

    try {
        const product = await productService.getProductById(productId);
        return {
            title: `${product.title} | Product Details`,
            description: product.description,
        };
    } catch (error) {
        if (error instanceof HttpError && error.status === 404) {
            return { title: 'Product Not Found' };
        }

        return { title: 'Product Not Found' };
    }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
        notFound();
    }
    let product;

    try {
        product = await productService.getProductById(productId);
    } catch (error) {
        if (error instanceof HttpError && error.status === 404) {
            notFound();
        }

        throw error;
    }

    if (!product) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-4xl p-4 md:p-6">
            <section className="space-y-6">
                <div className="flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm md:flex-row">
                    <div className="relative h-64 w-full md:w-1/2">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded object-cover shadow"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <h1 className="text-2xl font-bold">{product.title}</h1>
                        <p className="text-[var(--muted-foreground)]">{product.description}</p>
                        <p className="text-lg font-semibold text-[var(--accent)]">${product.price}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">Category: {product.category}</p>
                    </div>
                </div>

                <MonthlySalesChart />
            </section>
        </main>
    );
}

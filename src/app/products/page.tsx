// src/app/products/page.tsx
import { ProductService } from '@/features/products/services/product.service';
import ProductsClient from './products-client';

export const revalidate = 60;

const productService = new ProductService();

export default async function ProductsPage() {
  const initialData = await productService.getProducts({
    limit: 9,
    skip: 0,
  });
  const categories = await productService.getCategories();

  return (
    <ProductsClient initialProducts={initialData} categories={categories} />
  );
}

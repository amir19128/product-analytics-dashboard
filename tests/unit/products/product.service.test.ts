import { ProductService } from '@/features/products/services/product.service';
import { ProductRepository } from '@/features/products/repositories/product.repository';
import { ProductsListApiResponse, ProductApiResponse } from '@/types/api';

describe('ProductService (Jest)', () => {
  it('maps API product list to domain model', async () => {
    const apiResponse: ProductsListApiResponse = {
      products: [
        {
          id: 1,
          title: 'Phone',
          description: 'A phone',
          price: 999,
          category: 'smartphones',
          thumbnail: 'https://example.com/img.jpg',
        },
      ],
      total: 1,
      skip: 0,
      limit: 9,
    };

    const repo: ProductRepository = {
      getProducts: jest.fn().mockResolvedValue(apiResponse),
      getProductById: jest.fn(),
      getCategories: jest.fn(),
    };

    const service = new ProductService(repo);
    const result = await service.getProducts({ limit: 9, skip: 0 });

    expect(result.total).toBe(1);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toEqual({
      id: 1,
      title: 'Phone',
      description: 'A phone',
      price: 999,
      category: 'smartphones',
      thumbnail: 'https://example.com/img.jpg',
    });
  });

  it('maps API product detail to domain model', async () => {
    const apiProduct: ProductApiResponse = {
      id: 2,
      title: 'Laptop',
      description: 'A laptop',
      price: 1499,
      category: 'laptops',
      thumbnail: 'https://example.com/laptop.jpg',
    };

    const repo: ProductRepository = {
      getProducts: jest.fn(),
      getProductById: jest.fn().mockResolvedValue(apiProduct),
      getCategories: jest.fn(),
    };

    const service = new ProductService(repo);
    const product = await service.getProductById(2);

    expect(product).toEqual({
      id: 2,
      title: 'Laptop',
      description: 'A laptop',
      price: 1499,
      category: 'laptops',
      thumbnail: 'https://example.com/laptop.jpg',
    });
  });
});

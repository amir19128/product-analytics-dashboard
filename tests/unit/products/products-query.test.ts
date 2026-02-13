import {
  applyProductsQuery,
  buildProductsFetchParams,
} from '@/features/products/utils/products-query';
import { ProductsResult } from '@/models/product.model';

function createProductsResult(): ProductsResult {
  return {
    products: [
      {
        id: 1,
        title: 'Phone Ultra',
        description: 'A phone',
        price: 900,
        category: 'smartphones',
        thumbnail: 'thumb-1',
      },
      {
        id: 2,
        title: 'Budget Phone',
        description: 'A cheap phone',
        price: 300,
        category: 'smartphones',
        thumbnail: 'thumb-2',
      },
      {
        id: 3,
        title: 'Gaming Laptop',
        description: 'A laptop',
        price: 1500,
        category: 'laptops',
        thumbnail: 'thumb-3',
      },
      {
        id: 4,
        title: 'Phone Case',
        description: 'Accessory',
        price: 50,
        category: 'accessories',
        thumbnail: 'thumb-4',
      },
    ],
    total: 4,
    skip: 0,
    limit: 20,
  };
}

describe('products-query utils', () => {
  it('builds search fetch params with fixed limit and reset skip', () => {
    const result = buildProductsFetchParams({
      limit: 9,
      skip: 18,
      search: '  phone  ',
      category: 'smartphones',
    });

    expect(result.isSearching).toBe(true);
    expect(result.fetchParams).toEqual({
      limit: 100,
      skip: 0,
      search: '  phone  ',
    });
  });

  it('builds normal fetch params when search is empty', () => {
    const result = buildProductsFetchParams({
      limit: 9,
      skip: 18,
      search: '   ',
      category: 'smartphones',
    });

    expect(result.isSearching).toBe(false);
    expect(result.fetchParams).toEqual({
      limit: 9,
      skip: 18,
      search: '   ',
      category: 'smartphones',
    });
  });

  it('applies search + category + sort + pagination in memory', () => {
    const result = applyProductsQuery(createProductsResult(), {
      search: 'phone',
      category: 'smartphones',
      sortBy: 'price',
      limit: 1,
      skip: 1,
    });

    expect(result.total).toBe(2);
    expect(result.skip).toBe(1);
    expect(result.limit).toBe(1);
    expect(result.products).toHaveLength(1);
    expect(result.products[0].title).toBe('Phone Ultra');
  });

  it('sorts when search is not active and keeps metadata from source', () => {
    const source = createProductsResult();
    const result = applyProductsQuery(source, { sortBy: 'price' });

    expect(result.total).toBe(source.total);
    expect(result.skip).toBe(source.skip);
    expect(result.limit).toBe(source.limit);
    expect(result.products.map((p) => p.price)).toEqual([50, 300, 900, 1500]);
  });
});

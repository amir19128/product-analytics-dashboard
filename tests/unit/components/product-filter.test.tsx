/** @jest-environment jsdom */
import { act, fireEvent, render, screen } from '@testing-library/react';

import { ProductFilter } from '@/features/products/components/ProductFilter';

describe('ProductFilter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('calls debounced search callback', () => {
    const onSearchChange = jest.fn();

    render(<ProductFilter categories={[]} onSearchChange={onSearchChange} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });
    onSearchChange.mockClear();

    fireEvent.change(screen.getByLabelText('Search products'), {
      target: { value: 'phone' },
    });

    expect(onSearchChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onSearchChange).toHaveBeenCalledWith('phone');
  });

  it('calls category and sort callbacks', () => {
    const onCategoryChange = jest.fn();
    const onSortChange = jest.fn();

    render(
      <ProductFilter
        categories={['smartphones', 'laptops']}
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'laptops' },
    });
    fireEvent.change(screen.getByLabelText('Sort'), {
      target: { value: 'price' },
    });

    expect(onCategoryChange).toHaveBeenCalledWith('laptops');
    expect(onSortChange).toHaveBeenCalledWith('price');
  });
});

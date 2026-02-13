/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '@/features/products/components/Pagination';

describe('Pagination', () => {
  it('disables first and prev buttons on first page', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    const firstButton = screen.getByRole('button', { name: 'First' });
    const prevButton = screen.getByRole('button', { name: 'Prev' });

    expect(firstButton).toHaveProperty('disabled', true);
    expect(prevButton).toHaveProperty('disabled', true);
  });

  it('calls onPageChange when next page is requested', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('shows ellipsis for long pagination and allows selecting a page', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />
    );

    const ellipsisItems = screen.getAllByText('...');
    expect(ellipsisItems).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: '6' }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });
});

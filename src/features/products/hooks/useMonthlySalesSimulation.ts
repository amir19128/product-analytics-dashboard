import { useMemo } from 'react';
import { mockMonthlySales } from '../mocks/monthly-sales.mock';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function useMonthlySalesSimulation() {
  const totalRevenue = useMemo(
    () => mockMonthlySales.reduce((sum, item) => sum + item.revenue, 0),
    []
  );

  return {
    sales: mockMonthlySales,
    totalRevenue,
    formatCurrency: (value: number) => currencyFormatter.format(value),
    formatAxisTick: (value: number) => `$${Math.round(value / 1000)}k`,
  };
}


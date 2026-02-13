'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMonthlySalesSimulation } from '../hooks/useMonthlySalesSimulation';

export function MonthlySalesChart() {
  const { sales, totalRevenue, formatCurrency, formatAxisTick } =
    useMonthlySalesSimulation();

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold md:text-xl">Monthly Sales</h2>
          <p className="text-xs text-[var(--muted-foreground)] md:text-sm">
            Mock data preview for dashboard chart
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--muted-foreground)]">Year Total</p>
          <p className="text-sm font-bold text-[var(--accent)] md:text-base">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      <div className="h-72 w-full rounded-xl bg-[var(--surface-soft)] p-2 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sales} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
            <YAxis
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              tickFormatter={formatAxisTick}
            />
            <Tooltip
              formatter={(value: number | string | undefined) =>
                formatCurrency(Number(value ?? 0))
              }
              cursor={{ fill: 'var(--surface)' }}
              contentStyle={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                background: 'var(--surface)',
              }}
            />
            <Bar dataKey="revenue" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}


import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Transaction, TransactionType } from '../types';

interface SummaryChartProps {
  data: Transaction[];
}

const COLORS = ['#38BDF8', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

const SummaryChart: React.FC<SummaryChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const expenseData = data.filter(t => t.type === TransactionType.EXPENSE);
    const categoryTotals = expenseData.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [data]);

  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-64 text-text-secondary">Adicione algumas despesas para ver o gráfico.</div>;
  }
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: '#38BDF8',
                borderRadius: '0.5rem',
            }}
            formatter={(value: number) => `R$ ${value.toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryChart;

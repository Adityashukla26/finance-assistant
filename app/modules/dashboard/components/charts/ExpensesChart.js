'use client';

import { Doughnut } from 'react-chartjs-2';
import { defaultChartOptions, chartColorArray } from './ChartDefaults';

export default function ExpensesChart({ data }) {
  // Default data if none provided
  const chartData = data || {
    labels: ['Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Other'],
    values: [35, 15, 20, 10, 12, 8],
  };

  const config = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        backgroundColor: chartColorArray,
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        position: 'right',
        labels: {
          color: '#b8c2cc',
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        ...defaultChartOptions.plugins.tooltip,
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed;
            label += value + '%';
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: '280px' }}>
      <Doughnut data={config} options={options} />
    </div>
  );
}

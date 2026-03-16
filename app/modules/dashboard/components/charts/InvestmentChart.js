'use client';

import { Pie } from 'react-chartjs-2';
import { defaultChartOptions, chartColorArray } from './ChartDefaults';

export default function InvestmentChart({ data }) {
  // Default data if none provided
  const chartData = data || {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cryptocurrency', 'Cash'],
    values: [45, 20, 15, 10, 10],
  };

  const config = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        backgroundColor: chartColorArray.slice(0, 5),
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
      <Pie data={config} options={options} />
    </div>
  );
}

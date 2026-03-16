'use client';

import { Line } from 'react-chartjs-2';
import { defaultChartOptions, chartColors } from './ChartDefaults';

export default function CashFlowChart({ data }) {
  // Default data if none provided
  const chartData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [5200, 6200, 7100, 6800, 8200, 7800],
  };

  const config = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Cash Flow',
        data: chartData.values,
        borderColor: chartColors.accentBlue,
        backgroundColor: 'rgba(0, 217, 255, 0.08)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: chartColors.accentBlue,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: '280px' }}>
      <Line data={config} options={options} />
    </div>
  );
}

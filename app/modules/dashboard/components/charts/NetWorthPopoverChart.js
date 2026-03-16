'use client';

import { Line } from 'react-chartjs-2';
import { chartColors } from './ChartDefaults';

export default function NetWorthPopoverChart({ data }) {
  // Default data if none provided
  const chartData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [180000, 190000, 200500, 210000, 225000, 235000, 242000, 247850],
  };

  const config = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Net Worth',
        data: chartData.values,
        borderColor: chartColors.accentPurple,
        backgroundColor: 'rgba(185, 103, 255, 0.08)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: chartColors.accentPurple,
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 46, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#b8c2cc',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(context.parsed.y);
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.02)',
          drawBorder: false,
        },
        ticks: {
          color: '#b8c2cc',
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
          drawBorder: false,
        },
        ticks: {
          color: '#b8c2cc',
          font: {
            size: 10,
          },
          callback: function (value) {
            return '$' + (value / 1000).toFixed(0) + 'k';
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={config} options={options} />
    </div>
  );
}

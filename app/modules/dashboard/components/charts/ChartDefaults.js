'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Default chart options matching the dashboard theme
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#b8c2cc',
        font: {
          size: 11,
          family: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(30, 30, 46, 0.95)',
      titleColor: '#ffffff',
      bodyColor: '#b8c2cc',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(context.parsed.y);
          }
          return label;
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
          size: 11,
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
          size: 11,
        },
      },
    },
  },
};

// Color palette from the dashboard
export const chartColors = {
  accentBlue: '#00d9ff',
  accentPurple: '#b967ff',
  accentTeal: '#00ffcc',
  accentOrange: '#ff6b35',
  accentYellow: '#ffd166',
  gray: '#64748b',
};

export const chartColorArray = [
  chartColors.accentBlue,
  chartColors.accentPurple,
  chartColors.accentTeal,
  chartColors.accentOrange,
  chartColors.accentYellow,
  chartColors.gray,
];

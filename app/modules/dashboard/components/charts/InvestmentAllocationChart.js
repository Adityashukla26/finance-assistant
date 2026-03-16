'use client'

import { Doughnut } from 'react-chartjs-2'
import { chartColors, chartColorArray } from './ChartDefaults'

export default function InvestmentAllocationChart({ allocation }) {
  const data = {
    labels: ['Equity', 'Debt', 'Gold', 'Cash'],
    datasets: [
      {
        data: [
          allocation?.equity || 72,
          allocation?.debt || 28,
          allocation?.gold || 7,
          3, // Cash reserve
        ],
        backgroundColor: [
          'rgba(255, 107, 53, 0.8)', // Orange for equity
          'rgba(0, 255, 204, 0.8)', // Teal for debt
          'rgba(255, 209, 102, 0.8)', // Yellow for gold
          'rgba(0, 217, 255, 0.8)', // Cyan for cash
        ],
        borderColor: [
          'rgba(255, 107, 53, 1)',
          'rgba(0, 255, 204, 1)',
          'rgba(255, 209, 102, 1)',
          'rgba(0, 217, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#b8c2cc',
          padding: 15,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
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
            const label = context.label || ''
            const value = context.parsed
            return `${label}: ${value}%`
          },
        },
      },
    },
    cutout: '60%',
  }

  return <Doughnut data={data} options={options} />
}

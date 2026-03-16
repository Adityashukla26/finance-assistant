'use client'

import { Doughnut } from 'react-chartjs-2'
import { useMemo } from 'react'

export default function RiskTolerancePopoverChart({ riskAnalysis }) {
  const { riskScore, assetAllocation } = riskAnalysis || {}
  const { equity = 72, debt = 28, gold = 7 } = assetAllocation || {}

  const data = useMemo(
    () => ({
      labels: ['Equity', 'Debt', 'Gold'],
      datasets: [
        {
          data: [equity, debt, gold],
          backgroundColor: [
            'rgba(255, 107, 53, 0.8)',
            'rgba(0, 255, 204, 0.8)',
            'rgba(255, 209, 102, 0.8)',
          ],
          borderColor: [
            'rgba(255, 107, 53, 1)',
            'rgba(0, 255, 204, 1)',
            'rgba(255, 209, 102, 1)',
          ],
          borderWidth: 2,
        },
      ],
    }),
    [equity, debt, gold]
  )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#b8c2cc',
          padding: 10,
          font: {
            size: 11,
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
        padding: 10,
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
    cutout: '65%',
  }

  return (
    <div className="relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{riskScore || 85}</p>
          <p className="text-xs text-slate-400">Risk Score</p>
        </div>
      </div>
    </div>
  )
}

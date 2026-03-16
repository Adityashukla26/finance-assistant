'use client'

import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { chartColors } from './ChartDefaults'

export default function StockChart({ symbol = 'NIFTY 50', timeFrame = '1D' }) {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    // Generate realistic intraday data
    const generateData = () => {
      const basePrice = 21453
      const dataPoints = timeFrame === '1D' ? 78 : timeFrame === '1W' ? 35 : timeFrame === '1M' ? 30 : timeFrame === '3M' ? 90 : 252
      const volatility = timeFrame === '1D' ? 0.003 : timeFrame === '1W' ? 0.008 : 0.015
      
      const labels = []
      const values = []
      const volumes = []
      
      let currentPrice = basePrice
      
      for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.48) * basePrice * volatility
        currentPrice += change
        values.push(parseFloat(currentPrice.toFixed(2)))
        volumes.push(Math.floor(Math.random() * 5000000 + 3000000))
        
        // Generate labels based on timeframe
        if (timeFrame === '1D') {
          const hour = Math.floor(9 + (i / 78) * 6.5)
          const minute = (i % 6) * 10
          labels.push(`${hour}:${minute.toString().padStart(2, '0')}`)
        } else if (timeFrame === '1W') {
          const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
          labels.push(`${days[i % 5]} ${Math.floor(i / 5) * 2}h`)
        } else if (timeFrame === '1M') {
          labels.push(`${i + 1} Jan`)
        } else if (timeFrame === '3M') {
          const months = ['Oct', 'Nov', 'Dec', 'Jan']
          labels.push(`${(i % 30) + 1} ${months[Math.floor(i / 30)]}`)
        } else {
          const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
          labels.push(months[i % 12])
        }
      }
      
      return { labels, values, volumes }
    }

    const data = generateData()
    
    const isPositive = data.values[data.values.length - 1] > data.values[0]
    
    setChartData({
      labels: data.labels,
      datasets: [
        {
          label: symbol,
          data: data.values,
          borderColor: isPositive ? chartColors.accentTeal : '#ff4757',
          backgroundColor: isPositive 
            ? 'rgba(0, 255, 204, 0.1)' 
            : 'rgba(255, 71, 87, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: isPositive ? chartColors.accentTeal : '#ff4757',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    })
  }, [symbol, timeFrame])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 46, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#b8c2cc',
        borderColor: 'rgba(0, 255, 204, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Price: ₹${context.parsed.y.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
        },
        ticks: {
          color: '#b8c2cc',
          font: {
            size: 10,
          },
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#b8c2cc',
          font: {
            size: 11,
          },
          callback: function (value) {
            return '₹' + (value / 1000).toFixed(1) + 'k'
          },
        },
        position: 'right',
      },
    },
  }

  if (!chartData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-4xl">⏳</div>
          <p className="text-sm text-slate-400">Loading chart data...</p>
        </div>
      </div>
    )
  }

  return <Line data={chartData} options={options} />
}

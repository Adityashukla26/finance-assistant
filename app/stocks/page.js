'use client'

import { useState } from 'react'
import ProtectedRoute from '../modules/auth/components/ProtectedRoute'
import DashboardSidebar from '../modules/dashboard/components/DashboardSidebar'
import DashboardTopBar from '../modules/dashboard/components/DashboardTopBar'
import StockTicker from '../modules/dashboard/components/StockTicker'
import SectionCard from '../modules/dashboard/components/SectionCard'
import StockChart from '../modules/dashboard/components/charts/StockChart'
import InvestmentAllocationChart from '../modules/dashboard/components/charts/InvestmentAllocationChart'
import useAccountData from '../modules/dashboard/hooks/useAccountData'
import { analyzeRiskTolerance } from '../modules/dashboard/lib/riskCalculator'

const marketIndices = [
  { name: 'NIFTY 50', value: '21,453.95', change: '+1.24%', positive: true },
  { name: 'SENSEX', value: '71,752.11', change: '+1.18%', positive: true },
  { name: 'BANK NIFTY', value: '47,895.30', change: '-0.32%', positive: false },
  { name: 'NIFTY IT', value: '35,678.25', change: '+2.15%', positive: true },
]

const topStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: '2,456.75', change: '+2.34%', positive: true },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: '3,789.50', change: '+1.85%', positive: true },
  { symbol: 'INFY', name: 'Infosys Limited', price: '1,567.30', change: '-0.45%', positive: false },
  { symbol: 'HDFC', name: 'HDFC Bank', price: '1,678.90', change: '+1.12%', positive: true },
  { symbol: 'ICICI', name: 'ICICI Bank', price: '987.65', change: '+0.89%', positive: true },
  { symbol: 'BHARTI', name: 'Bharti Airtel', price: '1,234.20', change: '-1.23%', positive: false },
  { symbol: 'ITC', name: 'ITC Limited', price: '456.80', change: '+0.67%', positive: true },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: '523.45', change: '+1.45%', positive: true },
]

const watchlist = [
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: '789.30', change: '+3.45%', positive: true },
  { symbol: 'ADANIPORTS', name: 'Adani Ports', price: '1,234.50', change: '-0.78%', positive: false },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: '3,245.60', change: '+1.23%', positive: true },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', price: '1,456.20', change: '+2.10%', positive: true },
]

export default function StocksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [timeFrame, setTimeFrame] = useState('1D')
  const { data: accountData } = useAccountData()

  // Calculate risk-based allocation
  const riskAnalysis = accountData ? analyzeRiskTolerance(accountData) : null
  const allocation = riskAnalysis?.assetAllocation || { equity: 72, debt: 28, gold: 7 }

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 text-white">
        <div className="flex h-screen">
          <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="flex flex-1 flex-col overflow-hidden">
            <DashboardTopBar onMenuClick={() => setIsSidebarOpen(true)} />
            <StockTicker />

            <div className="flex-1 overflow-y-auto p-4">
              <h1 className="mb-6 text-3xl font-bold">Stock Market</h1>

              {/* Market Overview */}
              <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {marketIndices.map((index) => (
                  <SectionCard key={index.name}>
                    <p className="mb-2 text-sm text-slate-400">{index.name}</p>
                    <p className="mb-1 text-2xl font-bold text-cyan-300">{index.value}</p>
                    <p className={`text-sm font-semibold ${index.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {index.change}
                    </p>
                  </SectionCard>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                {/* Chart Section */}
                <SectionCard
                  title="NIFTY 50 Chart"
                  action={
                    <div className="flex gap-2">
                      {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setTimeFrame(tf)}
                          className={`rounded-lg px-3 py-1 text-xs transition-colors ${
                            timeFrame === tf
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                              : 'bg-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  }
                >
                  <div className="h-80">
                    <StockChart symbol="NIFTY 50" timeFrame={timeFrame} />
                  </div>
                </SectionCard>

                {/* Watchlist */}
                <SectionCard
                  title="My Watchlist"
                  action={
                    <button className="text-cyan-400 transition-colors hover:text-cyan-300">
                      + Add
                    </button>
                  }
                >
                  <div className="space-y-3">
                    {watchlist.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:border-cyan-500/30 hover:bg-white/10"
                      >
                        <div>
                          <p className="font-semibold">{stock.symbol}</p>
                          <p className="text-xs text-slate-400">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{stock.price}</p>
                          <p className={`text-xs ${stock.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {stock.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* Top Stocks */}
              <SectionCard title="Top Stocks Today" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {topStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="rounded-lg border border-white/5 bg-slate-950/50 p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-900/50"
                    >
                      <p className="mb-1 text-lg font-bold text-white">{stock.symbol}</p>
                      <p className="mb-2 text-xs text-slate-400">{stock.name}</p>
                      <p className="mb-1 text-xl font-semibold text-cyan-300">₹{stock.price}</p>
                      <p className={`text-sm font-semibold ${stock.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Recommended Portfolio Allocation */}
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
                <SectionCard title="Recommended Portfolio">
                  <div className="h-64">
                    <InvestmentAllocationChart allocation={allocation} />
                  </div>
                </SectionCard>

                <SectionCard title="Allocation Strategy">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-white">Equity Allocation</span>
                        <span className="text-2xl font-bold text-emerald-400">{allocation.equity}%</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        High growth potential with moderate risk. Invest in diversified equity mutual funds and blue-chip stocks.
                      </p>
                    </div>

                    <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-white">Debt Allocation</span>
                        <span className="text-2xl font-bold text-cyan-400">{allocation.debt}%</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Stable returns with lower risk. Consider government bonds, fixed deposits, and debt mutual funds.
                      </p>
                    </div>

                    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-white">Gold Allocation</span>
                        <span className="text-2xl font-bold text-yellow-400">{allocation.gold}%</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Hedge against inflation. Invest through gold ETFs, sovereign gold bonds, or digital gold.
                      </p>
                    </div>
                  </div>
                </SectionCard>
              </div>

            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

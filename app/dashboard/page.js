'use client'

import { useState } from 'react'
import ProtectedRoute from '../modules/auth/components/ProtectedRoute'
import DashboardSidebar from '../modules/dashboard/components/DashboardSidebar'
import DashboardTopBar from '../modules/dashboard/components/DashboardTopBar'
import StockTicker from '../modules/dashboard/components/StockTicker'
import MetricsSection from '../modules/dashboard/components/MetricsSection'
import NewsSection from '../modules/dashboard/components/NewsSection'
import AccountSummary from '../modules/dashboard/components/AccountSummary'

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 text-white">
        <div className="flex h-screen">
          <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="flex flex-1 flex-col overflow-hidden">
            <DashboardTopBar onMenuClick={() => setIsSidebarOpen(true)} />
            <StockTicker />

            <div className="flex-1 overflow-y-auto">
              <div className="grid gap-4 p-4 pb-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
                <section className="min-w-0">
                  <h1 className="mb-4 text-2xl font-semibold">Financial Dashboard</h1>
                  <AccountSummary />
                  <div className="mt-4">
                    <MetricsSection />
                  </div>
                </section>

                <aside className="min-w-0 space-y-4 lg:sticky lg:top-4 lg:self-start">
                  <NewsSection />
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

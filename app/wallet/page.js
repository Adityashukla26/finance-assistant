'use client'

import { useState } from 'react'
import ProtectedRoute from '../modules/auth/components/ProtectedRoute'
import DashboardSidebar from '../modules/dashboard/components/DashboardSidebar'
import DashboardTopBar from '../modules/dashboard/components/DashboardTopBar'
import SectionCard from '../modules/dashboard/components/SectionCard'
import AnimatedCounter from '../modules/dashboard/components/AnimatedCounter'
import useAccountData from '../modules/dashboard/hooks/useAccountData'

const cards = [
  { id: 1, type: 'Credit', last4: '4532', balance: '12,450', limit: '50,000', color: 'from-cyan-500 to-blue-600' },
  { id: 2, type: 'Debit', last4: '8976', balance: '34,280', limit: null, color: 'from-purple-500 to-pink-600' },
]

// Total Balance = Card 1 (12,450) + Card 2 (34,280) = 46,730

const recentTransactions = [
  { id: 1, title: 'Amazon Purchase', category: 'Shopping', amount: '-₹2,450', date: 'Today', time: '2:30 PM', type: 'debit' },
  { id: 2, title: 'Salary Deposit', category: 'Income', amount: '+₹85,000', date: 'Yesterday', time: '9:00 AM', type: 'credit' },
  { id: 3, title: 'Netflix Subscription', category: 'Entertainment', amount: '-₹649', date: 'Jan 20', time: '11:45 AM', type: 'debit' },
  { id: 4, title: 'Swiggy Food Order', category: 'Food', amount: '-₹765', date: 'Jan 19', time: '8:30 PM', type: 'debit' },
  { id: 5, title: 'Freelance Payment', category: 'Income', amount: '+₹15,000', date: 'Jan 18', time: '3:15 PM', type: 'credit' },
  { id: 6, title: 'Uber Ride', category: 'Transport', amount: '-₹230', date: 'Jan 18', time: '10:20 AM', type: 'debit' },
]

const billsUpcoming = [
  { name: 'Electricity Bill', amount: '₹1,240', dueDate: 'Jan 28', status: 'pending' },
  { name: 'Internet Bill', amount: '₹999', dueDate: 'Jan 30', status: 'pending' },
  { name: 'Mobile Recharge', amount: '₹599', dueDate: 'Feb 5', status: 'upcoming' },
]

const quickActions = [
  { icon: '💸', label: 'Send Money', color: 'bg-cyan-500/20 text-cyan-400' },
  { icon: '📲', label: 'Pay Bills', color: 'bg-purple-500/20 text-purple-400' },
  { icon: '🏦', label: 'Bank Transfer', color: 'bg-emerald-500/20 text-emerald-400' },
  { icon: '📊', label: 'View Reports', color: 'bg-orange-500/20 text-orange-400' },
]

export default function WalletPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { data } = useAccountData()
  const [selectedCard, setSelectedCard] = useState(cards[0])

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 text-white">
        <div className="flex h-screen">
          <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="flex flex-1 flex-col overflow-hidden">
            <DashboardTopBar onMenuClick={() => setIsSidebarOpen(true)} />

            <div className="flex-1 overflow-y-auto p-4">
              <h1 className="mb-6 text-3xl font-bold">Digital Wallet</h1>

              {/* Balance Overview */}
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <SectionCard>
                  <p className="mb-2 text-sm text-slate-400">Total Balance</p>
                  <p className="mb-1 text-3xl font-bold text-cyan-300">
                    ₹<AnimatedCounter value={data?.totalBalance || 46730} duration={1500} />
                  </p>
                  <p className="text-sm font-semibold text-emerald-400">+12.5% this month</p>
                </SectionCard>

                <SectionCard>
                  <p className="mb-2 text-sm text-slate-400">Total Expenses</p>
                  <p className="mb-1 text-3xl font-bold text-orange-300">
                    ₹<AnimatedCounter value={data?.totalExpenses || 28450} duration={1500} delay={100} />
                  </p>
                  <p className="text-sm font-semibold text-red-400">+5.2% this month</p>
                </SectionCard>

                <SectionCard>
                  <p className="mb-2 text-sm text-slate-400">Monthly Income</p>
                  <p className="mb-1 text-3xl font-bold text-emerald-300">
                    ₹<AnimatedCounter value={data?.monthlyIncome || 85000} duration={1500} delay={200} />
                  </p>
                  <p className="text-sm font-semibold text-emerald-400">+18.3% this month</p>
                </SectionCard>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                <div className="space-y-6">
                  {/* Cards Section */}
                  <SectionCard
                    title="My Cards"
                    action={
                      <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-sm font-semibold transition-all hover:scale-105">
                        + Add Card
                      </button>
                    }
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      {cards.map((card) => (
                        <div
                          key={card.id}
                          onClick={() => setSelectedCard(card)}
                          className={`relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow-xl transition-all hover:scale-105 ${
                            selectedCard.id === card.id ? 'ring-4 ring-white/30' : ''
                          }`}
                        >
                          <div className="mb-8">
                            <p className="mb-1 text-sm opacity-80">Balance</p>
                            <p className="text-2xl font-bold">₹{card.balance}</p>
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="mb-1 text-xs opacity-80">{card.type} Card</p>
                              <p className="font-mono text-sm">•••• •••• •••• {card.last4}</p>
                            </div>
                            <div className="text-xl font-bold">💳</div>
                          </div>
                          {card.limit && (
                            <div className="mt-3 flex items-center justify-between text-xs opacity-80">
                              <span>Credit Limit</span>
                              <span>₹{card.limit}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Quick Actions */}
                  <SectionCard title="Quick Actions">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          className={`flex flex-col items-center gap-3 rounded-xl ${action.color} p-6 transition-all hover:scale-105`}
                        >
                          <span className="text-4xl">{action.icon}</span>
                          <span className="text-sm font-semibold">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Recent Transactions */}
                  <SectionCard
                    title="Recent Transactions"
                    action={
                      <button className="text-cyan-400 transition-colors hover:text-cyan-300">
                        View All
                      </button>
                    }
                  >
                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 transition-all hover:border-cyan-500/30 hover:bg-white/10"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                transaction.type === 'credit' ? 'bg-emerald-500/20' : 'bg-orange-500/20'
                              }`}
                            >
                              {transaction.type === 'credit' ? '↓' : '↑'}
                            </div>
                            <div>
                              <p className="font-semibold">{transaction.title}</p>
                              <p className="text-xs text-slate-400">
                                {transaction.category} • {transaction.date} at {transaction.time}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`text-lg font-bold ${
                              transaction.type === 'credit' ? 'text-emerald-400' : 'text-orange-400'
                            }`}
                          >
                            {transaction.amount}
                          </p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>

                {/* Sidebar with Bills */}
                <div className="space-y-6">
                  <SectionCard title="Upcoming Bills">
                    <div className="space-y-3">
                      {billsUpcoming.map((bill) => (
                        <div
                          key={bill.name}
                          className="rounded-lg border border-white/5 bg-white/5 p-4"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <p className="font-semibold">{bill.name}</p>
                              <p className="text-sm text-slate-400">Due: {bill.dueDate}</p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                bill.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-slate-500/20 text-slate-400'
                              }`}
                            >
                              {bill.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-cyan-300">{bill.amount}</p>
                            <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-1 text-sm font-semibold transition-all hover:scale-105">
                              Pay Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Spending Insights */}
                  <SectionCard title="Spending Insights">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-400">Food & Dining</span>
                          <span className="font-semibold">₹8,450</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-400">Shopping</span>
                          <span className="font-semibold">₹12,340</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-400">Transport</span>
                          <span className="font-semibold">₹3,280</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[25%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-400">Entertainment</span>
                          <span className="font-semibold">₹4,380</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

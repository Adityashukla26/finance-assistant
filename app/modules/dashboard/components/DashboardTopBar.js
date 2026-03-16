'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSession from '../../auth/hooks/useSession'
import useAccountData from '../hooks/useAccountData'
import AnimatedCounter from './AnimatedCounter'
import NetWorthPopoverChart from './charts/NetWorthPopoverChart'
import WellnessGaugeChart from './charts/WellnessGaugeChart'
import RiskTolerancePopoverChart from './charts/RiskTolerancePopoverChart'
import { analyzeRiskTolerance } from '../lib/riskCalculator'

const insights = [
  {
    icon: '💡',
    title: 'Opportunity Detected',
    description:
      'Based on your spending patterns, you could save $240/month by optimizing subscription services.',
  },
  {
    icon: '📈',
    title: 'Investment Suggestion',
    description:
      'Your portfolio is underweight in technology stocks. Consider adding AI-focused ETFs for diversification.',
  },
  {
    icon: '🛡️',
    title: 'Risk Alert',
    description:
      'Your emergency fund covers only 2.3 months of expenses. Build toward 6 months for better resilience.',
  },
]

export default function DashboardTopBar({ onMenuClick }) {
  const router = useRouter()
  const { user } = useSession()
  const { data } = useAccountData()
  const [showNetWorthPopover, setShowNetWorthPopover] = useState(false)
  const [showWellnessPopover, setShowWellnessPopover] = useState(false)
  const [showRiskPopover, setShowRiskPopover] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  const riskAnalysis = data ? analyzeRiskTolerance(data) : null
  const profileMenuRef = useRef(null)
  const notificationsRef = useRef(null)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
  }

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get user initials for avatar
  const getInitials = (email) => {
    if (!email) return 'U'
    const name = email.split('@')[0]
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3">
      {/* Hamburger Menu Button */}
      <button
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
        type="button"
        aria-label="Toggle menu"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex min-w-56 flex-1 items-center rounded-lg bg-white/5 px-3 py-2">
        <span className="mr-2 text-sm">🔍</span>
        <input
          placeholder="Search transactions, stocks, or insights..."
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 text-xs">
        <div
          className="relative rounded-lg bg-white/5 px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-lg cursor-pointer "
          onMouseEnter={() => setShowNetWorthPopover(true)}
          onMouseLeave={() => setShowNetWorthPopover(false)}
        >
          <p className="text-slate-400">Net Worth</p>
          <p className="font-semibold text-cyan-300">
            ₹
            <AnimatedCounter
              value={data?.netWorth || 2478500}
              duration={1500}
              delay={200}
            />
          </p>
          {showNetWorthPopover && (
            <div className="absolute right-0 top-full z-50 mt-2 w-96 max-w-[calc(100vw-1rem)] rounded-lg border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-lg">
              <h4 className="mb-3 text-sm font-semibold text-white">Net Worth Trend</h4>
              <div style={{ height: '180px' }}>
                <NetWorthPopoverChart />
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Your net worth has grown by 37.6% this year
              </p>
            </div>
          )}
        </div>

        <div
          className="relative rounded-lg bg-white/5 px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-lg cursor-pointer"
          onMouseEnter={() => setShowWellnessPopover(true)}
          onMouseLeave={() => setShowWellnessPopover(false)}
        >
          <p className="text-slate-400">Wellness</p>
          <p className="font-semibold text-emerald-300">
            <AnimatedCounter value={data?.wellness || 82} duration={1200} delay={300} />
            /100
          </p>
          {showWellnessPopover && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-1rem)] rounded-lg border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-lg">
              <h4 className="mb-3 text-sm font-semibold text-white">Financial Wellness</h4>
              <div style={{ height: '160px' }}>
                <WellnessGaugeChart value={data?.wellness || 0} />
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Strong financial health with balanced savings and debt management
              </p>
            </div>
          )}
        </div>

        <div
          className="relative rounded-lg bg-white/5 px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-lg cursor-pointer"
          onMouseEnter={() => setShowRiskPopover(true)}
          onMouseLeave={() => setShowRiskPopover(false)}
        >
          <p className="text-slate-400">Risk Score</p>
          <p className="font-semibold text-orange-300">
            <AnimatedCounter value={riskAnalysis?.riskScore || 85} duration={1200} delay={400} />
            /100
          </p>
          {showRiskPopover && (
            <div className="absolute right-0 top-full z-50 mt-2 w-96 max-w-[calc(100vw-1rem)] rounded-lg border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-lg">
              <h4 className="mb-3 text-sm font-semibold text-white">Risk Tolerance Analysis</h4>
              <div style={{ height: '200px' }}>
                <RiskTolerancePopoverChart riskAnalysis={riskAnalysis} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/20">
                  <p className="text-xs text-slate-400">Monthly Surplus</p>
                  <p className="text-sm font-semibold text-emerald-300">₹{riskAnalysis?.monthlySurplus?.toLocaleString() || '30,000'}</p>
                </div>
                <div className="rounded-lg bg-orange-500/10 p-2 border border-orange-500/20">
                  <p className="text-xs text-slate-400">Risk Capital</p>
                  <p className="text-sm font-semibold text-orange-300">₹{riskAnalysis?.monthlyRiskCapital?.toLocaleString() || '21,600'}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {riskAnalysis?.riskProfile?.level || 'Aggressive'} investor with {riskAnalysis?.assetAllocation?.equity || 72}% equity allocation recommended
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Dropdown */}
      <div className="relative" ref={notificationsRef}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:bg-white/10"
          type="button"
          aria-label="Notifications"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* Notification badge */}
          <span className="absolute right-1 top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-lg">
            <div className="border-b border-white/10 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">AI Insights</h3>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-300">
                  {insights.length} new
                </span>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-2">
              {insights.map((insight, index) => (
                <div
                  key={insight.title}
                  className={`rounded-lg p-3 transition-colors hover:bg-white/5 ${
                    index !== insights.length - 1 ? 'mb-2' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{insight.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{insight.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{insight.description}</p>
                      <p className="mt-2 text-xs text-slate-500">Just now</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-2">
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full rounded-lg py-2 text-xs text-cyan-400 transition-colors hover:bg-white/5"
                type="button"
              >
                View all insights
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={profileMenuRef}>
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/30"
          type="button"
          aria-label="Profile menu"
        >
          {getInitials(user?.email)}
        </button>

        {/* Dropdown Menu */}
        {showProfileMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-lg">
            <div className="border-b border-white/10 px-3 py-3">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="mt-1 text-xs text-slate-400">{user?.email}</p>
            </div>
            
            <div className="py-1">
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  // Add profile navigation logic here
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                type="button"
              >
                <span>👤</span>
                <span>My Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  // Add settings navigation logic here
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                type="button"
              >
                <span>⚙️</span>
                <span>Settings</span>
              </button>
            </div>

            <div className="border-t border-white/10 pt-1">
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  handleLogout()
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-rose-300 transition-colors hover:bg-rose-500/10 hover:text-rose-200"
                type="button"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

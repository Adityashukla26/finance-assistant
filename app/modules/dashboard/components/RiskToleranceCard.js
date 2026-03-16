'use client'

import { useMemo } from 'react'
import SectionCard from './SectionCard'
import AnimatedCounter from './AnimatedCounter'
import { analyzeRiskTolerance } from '../lib/riskCalculator'

export default function RiskToleranceCard({ userData }) {
  const analysis = useMemo(() => {
    if (!userData) return null
    return analyzeRiskTolerance(userData)
  }, [userData])

  if (!analysis) {
    return (
      <SectionCard title="Risk Tolerance Analysis">
        <p className="text-sm text-slate-400">Loading risk analysis...</p>
      </SectionCard>
    )
  }

  const {
    riskScore,
    riskProfile,
    surplus,
    equityAllocationPercent,
    riskCapital,
    allocation,
    emergencyFundCoverage,
  } = analysis

  return (
    <SectionCard
      title="Risk Tolerance Analysis"
      subtitle="AI-powered risk assessment based on your financial profile"
      action={
        <div className={`rounded-full px-4 py-1 text-sm font-semibold ${riskProfile.color} bg-white/5`}>
          {riskProfile.emoji} {riskProfile.level}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Risk Score Gauge */}
        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-400">Risk Tolerance Score</span>
            <span className={`text-2xl font-bold ${riskProfile.color}`}>
              <AnimatedCounter value={riskScore} duration={1200} />
              /100
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange-500 transition-all duration-1000"
              style={{ width: `${riskScore}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Conservative</span>
            <span>Moderate</span>
            <span>Aggressive</span>
          </div>
        </div>

        {/* Financial Surplus */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="mb-1 text-xs text-slate-400">Monthly Surplus</p>
            <p className="text-xl font-bold text-cyan-300">
              ₹<AnimatedCounter value={surplus.monthlySurplus} duration={1200} delay={100} />
            </p>
          </div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
            <p className="mb-1 text-xs text-slate-400">Annual Surplus</p>
            <p className="text-xl font-bold text-purple-300">
              ₹<AnimatedCounter value={surplus.annualSurplus} duration={1200} delay={200} />
            </p>
          </div>
        </div>

        {/* Asset Allocation */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Recommended Asset Allocation</h4>
          <div className="space-y-3">
            {/* Equity */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">📈</span>
                  <span className="text-slate-300">Equity (High Risk)</span>
                </div>
                <span className="font-semibold text-orange-400">{allocation.equity}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{ width: `${allocation.equity}%` }}
                />
              </div>
            </div>

            {/* Debt */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">🛡️</span>
                  <span className="text-slate-300">Debt (Low Risk)</span>
                </div>
                <span className="font-semibold text-emerald-400">{allocation.debt}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: `${allocation.debt}%` }}
                />
              </div>
            </div>

            {/* Gold */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🪙</span>
                  <span className="text-slate-300">Gold (Hedge)</span>
                </div>
                <span className="font-semibold text-yellow-400">{allocation.gold}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
                  style={{ width: `${allocation.gold}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Capital Allocation */}
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-4">
          <h4 className="mb-3 text-sm font-semibold text-white">💰 Risk Capital for Equities</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400">Monthly Investment</p>
              <p className="text-lg font-bold text-cyan-300">
                ₹<AnimatedCounter value={riskCapital.monthlyRiskCapital} duration={1200} delay={300} />
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Annual Investment</p>
              <p className="text-lg font-bold text-purple-300">
                ₹<AnimatedCounter value={riskCapital.annualRiskCapital} duration={1200} delay={400} />
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Based on {equityAllocationPercent.toFixed(0)}% equity allocation for age {userData.age}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
            <span className="text-slate-400">Age-Based Equity %</span>
            <span className="font-semibold text-white">{equityAllocationPercent.toFixed(0)}%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
            <span className="text-slate-400">Emergency Coverage</span>
            <span className={`font-semibold ${emergencyFundCoverage >= 6 ? 'text-emerald-400' : 'text-yellow-400'}`}>
              {emergencyFundCoverage} mo
            </span>
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <h4 className="text-sm font-semibold text-white">Key Insights</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {emergencyFundCoverage < 6 && (
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">⚠️</span>
                <span>
                  Build emergency fund to 6 months coverage (currently {emergencyFundCoverage} months)
                </span>
              </li>
            )}
            {riskScore >= 60 && (
              <li className="flex items-start gap-2">
                <span className="text-orange-400">🔥</span>
                <span>
                  Your profile supports aggressive growth investing with {allocation.equity}% in equities
                </span>
              </li>
            )}
            {surplus.monthlySurplus > 20000 && (
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>
                  Strong monthly surplus of ₹{surplus.monthlySurplus.toLocaleString()} enables consistent investing
                </span>
              </li>
            )}
            {userData.age < 35 && (
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">📈</span>
                <span>
                  Young age allows higher equity exposure - benefit from long-term compounding
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

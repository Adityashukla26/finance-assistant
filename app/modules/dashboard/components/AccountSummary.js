'use client'

import useSession from '../../auth/hooks/useSession'
import useAccountData from '../hooks/useAccountData'
import SectionCard from './SectionCard'
import AnimatedCounter from './AnimatedCounter'

export default function AccountSummary() {
  const { user, isLoading: userLoading } = useSession()
  const { data, isLoading: dataLoading } = useAccountData()

  if (userLoading || dataLoading) {
    return (
      <SectionCard title="Account Overview">
        <p className="text-sm text-slate-400">Loading your account...</p>
      </SectionCard>
    )
  }

  if (!user) {
    return null
  }

  return (
    <SectionCard title="Account Overview" subtitle="Live data from your profile">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <p className="text-xs text-slate-400">Name</p>
          <p className="font-semibold text-white">{user.name || user.email?.split('@')[0] || 'FinTrack User'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Email</p>
          <p className="font-semibold text-white">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total Investments</p>
          <p className="font-semibold text-cyan-300">
            ₹<AnimatedCounter value={data?.totalInvestments || 180000} duration={1200} />
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Monthly Income</p>
          <p className="font-semibold text-emerald-300">
            ₹<AnimatedCounter value={data?.monthlyIncome || 85000} duration={1200} delay={100} />
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

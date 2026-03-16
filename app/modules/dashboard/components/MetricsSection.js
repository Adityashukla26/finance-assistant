'use client'

import SectionCard from './SectionCard'
import useAccountData from '../hooks/useAccountData'
import CashFlowChart from './charts/CashFlowChart'
import ExpensesChart from './charts/ExpensesChart'
import InvestmentChart from './charts/InvestmentChart'

function PercentageList({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-xs text-slate-300">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-cyan-400" style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MetricsSection() {
  const { data, isLoading } = useAccountData()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Loading...">
          <p className="text-sm text-slate-400">Fetching your metrics...</p>
        </SectionCard>
      </div>
    )
  }

  const goals = data?.goals || []
  const expenses = data?.expenses || []
  const allocations = data?.investments || []

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SectionCard title="Cash Flow" subtitle={`+12.4% this month`}>
        <CashFlowChart />
      </SectionCard>

      <SectionCard title="Goals Tracker">
        {goals.length === 0 ? (
          <p className="text-sm text-slate-400">No goals set yet</p>
        ) : (
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.title} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-white">{goal.title}</p>
                  <p className="text-xs text-slate-400">Target: ${goal.target?.toLocaleString()}</p>
                </div>
                <p className="font-semibold text-emerald-300">${goal.current?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Expenditure Analytics">
        {expenses.length === 0 ? (
          <p className="text-sm text-slate-400">No expense data yet</p>
        ) : (
          <>
            <ExpensesChart
              data={{
                labels: expenses.map((e) => e.label),
                values: expenses.map((e) => e.value),
              }}
            />
          </>
        )}
      </SectionCard>

      <SectionCard title="Investment Allocation">
        {allocations.length === 0 ? (
          <p className="text-sm text-slate-400">No investments yet</p>
        ) : (
          <>
            <InvestmentChart
              data={{
                labels: allocations.map((a) => a.label),
                values: allocations.map((a) => a.value),
              }}
            />
          </>
        )}
      </SectionCard>
    </div>
  )
}

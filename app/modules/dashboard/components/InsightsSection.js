import SectionCard from './SectionCard'

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

export default function InsightsSection() {
  return (
    <SectionCard title="AI Insights" action={<span className="text-sm">🤖</span>}>
      <div className="space-y-3">
        {insights.map((insight) => (
          <article key={insight.title} className="rounded-lg border-l-2 border-cyan-400/60 bg-cyan-500/5 p-3">
            <p className="text-sm font-semibold text-white">
              <span className="mr-2">{insight.icon}</span>
              {insight.title}
            </p>
            <p className="mt-1 text-xs text-slate-300">{insight.description}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}

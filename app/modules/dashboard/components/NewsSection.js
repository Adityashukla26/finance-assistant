import SectionCard from './SectionCard'

const news = [
  {
    title: 'Fed Holds Rates Steady, Signals Potential Cuts Later This Year',
    source: 'Financial Times',
    time: '2h',
    snippet:
      'The Fed kept rates unchanged and indicated possible cuts later this year depending on inflation progress.',
  },
  {
    title: 'Tech Stocks Rally as AI Investments Show Promise',
    source: 'Bloomberg',
    time: '4h',
    snippet: 'AI-focused investments helped tech indices rebound after a dip earlier this quarter.',
  },
  {
    title: 'New Tax Benefits for Retirement Savers Starting Next Year',
    source: 'WSJ',
    time: '6h',
    snippet:
      'Legislative changes introduce incentives for increasing retirement contributions, experts say.',
  },
  {
    title: 'Real Estate Market Shows Signs of Stabilization',
    source: 'CNBC',
    time: '8h',
    snippet:
      'Housing prices are leveling off in many urban areas after a period of correction, analysts report.',
  },
]

export default function NewsSection() {
  return (
    <SectionCard title="Financial News" action={<button className="text-sm">🔄</button>}>
      <div className="space-y-3">
        {news.map((item) => (
          <article key={item.title} className="rounded-lg border-l-2 border-cyan-400/60 bg-cyan-500/5 p-3">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              <span className="whitespace-nowrap rounded bg-black/20 px-2 py-0.5 text-[10px] text-slate-300">
                {item.source} · {item.time}
              </span>
            </div>
            <p className="text-xs text-slate-300">{item.snippet}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}

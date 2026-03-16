const tickerItems = [
  { symbol: 'AAPL', price: '$182.63', change: '+1.2%' },
  { symbol: 'MSFT', price: '$337.41', change: '+0.8%' },
  { symbol: 'TSLA', price: '$245.18', change: '-2.1%' },
  { symbol: 'GOOGL', price: '$138.21', change: '+0.5%' },
  { symbol: 'AMZN', price: '$145.80', change: '+1.7%' },
  { symbol: 'NVDA', price: '$495.22', change: '+3.4%' },
  { symbol: 'META', price: '$328.74', change: '+1.9%' },
  { symbol: 'NFLX', price: '$385.91', change: '-0.6%' },
]

function TickerItem({ item }) {
  return (
    <div className="text-xs text-slate-200 whitespace-nowrap">
      <span className="mr-2 font-semibold">{item.symbol}</span>
      <span className="mr-2">{item.price}</span>
      <span className={item.change.startsWith('+') ? 'text-emerald-300' : 'text-rose-300'}>
        {item.change}
      </span>
    </div>
  )
}

export default function StockTicker() {
  return (
    <div className="overflow-hidden border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-2">
      <div className="flex items-center gap-6 ticker-animation">
        {/* Duplicate items twice for seamless infinite scroll */}
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <TickerItem key={`${item.symbol}-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}

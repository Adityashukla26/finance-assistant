export default function SectionCard({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-md card-hover ${className}`}>
      {(title || subtitle || action) && (
        <header className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

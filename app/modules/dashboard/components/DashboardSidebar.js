'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', href: '/dashboard' },
  { id: 'profile', icon: '👤', label: 'Profile', href: '/profile' },
  { id: 'stocks', icon: '📈', label: 'Stock Market', href: '/stocks' },
  { id: 'wallet', icon: '💳', label: 'Wallet', href: '/wallet' },
  { id: 'investments', icon: '💰', label: 'Investments', href: '/dashboard' },
  { id: 'loans', icon: '🏦', label: 'Loans', href: '/dashboard' },
]

export default function DashboardSidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-60 shrink-0 transform flex-col border-r border-white/10 bg-slate-900/95 p-4 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:static lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex overflow-y-auto`}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="mb-4 ml-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white hover:bg-white/10 lg:hidden"
          type="button"
        >
          ✕
        </button>

        <h2 className="mb-5 text-xl font-bold text-cyan-300">FinTrack</h2>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-cyan-500/15 text-white' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 shrink-0">
          <p className="text-sm font-medium text-white">John Doe</p>
          <p className="text-xs text-slate-400">Premium Member</p>
        </div>
      </aside>
    </>
  )
}

'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          <span className="gradient-text">Zenith Finance</span>
        </h1>
        <nav className="hidden md:flex space-x-8">
          <a
            href="#opportunity"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Financial Planning
          </a>
          <a
            href="#solution"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Our Services
          </a>
          <a
            href="#demo"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            AI Assistant
          </a>
          <a
            href="#blueprint"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Roadmap
          </a>
          <a
            href="#register-form"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Get Started
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-slate-700 font-semibold px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}

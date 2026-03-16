'use client'

import { useState } from 'react'
import ConversationalCoach from './ConversationalCoach'
import TaxSimulator from './TaxSimulator'

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState('coach')

  return (
    <section id="demo" className="section bg-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-3 md:px-4 lg:px-6">
        <div className="text-center mb-2 md:mb-4 lg:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Zenith AI in Action ✨
          </h2>
          <p className="mt-2 md:mt-3 lg:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-600 px-2 md:px-4">
            Experience our AI's capabilities firsthand. This is a live demo
            powered by the Gemini API.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-lg p-2 md:p-3 lg:p-6">
          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row border-b border-slate-200 mb-4">
            <button
              onClick={() => setActiveTab('coach')}
              className={`tab-button flex-1 py-3 px-2 md:px-4 font-semibold rounded-t-lg transition-colors text-sm md:text-base mb-1 sm:mb-0 ${
                activeTab === 'coach' ? 'active' : ''
              }`}
            >
              <span className="hidden sm:inline">Conversational Coach</span>
              <span className="sm:hidden">AI Coach</span>
            </button>
            <button
              onClick={() => setActiveTab('tax')}
              className={`tab-button flex-1 py-3 px-2 md:px-4 font-semibold rounded-t-lg transition-colors text-sm md:text-base ${
                activeTab === 'tax' ? 'active' : ''
              }`}
            >
              <span className="hidden sm:inline">Tax Optimization Simulator</span>
              <span className="sm:hidden">Tax Simulator</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className={`tab-content ${activeTab === 'coach' ? 'active' : ''}`}>
            <ConversationalCoach />
          </div>
          <div className={`tab-content ${activeTab === 'tax' ? 'active' : ''}`}>
            <TaxSimulator />
          </div>
        </div>
      </div>
    </section>
  )
}

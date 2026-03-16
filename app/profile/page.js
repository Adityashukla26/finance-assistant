'use client'

import { useState } from 'react'
import ProtectedRoute from '../modules/auth/components/ProtectedRoute'
import DashboardSidebar from '../modules/dashboard/components/DashboardSidebar'
import DashboardTopBar from '../modules/dashboard/components/DashboardTopBar'
import SectionCard from '../modules/dashboard/components/SectionCard'
import useSession from '../modules/auth/hooks/useSession'
import useAccountData from '../modules/dashboard/hooks/useAccountData'

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user } = useSession()
  const { data } = useAccountData()
  const [isEditing, setIsEditing] = useState(false)

  const getInitials = (email) => {
    if (!email) return 'U'
    const name = email.split('@')[0]
    return name.slice(0, 2).toUpperCase()
  }

  const profileStats = [
    { label: 'Total Investments', value: `₹${((data?.totalInvestments || 180000) / 1000).toFixed(0)}k` },
    { label: 'Portfolio Growth', value: '+23.4%' },
    { label: 'Active Goals', value: '5' },
  ]

  const personalInfo = [
    { label: 'Email', value: user?.email || 'user@example.com' },
    { label: 'Phone', value: '+91 98765 43210' },
    { label: 'Location', value: 'Mumbai, India' },
    { label: 'Member Since', value: 'January 2024' },
    { label: 'Account Type', value: 'Premium' },
  ]

  const preferences = [
    { title: 'Email Notifications', description: 'Receive email updates', enabled: true },
    { title: 'SMS Alerts', description: 'Get SMS for important alerts', enabled: false },
    { title: 'Market Updates', description: 'Daily market summary', enabled: true },
    { title: 'Investment Tips', description: 'Weekly investment recommendations', enabled: true },
  ]

  const securitySettings = [
    { label: 'Two-Factor Authentication', value: 'Enabled', status: 'success' },
    { label: 'Last Password Change', value: '15 days ago', status: 'warning' },
    { label: 'Active Sessions', value: '2 devices', status: 'info' },
  ]

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 text-white">
        <div className="flex h-screen">
          <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="flex flex-1 flex-col overflow-hidden">
            <DashboardTopBar onMenuClick={() => setIsSidebarOpen(true)} />

            <div className="flex-1 overflow-y-auto p-4">
              {/* Profile Header */}
              <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg backdrop-blur-lg">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-4xl font-bold shadow-lg">
                      {getInitials(user?.email)}
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg transition-transform hover:scale-110">
                      ✏️
                    </button>
                  </div>

                  <div className="flex-1">
                    <h1 className="mb-2 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-4xl font-bold text-transparent">
                      {user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="mb-4 text-xl text-slate-400">Premium Member</p>

                    <div className="flex gap-8">
                      {profileStats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                          <p className="text-sm text-slate-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105"
                    >
                      {isEditing ? 'Save Profile' : 'Edit Profile'}
                    </button>
                    <button className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold transition-all hover:bg-white/10">
                      Settings
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Personal Information */}
                <SectionCard
                  title="Personal Information"
                  action={
                    <button className="text-cyan-400 transition-colors hover:text-cyan-300">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  }
                >
                  <div className="space-y-4">
                    {personalInfo.map((info) => (
                      <div key={info.label} className="flex justify-between border-b border-white/5 pb-3">
                        <p className="text-slate-400">{info.label}</p>
                        <p className="font-semibold">{info.value}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* Security Settings */}
                <SectionCard
                  title="Security Settings"
                  action={
                    <button className="text-cyan-400 transition-colors hover:text-cyan-300">
                      Manage
                    </button>
                  }
                >
                  <div className="space-y-4">
                    {securitySettings.map((setting) => (
                      <div key={setting.label} className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div>
                          <p className="font-medium">{setting.label}</p>
                          <p className="text-sm text-slate-400">{setting.value}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            setting.status === 'success'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : setting.status === 'warning'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          {setting.status === 'success' ? '✓ Active' : setting.status === 'warning' ? '⚠ Review' : 'ℹ Info'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full rounded-lg bg-red-500/20 px-4 py-2 font-semibold text-red-400 transition-colors hover:bg-red-500/30">
                    Change Password
                  </button>
                </SectionCard>

                {/* Notification Preferences */}
                <SectionCard title="Notification Preferences" className="lg:col-span-2">
                  <div className="grid gap-4 md:grid-cols-2">
                    {preferences.map((pref) => (
                      <div
                        key={pref.title}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4"
                      >
                        <div>
                          <p className="font-medium">{pref.title}</p>
                          <p className="text-sm text-slate-400">{pref.description}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" defaultChecked={pref.enabled} />
                          <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500 peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

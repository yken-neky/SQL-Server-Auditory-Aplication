'use client'

import Navbar from '@/components/dashboard/Navbar'
import Footer from '@/components/dashboard/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navbar />
      <main className="pt-20 pb-24 container mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  )
} 
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <footer className="fixed bottom-0 w-full bg-slate-900/80 backdrop-blur-sm border-t border-slate-800">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-3">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              isActive('/dashboard') ? 'text-sky-500' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Dashboard</span>
          </Link>

          <Link
            href="/dashboard/connections"
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              isActive('/dashboard/connections') ? 'text-sky-500' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <span className="text-xs font-medium">Conexiones</span>
          </Link>

          <Link
            href="/dashboard/auditory"
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              isActive('/dashboard/auditory') ? 'text-sky-500' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Nueva Auditoría</span>
          </Link>

          <Link
            href="/dashboard/reports"
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              isActive('/dashboard/reports') ? 'text-sky-500' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium">Reportes</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              isActive('/dashboard/profile') ? 'text-sky-500' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </nav>
      </div>
    </footer>
  )
} 
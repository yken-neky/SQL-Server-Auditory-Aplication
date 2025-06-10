'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { logoutUser, logoutDB } from '@/lib/axios'
import { useUser } from '@/contexts/UserContext'
import { useDBConnection } from '@/contexts/DBConnectionContext'
import { toast } from 'react-hot-toast'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { logout } = useAuth()
  const { user, isLoading } = useUser()
  const { isConnected, setConnected } = useDBConnection()
  const [showDBMenu, setShowDBMenu] = useState(false)

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      toast.success('Sesión cerrada correctamente')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      toast.error('Error al cerrar sesión')
    }
  }

  const handleDisconnectDB = async () => {
    try {
      await logoutDB()
      setConnected(false)
      toast.success('Desconectado de la base de datos')
      setShowDBMenu(false)
    } catch (e) {
      toast.error('Error al desconectar de la base de datos')
    }
  }

  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() || user.username : ''

  return (
    <nav className="fixed w-full bg-slate-900/80 backdrop-blur-sm z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Image src="/icon.svg" alt="Logo" width={40} height={40} />
          <span className="text-sky-500 font-bold text-xl">SQL Auditor</span>
        </Link>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-32 h-6 bg-slate-800 rounded animate-pulse" />
          ) : (
            <span className="text-slate-300 flex items-center gap-2">
              {fullName}
              {isConnected && (
                <div className="relative">
                  <span
                    title="Conexión a SQL Server activa"
                    className="inline-block w-3 h-3 rounded-full bg-green-500 border border-green-300 animate-pulse cursor-pointer"
                    onClick={() => setShowDBMenu((v) => !v)}
                  ></span>
                  {showDBMenu && (
                    <div className="absolute right-0 mt-2 w-82 rounded-lg bg-slate-900 border border-slate-800 shadow-lg py-1 animate-fade-in z-50">
                      <button
                        onClick={handleDisconnectDB}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Desconectar de la base de datos
                      </button>
                    </div>
                  )}
                </div>
              )}
            </span>
          )}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-900 border border-slate-800 shadow-lg py-1 animate-fade-in">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mi Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
'use client'

import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'

export default function ProfilePage() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Breadcrumb 
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Perfil' }
        ]} 
      />
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-white">Perfil de Usuario</h1>
            <Link
              href="/dashboard/profile/edit"
              className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-400 transition-colors"
            >
              Editar Perfil
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Usuario
              </label>
              <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm">
                {user?.username}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Correo Electrónico
              </label>
              <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm">
                {user?.email}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Nombre
                </label>
                <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm">
                  {user?.first_name || '-'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Apellido
                </label>
                <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm">
                  {user?.last_name || '-'}
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Link
                href="/dashboard/profile/change-password"
                className="flex-1 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-md hover:bg-slate-600 transition-colors text-center"
              >
                Cambiar Contraseña
              </Link>
              
              <button
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-400 transition-colors"
              >
                Desactivar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
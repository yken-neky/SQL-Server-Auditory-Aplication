'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header/Nav */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/icon.svg" alt="Logo" width={40} height={40} />
            <span className="text-sky-500 font-bold text-xl">SQL Auditor</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:text-white transition-colors">
              Mi Perfil
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bienvenido a SQL Auditor
          </h1>
          <p className="text-slate-300 text-lg">
            Comienza a auditar la seguridad de tus servidores SQL Server
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Nueva Auditoría</h3>
            <p className="text-slate-300 mb-6">
              Inicia una nueva auditoría de seguridad en tu servidor SQL
            </p>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">
              Comenzar Auditoría
            </button>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Historial</h3>
            <p className="text-slate-300 mb-6">
              Revisa los resultados de tus auditorías anteriores
            </p>
            <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
              Ver Historial
            </button>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Documentación</h3>
            <p className="text-slate-300 mb-6">
              Aprende más sobre los controles de seguridad CIS
            </p>
            <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
              Ver Documentación
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h4 className="text-lg font-medium text-slate-300 mb-2">
              Auditorías Realizadas
            </h4>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h4 className="text-lg font-medium text-slate-300 mb-2">
              Servidores Auditados
            </h4>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h4 className="text-lg font-medium text-slate-300 mb-2">
              Última Puntuación
            </h4>
            <p className="text-3xl font-bold text-white">-</p>
          </div>
        </div>
      </div>
    </main>
  )
} 
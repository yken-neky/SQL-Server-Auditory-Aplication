'use client'

import { useUser } from '@/hooks/useUser'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchConnectionAmountUser, fetchAuditoryAmountUser, fetchLastAuditoryPercentageUser, fetchConnectionLogListUser } from '@/lib/axios'
import Breadcrumb from '@/components/Breadcrumb'

interface ConnectionAmountResponse {
  connectionTotal: number
}

interface AuditoryAmountResponse {
  auditTotal: number
}

interface PercentageResponse {
  percentage: number
}

interface Stats {
  connections: number
  audits: number
  reports: number
  percentage: number
}

interface ConnectionLog {
  id: number
  server: string
  db_user: string
  status: 'connected' | 'disconnected' | 'reconnected'
  timestamp: string
}

export default function DashboardPage() {
  const { user, isLoading: userLoading } = useUser()
  const [stats, setStats] = useState<Stats>({
    connections: 0,
    audits: 0,
    reports: 0,
    percentage: 0
  })
  const [recentConnections, setRecentConnections] = useState<ConnectionLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [connectionsRes, auditsRes, percentageRes, logsRes] = await Promise.all([
          fetchConnectionAmountUser(),
          fetchAuditoryAmountUser(),
          fetchLastAuditoryPercentageUser(),
          fetchConnectionLogListUser()
        ])
        
        const connections = connectionsRes.data as ConnectionAmountResponse
        const audits = auditsRes.data as AuditoryAmountResponse
        const percentage = percentageRes.data as PercentageResponse
        
        setStats({
          connections: connections.connectionTotal,
          audits: audits.auditTotal,
          reports: audits.auditTotal, // Asumimos que cada auditoría tiene un reporte
          percentage: percentage.percentage
        })

        // Obtener las últimas 5 conexiones
        setRecentConnections((logsRes.data as ConnectionLog[]).slice(-5).reverse())
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (userLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Breadcrumb 
        items={[
          { label: 'Dashboard' }
        ]} 
      />
      
      <h1 className="text-3xl font-bold text-white mb-6">
        Bienvenido, {user?.first_name || user?.username}
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Conexiones */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Conexiones</h2>
              <p className="text-slate-400">Gestiona tus conexiones a SQL Server</p>
            </div>
            <span className="text-4xl font-bold text-sky-500">{stats.connections}</span>
          </div>
          <div className="mt-6">
            <Link 
              href="/dashboard/connections"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              <span>Ver Historial</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Auditorías */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Auditorías</h2>
              <p className="text-slate-400">Revisa tus auditorías recientes</p>
            </div>
            <span className="text-4xl font-bold text-sky-500">{stats.audits}</span>
          </div>
          <div className="mt-6">
            <Link 
              href="/dashboard/auditory"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-colors"
            >
              <span>Nueva Auditoría</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Criticidad */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Criticidad</h2>
              <p className="text-slate-400">Última auditoría realizada</p>
            </div>
            <span className={`text-4xl font-bold ${
              stats.percentage < 25 ? 'text-sky-500' : 
              stats.percentage < 50 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>{stats.percentage}%</span>
          </div>
          <div className="mt-6">
            <Link 
              href="/dashboard/reports"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              <span>Ver Reportes</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabla de conexiones recientes */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Conexiones Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Servidor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario DB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha/Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {recentConnections.map((log, index) => (
                <tr key={log.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{log.server}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{log.db_user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      {
                        connected: 'bg-green-100 text-green-800',
                        disconnected: 'bg-red-100 text-red-800',
                        reconnected: 'bg-blue-100 text-blue-800',
                      }[log.status] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 
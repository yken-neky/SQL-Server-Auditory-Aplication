'use client'

import { useState, useEffect } from 'react'
import { fetchConnectionLogListUser } from '@/lib/axios'
import Breadcrumb from '@/components/Breadcrumb'

interface ConnectionLog {
  id: number
  server: string
  db_user: string
  status: 'connected' | 'disconnected' | 'reconnected'
  timestamp: string
}

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<ConnectionLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchConnections() {
      try {
        const response = await fetchConnectionLogListUser()
        setConnections(response.data)
      } catch (error) {
        console.error('Error al cargar las conexiones:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConnections()
  }, [])

  if (isLoading) {
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
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Conexiones' }
        ]} 
      />
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Historial de Conexiones</h1>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Servidor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario DB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha/Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {connections.map((connection) => (
                <tr key={connection.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {connection.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {connection.server}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {connection.db_user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      {
                        connected: 'bg-green-100 text-green-800',
                        disconnected: 'bg-red-100 text-red-800',
                        reconnected: 'bg-blue-100 text-blue-800',
                      }[connection.status] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {connection.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {new Date(connection.timestamp).toLocaleString()}
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
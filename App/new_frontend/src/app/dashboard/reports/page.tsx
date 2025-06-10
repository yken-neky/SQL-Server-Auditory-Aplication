'use client'

import { useState, useEffect } from 'react'
import { fetchAuditoryLogListUser } from '@/lib/axios' // Asegúrate de tener este método
import Breadcrumb from '@/components/Breadcrumb'
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface AuditoryLog {
  id: number
  user: string | { username: string }
  type: 'Completa' | 'Parcial'
  results?: { id: number, control: number, result: string }[]
  timestamp: string
  server: string | { server: string }
  criticidad: number // porcentaje de criticidad
}

export default function ReportsPage() {
  const [reports, setReports] = useState<AuditoryLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetchAuditoryLogListUser();
        setReports(response.data as AuditoryLog[]);
      } catch (error) {
        console.error('Error al cargar los reportes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReports()
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
          { label: 'Reportes de Auditoría' }
        ]} 
      />
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Resultados de Auditorías</h1>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Servidor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Controles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Criticidad (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {reports.map((report) => {
                const username = typeof report.user === 'string' ? report.user : report.user?.username;
                const serverName = typeof report.server === 'string' ? report.server : report.server?.server;
                const controlsCount = Array.isArray(report.results) ? report.results.length : 0;
                return (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-700/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/dashboard/reports/${report.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.type === 'Completa'
                            ? 'bg-sky-600 text-white border border-sky-300 shadow'
                            : 'bg-yellow-400 text-slate-900 border border-yellow-600'
                        }`}
                      >
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{serverName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(report.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{controlsCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-bold">{report.criticidad}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
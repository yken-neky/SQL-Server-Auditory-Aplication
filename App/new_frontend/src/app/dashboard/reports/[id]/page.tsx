"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchAuditoryLogDetail, fetchControlInfo } from "@/lib/axios";
import { use } from "react";

interface ControlInfo {
  id: number;
  idx: number;
  chapter: string;
  name: string;
  description: string;
  impact: string;
  good_config: string;
  bad_config: string;
  ref: string;
}

interface AuditoryLogDetail {
  id: number;
  user: string;
  type: string;
  timestamp: string;
  server: string;
  criticidad: number;
  control_results: Record<string, string>;
}

export default function AuditoryLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [log, setLog] = useState<AuditoryLogDetail | null>(null);
  const [controls, setControls] = useState<ControlInfo[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const logRes = await fetchAuditoryLogDetail(id);
        setLog(logRes.data);
        // Obtener todos los controles relacionados
        const controlIds = Object.keys(logRes.data.control_results);
        const controlsRes = await fetchControlInfo(controlIds);
        setControls(controlsRes.data);
      } catch (e) {
        // Manejo de error
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Agrupar controles por capítulo y ordenar por idx
  const grouped = controls.reduce((acc, control) => {
    if (!acc[control.chapter]) acc[control.chapter] = [];
    acc[control.chapter].push(control);
    return acc;
  }, {} as Record<string, ControlInfo[]>);
  Object.values(grouped).forEach(arr => arr.sort((a, b) => a.idx - b.idx));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }
  if (!log) return <div className="text-white">No encontrado</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reportes de Auditoría", href: "/dashboard/reports" },
          { label: `Detalle #${log.id}` },
        ]}
      />
      <h1 className="text-2xl font-bold text-white mb-6">Detalle de Auditoría #{log.id}</h1>
      <div className="mb-8 text-slate-300">
        <div><b>Usuario:</b> {log.user}</div>
        <div><b>Servidor:</b> {log.server}</div>
        <div><b>Tipo:</b> {log.type}</div>
        <div><b>Fecha:</b> {new Date(log.timestamp).toLocaleString()}</div>
        <div><b>Criticidad:</b> {log.criticidad}%</div>
      </div>
      {Object.keys(grouped).sort().map(chapter => (
        <div key={chapter} className="mb-8">
          <h2 className="text-xl font-semibold text-sky-400 mb-4">Capítulo {chapter}</h2>
          <div className="space-y-2">
            {grouped[chapter].map(control => {
              const result = log.control_results[control.idx];
              const isOpen = expanded[`${chapter}-${control.idx}`];
              return (
                <div key={control.idx} className="bg-slate-800 rounded-lg border border-slate-700">
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-white focus:outline-none"
                    onClick={() => setExpanded(exp => ({ ...exp, [`${chapter}-${control.idx}`]: !isOpen }))}
                  >
                    <span>
                      <span className="font-bold mr-2">{control.idx}.</span>
                      {control.name}
                      <span className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${
                        result === 'TRUE' ? 'bg-green-500 text-white' : result === 'FALSE' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-slate-900'
                      }`}>
                        {result}
                      </span>
                    </span>
                    <span>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-slate-300">
                      <div className="mb-2"><b>Descripción:</b> {control.description}</div>
                      <div className="mb-2"><b>Impacto:</b> {control.impact}</div>
                      <div className="mb-2"><b>Configuración Correcta:</b> {control.good_config}</div>
                      <div className="mb-2"><b>Configuración Incorrecta:</b> {control.bad_config}</div>
                      <div className="mb-2"><b>Referencia:</b> <a href={control.ref} className="text-sky-400 underline" target="_blank" rel="noopener noreferrer">{control.ref}</a></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

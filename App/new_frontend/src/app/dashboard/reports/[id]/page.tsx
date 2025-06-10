"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchAuditoryLogDetail, fetchControlInfo, fetchAuditoryLogResults } from "@/lib/axios";
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

interface AuditoryLogResult {
  id: number;
  control: number;
  result: string;
}

export default function AuditoryLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  //const [log, setLog] = useState<AuditoryLogDetail | null>(null);
  const [results, setResults] = useState<AuditoryLogResult[]>([]);
  const [controls, setControls] = useState<ControlInfo[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        //const logRes = await fetchAuditoryLogDetail(Number(id));
        //setLog(logRes.data as AuditoryLogDetail);
        // Obtener resultados de controles asociados a la auditoría
        const resultsRes = await fetchAuditoryLogResults(Number(id));
        setResults(resultsRes.data as AuditoryLogResult[]);
        // Obtener info de los controles involucrados
        const controlIds = (resultsRes.data as AuditoryLogResult[]).map((r) => r.control);
        // fetchControlInfo no acepta parámetros, así que filtramos después
        const controlsRes = await fetchControlInfo();
        setControls((controlsRes.data as ControlInfo[]).filter(c => controlIds.includes(c.id)));
      } catch (e) {
        // Manejo de error
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Mapear resultados a controles
  const controlMap = controls.reduce((acc, c) => { acc[c.id] = c; return acc; }, {} as Record<number, ControlInfo>);
  // Agrupar controles por capítulo y ordenar por idx
  const grouped = results.reduce((acc, result) => {
    const control = controlMap[result.control];
    if (!control) return acc;
    if (!acc[control.chapter]) acc[control.chapter] = [];
    acc[control.chapter].push({ ...control, result: result.result });
    return acc;
  }, {} as Record<string, Array<ControlInfo & { result: string }>>);
  Object.values(grouped).forEach(arr => arr.sort((a, b) => a.idx - b.idx));

  // Calcular resumen de resultados
  const total = results.length;
  const correct = results.filter(r => r.result === 'TRUE').length;
  const incorrect = results.filter(r => r.result === 'FALSE').length;
  const manual = results.filter(r => r.result === 'MANUAL').length;
  const percent = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }
  if (!results) return <div className="text-white">No encontrado</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reportes de Auditoría", href: "/dashboard/reports" },
          { label: `Detalles` },
        ]}
      />
      <h1 className="text-2xl font-bold text-white mb-6">Detalle de Auditoría</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 rounded-xl p-6 shadow-lg border border-cyan-700 flex flex-col items-center">
          <span className="text-cyan-200 font-semibold">Correctos</span>
          <span className="text-3xl font-black text-green-400">{correct}</span>
          <span className="text-cyan-100">{percent(correct)}%</span>
        </div>
        <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-rose-700 rounded-xl p-6 shadow-lg border border-rose-700 flex flex-col items-center">
          <span className="text-rose-200 font-semibold">Incorrectos</span>
          <span className="text-3xl font-black text-red-400">{incorrect}</span>
          <span className="text-rose-100">{percent(incorrect)}%</span>
        </div>
        <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 rounded-xl p-6 shadow-lg border border-yellow-700 flex flex-col items-center">
          <span className="text-yellow-200 font-semibold">Manuales</span>
          <span className="text-3xl font-black text-yellow-400">{manual}</span>
          <span className="text-yellow-100">{percent(manual)}%</span>
        </div>
      </div>
      {Object.keys(grouped).sort().map(chapter => (
        <div key={chapter} className="mb-8">
          <h2 className="text-xl font-semibold text-sky-400 mb-4">Capítulo {chapter}</h2>
          <div className="space-y-2">
            {grouped[chapter].map(control => {
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
                        control.result === 'TRUE' ? 'bg-green-500 text-white' : control.result === 'FALSE' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-slate-900'
                      }`}>
                        {control.result}
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

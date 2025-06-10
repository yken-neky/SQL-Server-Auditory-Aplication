'use client'

import Breadcrumb from '@/components/Breadcrumb'
import LoginDBModal from '@/components/LoginDBModal';
import { useState, useEffect } from 'react';
import { fetchControlInfo, executeFullAudit, executePartialAudit } from '@/lib/axios';
import { useDBConnection } from '@/contexts/DBConnectionContext';
import { useRouter } from 'next/navigation';

export default function AuditoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [controls, setControls] = useState<any[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loadingControls, setLoadingControls] = useState(false);
  const { isConnected } = useDBConnection();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowLogin(!isConnected);
  }, [isConnected]);

  const handlePartialClick = async () => {
    setShowModal(true);
    setLoadingControls(true);
    try {
      // Obtener todos los controles usando fetchControlInfo sin parámetros para traer todos
      const res = await fetchControlInfo();
      setControls(res.data as any[]);
    } finally {
      setLoadingControls(false);
    }
  };

  const handleChapterToggle = (chapter: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chapter]: !prev[chapter] }));
  };

  const handleCheck = (idx: number) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  };

  // Ejecutar auditoría completa
  const handleFullAudit = async () => {
    try {
      const res = await executeFullAudit();
      const auditId = (res.data as { audit_id?: number }).audit_id;
      if (auditId) {
        router.push(`/dashboard/reports/${auditId}`);
      } else {
        alert('Auditoría completa ejecutada, pero no se pudo obtener el ID del informe.');
      }
    } catch (err) {
      alert('Error al ejecutar auditoría completa.');
    }
  };

  // Ejecutar auditoría parcial
  const handlePartialAudit = async () => {
    try {
      const idxs = Array.from(selected);
      const res = await executePartialAudit(idxs);
      setShowModal(false);
      const auditId = (res.data as { audit_id?: number }).audit_id;
      if (auditId) {
        router.push(`/dashboard/reports/${auditId}`);
      } else {
        alert('Auditoría parcial ejecutada, pero no se pudo obtener el ID del informe.');
      }
    } catch (err) {
      alert('Error al ejecutar auditoría parcial.');
    }
  };

  // Agrupar controles por capítulo
  const grouped = controls.reduce((acc, control) => {
    if (!acc[control.chapter]) acc[control.chapter] = [];
    acc[control.chapter].push(control);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 relative">
      {showLogin && (
        <LoginDBModal onClose={() => setShowLogin(false)} />
      )}
      <Breadcrumb 
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Auditoría' }
        ]} 
      />
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Selecciona el tipo de auditoría</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <button
          type="button"
          onClick={handleFullAudit}
          className="block bg-sky-900 border border-sky-600 rounded-lg p-6 shadow hover:scale-105 hover:border-sky-400 transition-transform cursor-pointer text-base md:text-lg text-left"
        >
          <h2 className="text-2xl font-bold text-sky-400 mb-2">Auditoría Completa</h2>
          <p className="text-slate-300 mb-2">Audita el 100% de los controles de seguridad en tu servidor de bases de datos.</p>
          <ul className="text-slate-400 list-disc pl-5 text-base md:text-lg">
            <li>Evalúa todos los parámetros críticos y recomendados</li>
            <li>Recomendado para revisiones periódicas o iniciales</li>
            <li>Resultados detallados y completos</li>
          </ul>
        </button>
        <button type="button" onClick={handlePartialClick} className="block text-left bg-yellow-900 border border-yellow-400 rounded-lg p-6 shadow hover:scale-105 hover:border-yellow-300 transition-transform cursor-pointer text-base md:text-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">Auditoría Parcial</h2>
          <p className="text-slate-300 mb-2">Selecciona parámetros específicos para auditar en tu base de datos.</p>
          <ul className="text-slate-400 list-disc pl-5 text-base md:text-lg">
            <li>Ideal para revisiones rápidas o específicas</li>
            <li>Menor tiempo de ejecución</li>
            <li>Resultados enfocados en tus necesidades</li>
          </ul>
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative border border-slate-700 min-h-[420px]">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-slate-400 hover:text-white text-2xl focus:outline-none">×</button>
            <h2 className="text-xl font-bold text-sky-400 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Selecciona los controles a auditar
            </h2>
            <p className="text-slate-400 mb-4 text-sm">Marca los controles que deseas incluir en la auditoría parcial. Puedes expandir cada capítulo para ver los controles disponibles.</p>
            {loadingControls ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto pr-1">
                {Object.keys(grouped).sort().map(chapter => (
                  <div key={chapter} className="mb-2">
                    <button
                      type="button"
                      onClick={() => handleChapterToggle(chapter)}
                      className="w-full flex justify-between items-center px-3 py-2 bg-slate-800 rounded-lg text-sky-300 font-semibold mb-1 focus:outline-none focus:ring-2 focus:ring-sky-500 transition border border-slate-700 mb-1 ml-[2px]"
                      style={{ marginTop: 2, marginBottom: 2 }}
                    >
                      <span>Capítulo {chapter}</span>
                      <span className="text-xs">{expandedChapters[chapter] ? '▲' : '▼'}</span>
                    </button>
                    {expandedChapters[chapter] && (
                      <div className="pl-3 space-y-1 mt-1">
                        {grouped[chapter].map((control: any) => (
                          <label key={control.idx} className="flex items-center gap-2 cursor-pointer bg-slate-800 hover:bg-slate-700 rounded px-2 my-1 transition">
                            <input
                              type="checkbox"
                              checked={selected.has(control.idx)}
                              onChange={() => handleCheck(control.idx)}
                              className="accent-sky-500 w-4 h-4"
                            />
                            <span className="text-slate-200 text-sm">{control.idx}. {control.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {Object.keys(grouped).length === 0 && (
                  <div className="text-slate-400 text-center py-6">No hay controles disponibles.</div>
                )}
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-1.5 rounded-lg bg-slate-700 text-white hover:bg-slate-600 text-sm font-medium transition">Cancelar</button>
              <button
                className="px-4 py-1.5 rounded-lg bg-sky-500 text-white hover:bg-sky-400 font-semibold text-sm transition disabled:opacity-50"
                disabled={selected.size === 0}
                onClick={handlePartialAudit}
              >
                Auditar seleccionados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
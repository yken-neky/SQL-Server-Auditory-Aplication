import React from "react";

// Datos de prueba simulados
const fakeAuditory = {
  type: "Completa",
  timestamp: "2025-06-07T15:30:00Z",
  server: "192.168.1.10:1433",
  user: "auditor@empresa.com",
  control_results: {
    "1": "TRUE", "2": "TRUE", "3": "TRUE", "4": "TRUE", "5": "TRUE", "6": "FALSE", "7": "TRUE", "8": "TRUE", "9": "TRUE", "10": "MANUAL", "11": "TRUE", "12": "FALSE", "13": "FALSE", "14": "FALSE", "15": "TRUE", "16": "FALSE", "17": "FALSE", "18": "TRUE", "19": "TRUE", "20": "TRUE", "21": "MANUAL", "22": "MANUAL", "23": "MANUAL", "24": "TRUE", "25": "FALSE", "26": "TRUE", "27": "TRUE", "28": "FALSE", "29": "TRUE", "30": "MANUAL", "31": "TRUE", "32": "TRUE", "33": "TRUE", "34": "TRUE", "35": "TRUE", "36": "FALSE", "37": "MANUAL", "38": "FALSE", "39": "TRUE", "40": "TRUE", "41": "TRUE", "42": "FALSE", "43": "TRUE"
  }
};

const fakeControls = [
  // Capítulo 2
  { idx: 1, chapter: "2", name: "Control 1", description: "Descripción del control 1", impact: "Alto", good_config: "OK", bad_config: "Corregir", ref: "https://ref1.com" },
  { idx: 2, chapter: "2", name: "Control 2", description: "Descripción del control 2", impact: "Medio", good_config: "OK", bad_config: "Corregir", ref: "https://ref2.com" },
  // Capítulo 3
  { idx: 3, chapter: "3", name: "Control 3", description: "Descripción del control 3", impact: "Bajo", good_config: "OK", bad_config: "Corregir", ref: "https://ref3.com" },
  // ...agrega más controles de prueba según sea necesario
];

function getSummary(results) {
  const values = Object.values(results);
  const total = values.length;
  const correct = values.filter(v => v === "TRUE").length;
  const incorrect = values.filter(v => v === "FALSE").length;
  const manual = values.filter(v => v === "MANUAL").length;
  return {
    total,
    correct,
    incorrect,
    manual,
    percentCorrect: Math.round((correct / total) * 100),
    percentIncorrect: Math.round((incorrect / total) * 100),
    percentManual: Math.round((manual / total) * 100)
  };
}

function groupByChapter(controls) {
  const chapters = {};
  controls.forEach(ctrl => {
    if (!chapters[ctrl.chapter]) chapters[ctrl.chapter] = [];
    chapters[ctrl.chapter].push(ctrl);
  });
  return chapters;
}

export function AuditoryReport() {
  const summary = getSummary(fakeAuditory.control_results);
  const chapters = groupByChapter(fakeControls);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] py-10 px-2 md:px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-cyan-400 drop-shadow-lg">Resultados de auditoría realizada</h1>
          <div className="flex flex-col md:items-end">
            <span className="text-xs text-cyan-200 uppercase tracking-widest">{fakeAuditory.type} | {new Date(fakeAuditory.timestamp).toLocaleString()}</span>
            <span className="text-xs text-cyan-200">Servidor: <span className="font-bold text-cyan-300">{fakeAuditory.server}</span></span>
            <span className="text-xs text-cyan-200">Usuario: <span className="font-bold text-cyan-300">{fakeAuditory.user}</span></span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 rounded-xl p-6 shadow-lg border border-cyan-700 flex flex-col items-center">
            <span className="text-cyan-200 font-semibold">Correctos</span>
            <span className="text-3xl font-black text-green-400">{summary.correct}</span>
            <span className="text-cyan-100">{summary.percentCorrect}%</span>
          </div>
          <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-rose-700 rounded-xl p-6 shadow-lg border border-rose-700 flex flex-col items-center">
            <span className="text-rose-200 font-semibold">Incorrectos</span>
            <span className="text-3xl font-black text-red-400">{summary.incorrect}</span>
            <span className="text-rose-100">{summary.percentIncorrect}%</span>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 rounded-xl p-6 shadow-lg border border-yellow-700 flex flex-col items-center">
            <span className="text-yellow-200 font-semibold">Manuales</span>
            <span className="text-3xl font-black text-yellow-400">{summary.manual}</span>
            <span className="text-yellow-100">{summary.percentManual}%</span>
          </div>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col items-center">
            <span className="text-slate-200 font-semibold">Total controles</span>
            <span className="text-3xl font-black text-cyan-300">{summary.total}</span>
          </div>
        </div>
        {/* Controles agrupados por capítulo */}
        {Object.entries(chapters).map(([chapter, controls]) => (
          <div key={chapter} className="mb-10">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4 border-b-2 border-cyan-700 pb-1">Capítulo {chapter}</h3>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-cyan-900 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0a192f]">
              <table className="table w-full text-cyan-100">
                <thead>
                  <tr className="bg-cyan-900/80 text-cyan-200">
                    <th className="font-bold">#</th>
                    <th className="font-bold">Nombre</th>
                    <th className="font-bold">Descripción</th>
                    <th className="font-bold">Impacto</th>
                    <th className="font-bold">Resultado</th>
                    <th className="font-bold">Referencia</th>
                  </tr>
                </thead>
                <tbody>
                  {controls.map(ctrl => (
                    <tr key={ctrl.idx} className="hover:bg-cyan-900/30 transition-colors">
                      <td>{ctrl.idx}</td>
                      <td className="font-semibold text-cyan-200">{ctrl.name}</td>
                      <td className="max-w-xs text-cyan-100">{ctrl.description}</td>
                      <td>
                        <span className={
                          ctrl.impact === 'Alto' ? 'badge badge-error' : ctrl.impact === 'Medio' ? 'badge badge-warning' : 'badge badge-info'
                        }>{ctrl.impact}</span>
                      </td>
                      <td>
                        <span className={
                          fakeAuditory.control_results[ctrl.idx]?.toUpperCase() === "TRUE"
                            ? "badge bg-green-600 border-none text-white"
                            : fakeAuditory.control_results[ctrl.idx]?.toUpperCase() === "FALSE"
                            ? "badge bg-red-600 border-none text-white"
                            : "badge bg-yellow-500 border-none text-white"
                        }>
                          {fakeAuditory.control_results[ctrl.idx] || "-"}
                        </span>
                      </td>
                      <td>
                        <a href={ctrl.ref} target="_blank" rel="noopener noreferrer" className="link link-cyan-400 underline underline-offset-2">Referencia</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

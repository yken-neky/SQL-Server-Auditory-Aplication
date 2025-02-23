import { useEffect, useState } from 'react';
import { FetchAuditoryAmountUser, FetchConnectionAmountUser, FetchConnectionLogListUser, FetchLastAuditoryPercentageUser } from '../api/log-reg.api';
import { ReloadComponent } from '../components/DaisyUI/reload';
import { FcList } from 'react-icons/fc';

export function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [conn, setConn] = useState([]);
  const [audit, setAudit] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await FetchConnectionLogListUser();
        response.connections = await FetchConnectionAmountUser();
        response.auditory = await FetchAuditoryAmountUser();
        response.percentage = await FetchLastAuditoryPercentageUser();
        if (!response) throw new Error('Error fetching logs');
  
        const data = response.data.slice(-5).reverse();
        const per = response.percentage;
        const conn = response.connections;
        const audit = response.auditory;
        setLogs(data);
        setPercentage(per.data)
        setAudit(audit.data)
        setConn(conn.data)
        
        console.log(conn)
        console.log(audit)
      } catch (err) {
        console.log(err.message);
      } 
    };

    fetchLogs();
  }, []);

    return (
      <>
        <div className="flex flex-col p-4 w-full bg-stone-200 shadow-md shadow-gray-400 rounded-lg">
          <div>
            <p className="mx-5 mb-2 text-xl text-slate-700 font-bold">Dashboard</p>
            <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200">
                <div className="stat">
                  <div className="stat-title text-lg font-bold text-gray-500">Auditorías Realizadas</div>
                  <div className="stat-value text-slate-200">{audit.auditTotal}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-lg font-bold text-gray-500">Conexiones Realizadas</div>
                  <div className="stat-value text-slate-200">{conn.connectionTotal}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-lg font-bold text-gray-500">Criticidad última auditoría</div>
                  <div className="stat-value text-slate-200">{percentage.percentage}%</div>
                </div>
            </div>
          </div>
            
          <div>
            <hr className="border-stone-400 mt-3"/>
            <div className='flex justify-between items-center'>
              <p className="mx-5 mt-2 text-xl text-slate-700 font-bold">Actividad de conexión a SQL Server</p>
              <div>
                <ReloadComponent/>
                <button className="btn btn-ghost mt-2">
                    <FcList/>
                    Ver más
                </button>
              </div>
            </div>
            <div className="overflow-x-auto mt-2 max-h-72 relative">
              <table className="table bg-base-300 rounded-lg w-full">
                <thead className="sticky-header">
                  <tr className="text-gray-500 font-bold">
                    <th>#</th>
                    <th>Servidor</th>
                    <th>Usuario DB</th>
                    <th>Estado</th>
                    <th>Fecha/Hora</th>
                  </tr>
                </thead>
                <tbody className="text-white font-bold">
                    {logs.map((log, index) => (
                      <tr key={log.id} className='hover:bg-zinc-800/60'>
                        <td className="text-xs">{index + 1}</td>
                        <td className="text-xs">{log.server}</td>
                        <td className="text-xs">{log.db_user || 'Anonymous'}</td>
                        <td className="text-xs">
                          <span
                            className={`badge ${
                              {
                                connected: 'badge-info',      // Azul
                                reconnected: 'badge-success', // Verde
                                disconnected: 'badge-error',  // Rojo
                              }[log.status] || 'badge-warning' // Color por defecto (amarillo/naranja)
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
}

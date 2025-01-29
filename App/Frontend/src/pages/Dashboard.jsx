
export function Dashboard() {

    return (
        <>
            <div className="flex flex-col p-5 w-full bg-stone-200 shadow-md shadow-gray-400 rounded-lg">
              <div>
                <p className="mx-5 mb-2 text-2xl text-slate-700 font-bold">Dashboard</p>
                <hr className="border-stone-400 mb-4"/>
                <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200">
                    <div className="stat">
                      <div className="stat-title text-lg font-bold text-gray-500">Auditorías Realizadas</div>
                      <div className="stat-value text-slate-200">0</div>
                      <div className="stat-desc font-bold text-indigo-400 hover:text-blue-600 hover:cursor-pointer">Ver registro</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-lg font-bold text-gray-500">Servicios disponibles</div>
                      <div className="stat-value text-slate-200">2</div>
                      <div className="stat-desc font-bold text-indigo-400 hover:text-blue-600 hover:cursor-pointer">Acceder</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-lg font-bold text-gray-500">Criticidad última auditoría</div>
                      <div className="stat-value text-slate-200">x%</div>
                      <div className="stat-desc font-bold text-indigo-400 hover:text-blue-600 hover:cursor-pointer">Ver resultados</div>
                    </div>
                </div>
              </div>

              <div>
                <div className="overflow-x-auto mt-8">
                  <p className="mx-5 mb-2 text-2xl text-slate-700 font-bold">Actividad</p>
                  <hr className="border-stone-400 mb-4"/>
                  <table className="table bg-base-300 rounded-lg">
                    {/* head */}
                    <thead className="text-gray-500 font-bold">
                        <tr>
                          <th></th>
                          <th>Usuario</th>
                          <th>Acción</th>
                          <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody className="text-white font-bold">
                        {/* row 1 */}
                        <tr className="bg-zinc-800/60">
                          <th>1</th>
                          <td>yken</td>
                          <td>Auditoría Completa</td>
                          <td>CODE 200 OK</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                          <th>2</th>
                          <td>yken</td>
                          <td>Desconexión</td>
                          <td>CODE 200 OK</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                          <th>3</th>
                          <td>Anonymous User</td>
                          <td>Perfil</td>
                          <td>CODE 403 Unauthorized</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </>
    )
}

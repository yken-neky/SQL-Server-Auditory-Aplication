
export function Dashboard() {

    return (
        <>
            <p className="m-5 text-2xl text-slate-700 font-bold">Dashboard</p>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title text-lg font-bold">Auditorías Realizadas</div>
                  <div className="stat-value">0</div>
                  <div className="stat-desc font-bold text-red-300">Ver más</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-lg font-bold">Usuarios Conectados</div>
                  <div className="stat-value">0</div>
                  <div className="stat-desc font-bold text-red-300">Ver más</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-lg font-bold">Otro Parámetro</div>
                  <div className="stat-value">X</div>
                  <div className="stat-desc font-bold text-red-300">Ver más</div>
                </div>
            </div>

            <div className="overflow-x-auto bg-base-300 rounded-lg my-10">
            <table className="table">
                {/* head */}
                <thead className="text-gray-500">
                    <tr>
                      <th></th>
                      <th>Usuario</th>
                      <th>Acción</th>
                      <th>Descripción</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {/* row 1 */}
                    <tr className="bg-base-200">
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
        </>
    )
}

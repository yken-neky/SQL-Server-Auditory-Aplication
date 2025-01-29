/* import { LogOutDB } from "../../api/log-reg.api";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast"; */
import { FcCheckmark } from "react-icons/fc";

export function HomeDB() {
  /* const navigate = useNavigate();
  const handleLogOut =  async () => {
    await LogOutDB();
    navigate('/Dashboard')
    toast.success("Desconexión exitosa de SQL Server 2022.")
  } */

  return (
    <>
    <div className="w-4/5 p-5 shadow-md shadow-gray-400 rounded-lg bg-stone-200">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-md font-semibold text-indigo-600">Bienvenido al servicio de Auditoría para SQL Server 2022</h2>
        <p className="mt-2 text-xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
          Seleccione el tipo de auditoría a realizar
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-md/8">
          Según el tipo de auditoría que seleccione es la cantidad de controles que le puede ejecutar a su servidor de bases de datos SQL Server para comprobar su ciberseguridad.
        </p>
        <p className="mx-auto mt-1 max-w-2xl text-center text-md font-bold text-pretty text-gray-900 sm:text-md/8">
          Recomendamos realizar una auditoría completa la primera vez que se use el servicio
        </p>
      </div>
      <div className="flex justify-around mt-5">
        <div className="w-2/5">
          <div className="collapse bg-base-100">
            <input type="checkbox" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium text-white text-center">Múltiple</div>
            <div className="collapse-content">
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #1 de auditoría múltiple</p>
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #2 de auditoría múltiple</p>
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #3 de auditoría múltiple</p>
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #4 de auditoría múltiple</p>
              <button 
                className="w-full inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
                  Ir
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/5">
        <div className="collapse bg-base-100">
            <input type="checkbox" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium text-white text-center">Completa</div>
            <div className="collapse-content">
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #1 de auditoría completa</p>
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #2 de auditoría completa</p>
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #3 de auditoría completa</p>
              <p className="text-gray-300 flex"><FcCheckmark className="mr-2"/>Beneficio #4 de auditoría completa</p>
              <button 
                className="w-full inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
                  Ir
              </button>
            </div>
          </div>
        </div>        
      </div>
    </div>
    </>
  )
}


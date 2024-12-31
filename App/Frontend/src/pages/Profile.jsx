// UserProfile.js
import { useUser } from '../contexts/UserContext';

export function UserProfile() {
  const userData = useUser();

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/5 font-bold text-gray-900">Perfil de Usuario</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Información personal</p>
      </div>
      {userData && (
        <>
        <div className="mt-4 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Usuario</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">{userData.username}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Primer Nombre</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">{userData.first_name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Segundo Nombre</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">{userData.last_name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Correo Electrónico</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">{userData.email}</dd>
            </div>
          </dl>
        </div>
        </>)}
        <div className="flex flex-col lg:flex-row justify-center items-centerspace-y-4 lg:space-y-0 lg:space-x-4">
          <button className="btn">Editar Perfil</button>
          <button className="btn">Cambiar Contraseña</button>
          <button className="btn">Eliminar Perfil</button>
        </div>
    </div>
  )
}

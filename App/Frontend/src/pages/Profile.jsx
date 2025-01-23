import { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { getUserProfile } from '../api/log-reg.api';
import { Link } from 'react-router-dom';

export function UserProfile() {
  const { user, setUser, loading, error } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchUserProfile();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error al cargar el perfil del usuario</div>;
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg/5 font-bold text-gray-900">Perfil de Usuario</h3>
        <p className="mt-1 max-w-2xl text-sm/6 font-semibold text-gray-600">Información personal</p>
      </div>
      {user && (
        <>
        <div className="mt-4 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Usuario</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.username}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Primer Nombre</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.first_name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Segundo Nombre</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.last_name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Correo Electrónico</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
            </div>
          </dl>
        </div>
        </>
      )}
      <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <Link to="/edit_profile"><button className="btn">Editar Perfil</button></Link>
        <button className="btn">Cambiar Contraseña</button>
        <button className="btn hover:bg-red-900 hover:text-gray-300 hover:hover:border-gray-300">Eliminar Perfil</button>
      </div>
    </div>
  );
}

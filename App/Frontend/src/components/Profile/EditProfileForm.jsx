import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../../contexts/UserContext';
import { updateUserProfile, getUserProfile } from '../../api/log-reg.api';

export function EditProfileForm() {
  const { user, setUser } = useUser();  // Desestructuramos user y setUser del contexto
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setServerErrors({});
    try {
      await updateUserProfile(data);
      const updatedUserData = await getUserProfile();
      setUser(updatedUserData.data);  // Actualiza el estado del usuario en el contexto
      navigate('/profile');
      toast.success('Profile edited successfully');
    } catch (error) {
      if (error.response && error.response.data) {
        setServerErrors(error.response.data);
      }
    }
  };

  const handleInputChange = () => {
    setServerErrors({});
  };

  return (

    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg/6 font-bold text-gray-900">Perfil de Usuario</h3>
        <p className="mt-1 max-w-2xl font-semibold text-sm/6 text-gray-600">Actualizando perfil...</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Usuario</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                {...register('username', { required: 'Este campo es obligatorio' })}
                onChange={handleInputChange}
                className="input text-white text-sm input-bordered input-primary w-full max-w-full"
                />
                {errors.username && <span className='text-red-500 font-semibold font text-sm'>{errors.username.message}</span>}
              </dd>
            </div>
            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Primer Nombre</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                {...register('first_name', { required: 'Este campo es obligatorio' })}
                onChange={handleInputChange}
                className="input text-white text-sm input-bordered input-primary w-full max-w-full"
                />
                {errors.first_name && <span className='text-red-500 font-semibold font text-sm'>{errors.first_name.message}</span>}
              </dd>
            </div>
            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Segundo Nombre</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                {...register('last_name')}
                onChange={handleInputChange}
                className="input text-white text-sm input-bordered input-primary w-full max-w-full"
                />
              </dd>
            </div>
            <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-bold text-gray-900">Correo Electrónico</dt>
              <dd className="mt-1 text-sm/6 text-gray-800 sm:col-span-2 sm:mt-0">
              <input
                type="email"
                {...register('email', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Correo electrónico no válido'
                  }
                })}
                onChange={handleInputChange}
                className="input text-white text-sm input-bordered input-primary w-full max-w-full"
                />
              {errors.email && <span className='text-red-500 font-semibold font text-sm'>{errors.email.message}</span>}
              </dd>
              {serverErrors.error && <span className='text-red-500 font-semibold font text-sm flex justify-center mt-3'>{serverErrors.error}</span>}
            </div>
          </dl>
        </div>
      <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <button className="btn" type='submit' >Editar Perfil</button>
      </div>
      </form>
    </div>



  );
}

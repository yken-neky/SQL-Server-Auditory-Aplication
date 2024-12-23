import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { LoginUser } from '../api/log-reg.api.js';
import { useAuth } from '../contexts/AuthContext';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setServerErrors({}); // Restablecer errores del servidor antes de enviar la petición
    try {
      const response = await LoginUser(data);
      const { token } = response.data;
      login(token); 
      navigate("/dashboard");
      toast.success('Log-in successfully');
    } catch (error) {
      if (error.response && error.response.data) {
        setServerErrors(error.response.data);
      }
    }
  }

  const handleInputChange = () => {
    setServerErrors({}); // Restablecer errores del servidor al actualizar el input
  }

  return (
    <div className='h-screen grid place-items-center' id='login'>
      <div className='max-w-xl mx-auto bg-gray-200 p-8 rounded-lg'>
        <div className='grid place-items-center'>
          <div>
          <img src="/icon.png" className='mb-1 w-20'/>
          </div>
          <div>
          <p className='font-bold text-xs'>S.H.I.E.L.D.</p>
          </div>
        </div>
        <div className='max-w-xs mx-auto my-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className='font-bold text-sm'>Usuario:</label>
              <input type="text" {...register('username', { required: true })} onChange={handleInputChange} 
                className='bg-slate-300 p-2 rounded-lg block w-full'
              />
              {errors.username && <span className='text-sm'>Este campo es requerido</span>}
            </div>
            <div>
              <label className='font-bold text-sm'>Contraseña:</label>
              <input type="password" {...register('password', { required: true })} onChange={handleInputChange} 
                className='bg-slate-300 p-2 rounded-lg block w-full'
              />
              {errors.password && <span className='text-sm'>Este campo es requerido</span>}
            </div>
            <hr className='border-black mt-3'/>
            <button className="bg-indigo-400 p-2 rounded-lg w-full block mt-3 font-bold text-sm text-white hover:bg-indigo-300" type="submit">Iniciar sesión</button>
            {serverErrors.error && <span className='text-red-500 font-semibold font text-sm flex justify-center mt-3'>{serverErrors.error}</span>}
          </form>
        </div>  
        <hr className='border-black'/>
        <div className='flex justify-center mt-3'>
          <p className='text-sm'>¿ Ya te registraste ? Crea una cuenta aquí </p>
          <button className="bg-indigo-400 rounded-lg font-bold text-l text-white mx-4 px-2 hover:bg-indigo-300">
            <Link to = "/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};


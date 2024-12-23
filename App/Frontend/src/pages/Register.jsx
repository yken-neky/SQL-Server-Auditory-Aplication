import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';

import { RegisterUser } from '../api/log-reg.api';
import { useAuth } from '../contexts/AuthContext';

export function RegisterForm() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setServerErrors({}); // Restablecer errores del servidor antes de enviar la petición
    if (data.password !== data.confirmPassword) {
      setServerErrors({ confirmPassword: ["Passwords do not match"] });
      return;
    }
    try {
      const response = await RegisterUser(data);
      const { token } = response.data;
      login(token);
      navigate("/home");
      toast.success('User created successfully');
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
                <label className='font-bold text-sm'>Username:</label>
                <input type="text" {...register('username', { required: true })} onChange={handleInputChange}
                  className='bg-slate-300 p-2 rounded-lg block w-full text-white'
                />
                {errors.username && <span className='text-sm'>This field is required</span>}
                {serverErrors.username && <span className='text-sm'>{serverErrors.username[0]}</span>}
              </div>
              <div>
                <label className='font-bold text-sm'>Password:</label>
                <input type="password" {...register('password', { required: true })} 
                  className='bg-slate-300 p-2 rounded-lg block w-full text-white'
                />
                {errors.password && <span className='text-sm'>This field is required</span>}
                {serverErrors.password && <span className='text-sm'>{serverErrors.password[0]}</span>}
              </div>
              <div>
                <label className='font-bold text-sm'>Confirm Password:</label>
                <input type="password" {...register('confirmPassword', { required: true })} 
                  className='bg-slate-300 p-2 rounded-lg block w-full text-white'
                />
                {errors.confirmPassword && <span className='text-sm'>This field is required</span>}
                {serverErrors.confirmPassword && <span className='text-sm'>{serverErrors.confirmPassword[0]}</span>}
              </div>
              <div>
                <label className='font-bold text-sm'>Email:</label>
                <input type="email" {...register('email', { required: true })} 
                  className='bg-slate-300 p-2 rounded-lg block w-full text-white'
                />
                {errors.email && <span className='text-sm'>This field is required</span>}
                {serverErrors.email && <span className='text-sm'>{serverErrors.email[0]}</span>}
              </div>
              <hr className='border-black mt-3'/>
              <button className="bg-indigo-400 p-2 rounded-lg w-full block mt-3 font-bold text-sm text-white hover:bg-indigo-300" type="submit">Register</button>
            </form>
          </div>
          <hr className='border-black'/>
          <div className='flex justify-center mt-3'>
            <p className='text-sm'>¿ Ya tienes una cuenta ? Inicia sesión aquí </p>
            <button className="bg-indigo-400 rounded-lg font-bold text-md mx-4 px-2 text-white hover:bg-indigo-300">
                <Link to = "/login">Login</Link>
            </button>
          </div>  
        </div>
      </div>
    );
};

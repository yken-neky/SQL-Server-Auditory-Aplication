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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">Inicia Sesión ahora !</h1>
          <p className="py-6 text-white">
          ¿ Ya te registraste con nosotros ? Inicia sesión <Link to="/login" className='link link-primary'>aquí</Link> y comienza a auditar tu servidor de bases de datos <span className='font-bold'>SQL Server.</span>
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre de usuario</span>
              </label>
              <input type="text" {...register('username', { required: true })} onChange={handleInputChange} placeholder="username" className="input input-bordered text-white" required />
              {errors.username && <span className='text-sm'>This field is required</span>}
              {serverErrors.username && <span className='text-sm'>{serverErrors.username[0]}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" {...register('email', { required: true })}  placeholder="email" className="input input-bordered text-white" required />
              {errors.email && <span className='text-sm'>This field is required</span>}
              {serverErrors.email && <span className='text-sm'>{serverErrors.email[0]}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input type="password" {...register('password', { required: true })}  placeholder="password" className="input input-bordered text-white" required />
              {errors.password && <span className='text-sm'>This field is required</span>}
              {serverErrors.password && <span className='text-sm'>{serverErrors.password[0]}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar Contraseña</span>
              </label>
              <input type="password" {...register('confirmPassword', { required: true })}  placeholder="confirm password" className="input input-bordered text-white" required />
              {errors.confirmPassword && <span className='text-sm'>This field is required</span>}
              {serverErrors.confirmPassword && <span className='text-sm'>{serverErrors.confirmPassword[0]}</span>}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


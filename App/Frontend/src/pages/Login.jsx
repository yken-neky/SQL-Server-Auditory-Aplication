import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginUser } from "../api/log-reg.api";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
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
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-white">Regístrate ahora !</h1>
              <p className="py-6 text-white">
              ¿ No tienes cuenta ? Crea una <Link className="link link-primary" to="/register">aquí</Link> y comienza a auditar tu servidor de bases de datos <span className="font-bold">SQL Server.</span>
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Usuario</span>
                  </label>
                  <input type="text" {...register('username', { required: true })} onChange={handleInputChange} placeholder="usuario" className="input input-bordered" required />
                  {errors.username && <span className='text-sm'>Este campo es requerido</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contraseña</span>
                  </label>
                  <input type="password" {...register('password', { required: true })} onChange={handleInputChange} placeholder="contraseña" className="input input-bordered" required />
                  {errors.password && <span className='text-sm'>Este campo es requerido</span>}
                </div>
                {serverErrors.error && <span className='text-red-500 font-semibold font text-sm flex justify-center mt-3'>{serverErrors.error}</span>}
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Iniciar Sesión</button>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

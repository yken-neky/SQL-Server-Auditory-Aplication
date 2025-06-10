'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { registerUser } from '@/lib/axios'
import { useAuth } from '@/contexts/AuthContext'

type RegisterFormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()
  const { login } = useAuth()

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setServerErrors({})
    
    try {
      const response = await registerUser(data)
      const { token } = response.data
      login(token)
      toast.success('Cuenta creada exitosamente')
      router.push('/dashboard')
    } catch (error: any) {
      if (error.response?.data) {
        setServerErrors(error.response.data)
      } else {
        toast.error('Error al crear la cuenta')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 transform hover:scale-105 transition-transform">
          <Link href="/" className="inline-block">
            <Image 
              src="/icon.svg" 
              alt="Logo" 
              width={60} 
              height={60} 
              className="mx-auto mb-4 animate-float" 
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Crear una cuenta</h1>
          <p className="text-slate-400">Únete a nuestra plataforma de auditoría</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-slate-800">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  {...register('username', { required: 'El usuario es requerido' })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white pl-10 transition-all"
                  placeholder="usuario"
                />
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
              {serverErrors.username && (
                <p className="text-red-500 text-sm mt-1">{serverErrors.username[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white pl-10 transition-all"
                  placeholder="tu@ejemplo.com"
                />
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              {serverErrors.email && (
                <p className="text-red-500 text-sm mt-1">{serverErrors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register('password', { 
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 8,
                      message: 'La contraseña debe tener al menos 8 caracteres'
                    }
                  })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white pl-10 transition-all"
                  placeholder="••••••••"
                />
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              {serverErrors.password && (
                <p className="text-red-500 text-sm mt-1">{serverErrors.password[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirma tu contraseña',
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return "Las contraseñas no coinciden";
                      }
                    }
                  })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white pl-10 transition-all"
                  placeholder="••••••••"
                />
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-500/20 group"
            >
              <span className="inline-flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creando cuenta...</span>
                  </>
                ) : (
                  <>
                    <span>Crear Cuenta</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-slate-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/auth/login" className="text-sky-500 hover:text-sky-400 transition-colors hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </main>
  )
} 
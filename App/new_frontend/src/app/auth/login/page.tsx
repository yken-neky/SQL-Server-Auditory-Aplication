'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/lib/axios'
import { useAuth } from '@/contexts/AuthContext'

type LoginFormData = {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setServerError('')
    
    try {
      const response = await loginUser(data)
      const { token } = response.data
      login(token)
      toast.success('Inicio de sesión exitoso')
      router.push('/dashboard')
    } catch (error: any) {
      if (error.response?.data?.error) {
        setServerError(error.response.data.error)
      } else {
        setServerError('Error al iniciar sesión')
      }
      toast.error('Error al iniciar sesión')
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
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h1>
          <p className="text-slate-400">Ingresa a tu cuenta para continuar</p>
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
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register('password', { required: 'La contraseña es requerida' })}
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
            </div>

            {serverError && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
                {serverError}
              </div>
            )}

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
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar Sesión</span>
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
          ¿No tienes una cuenta?{' '}
          <Link href="/auth/register" className="text-sky-500 hover:text-sky-400 transition-colors hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  )
} 
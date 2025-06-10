'use client'

import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { updateUserProfile } from '@/lib/axios'
import Breadcrumb from '@/components/Breadcrumb'

interface EditProfileFormData {
  username: string
  email: string
  first_name: string
  last_name: string
}

export default function EditProfilePage() {
  const { user, isLoading, refetchUser } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditProfileFormData>({
    defaultValues: {
      username: '',
      email: '',
      first_name: '',
      last_name: ''
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      })
    }
  }, [user, reset])

  const onSubmit = async (data: EditProfileFormData) => {
    if (!data.username.trim() || !data.email.trim()) {
      toast.error('El usuario y el correo electrónico son obligatorios')
      return
    }

    setIsSubmitting(true)
    try {
      await updateUserProfile(data)
      await refetchUser()
      toast.success('Perfil actualizado correctamente')
      router.push('/dashboard/profile')
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Error al actualizar el perfil')
      }
      console.error('Error al actualizar el perfil:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Breadcrumb 
        items={[
          { label: 'Perfil', href: '/dashboard/profile' },
          { label: 'Editar Perfil' }
        ]} 
      />
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-white mb-6">Editar Perfil</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-slate-400 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name', {
                    required: 'El nombre es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                {errors.first_name && (
                  <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-slate-400 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  id="last_name"
                  {...register('last_name', {
                    required: 'El apellido es requerido',
                    minLength: {
                      value: 2,
                      message: 'El apellido debe tener al menos 2 caracteres'
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                {errors.last_name && (
                  <p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-400 mb-1">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                {...register('username', { 
                  required: 'El usuario es requerido',
                  minLength: {
                    value: 3,
                    message: 'El usuario debe tener al menos 3 caracteres'
                  }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-md hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 
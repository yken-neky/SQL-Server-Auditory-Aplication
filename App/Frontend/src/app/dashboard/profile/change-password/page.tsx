'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { changeUserPassword } from '@/lib/axios'
import Breadcrumb from '@/components/Breadcrumb'

interface ChangePasswordFormData {
  current_password: string
  new_password: string
  confirm_password: string
}

export default function ChangePasswordPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ChangePasswordFormData>()

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true)
    try {
      await changeUserPassword({
        current_password: data.current_password,
        new_password: data.new_password
      })
      toast.success('Contraseña actualizada correctamente')
      router.push('/dashboard/profile')
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Error al cambiar la contraseña')
      }
      console.error('Error al cambiar la contraseña:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Breadcrumb 
        items={[
          { label: 'Perfil', href: '/dashboard/profile' },
          { label: 'Cambiar Contraseña' }
        ]} 
      />
      
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-white mb-6">Cambiar Contraseña</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="current_password" className="block text-sm font-medium text-slate-400 mb-1">
                Contraseña Actual
              </label>
              <input
                type="password"
                id="current_password"
                {...register('current_password', { 
                  required: 'La contraseña actual es requerida'
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              {errors.current_password && (
                <p className="mt-1 text-xs text-red-500">{errors.current_password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-slate-400 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="new_password"
                {...register('new_password', { 
                  required: 'La nueva contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                  }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              {errors.new_password && (
                <p className="mt-1 text-xs text-red-500">{errors.new_password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-400 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirm_password"
                {...register('confirm_password', { 
                  required: 'Debe confirmar la contraseña',
                  validate: value => value === getValues('new_password') || 'Las contraseñas no coinciden'
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              {errors.confirm_password && (
                <p className="mt-1 text-xs text-red-500">{errors.confirm_password.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Guardando...' : 'Cambiar Contraseña'}
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
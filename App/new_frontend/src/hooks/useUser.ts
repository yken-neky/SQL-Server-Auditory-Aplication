'use client'

import { useState, useEffect } from 'react'
import { getUserProfile } from '@/lib/axios'

interface UserProfile {
  username: string
  email: string
  first_name: string
  last_name: string
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile()
      setUser(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar el perfil')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const updateUserState = (updatedUser: UserProfile) => {
    setUser(updatedUser)
  }

  return { user, isLoading, error, updateUserState, refetch: fetchUserProfile }
} 
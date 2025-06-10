'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUserProfile } from '@/lib/axios'

interface UserProfile {
  username: string
  email: string
  first_name: string
  last_name: string
}

interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  error: string | null
  updateUserState: (user: UserProfile) => void
  refetchUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
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

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error, 
        updateUserState,
        refetchUser: fetchUserProfile
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 
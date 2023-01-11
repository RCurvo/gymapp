/* eslint-disable no-useless-catch */
import { UserDTO } from '@dtos/UserDTO'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '@services/api'
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from '@storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  isLoadingUserStorage: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorage(true)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setUser(userData)
      storageAuthTokenSave(token)
      storageUserSave(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token) {
        storageUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut(email: string, password: string) {
    try {
      setIsLoadingUserStorage(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingUserStorage, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

import { UserDTO } from '@dtos/UserDTO'
import { createContext, ReactNode, useState } from 'react'

export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Renan Curvo',
    email: 'renan.curvo@gmail.com',
    avatar: 'https://github.com/rcurvo.png',
  })
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

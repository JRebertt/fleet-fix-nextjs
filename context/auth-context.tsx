'use client'

import { COOKIE_NAME } from '@/lib/cookies'
import profileUser from '@/services/user/profile-user'
import sessionsUser from '@/services/user/sessions-user'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import { useRouter } from 'next/navigation'

import { ReactNode, createContext, useEffect, useState } from 'react'

interface Props {
  children?: ReactNode
}

type SignInData = {
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const token = getCookie(COOKIE_NAME)

    if (token) {
      profileUser(token).then((response) => {
        setUser(response.user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const data = await sessionsUser({ email, password })

    if (!data.token) {
      throw new Error()
    }

    setCookie(COOKIE_NAME, data.token)

    // const refreshTokenReponse = await refreshToken({ email, password })

    // console.log(refreshTokenReponse)

    const isCookie = getCookie(COOKIE_NAME)

    if (isCookie) {
      const { user } = await profileUser(isCookie)
      setUser(user)
    }

    router.push('/')
  }

  async function signOut() {
    deleteCookie(COOKIE_NAME)

    router.push('/sessions')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

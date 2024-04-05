// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from 'react'
// import { getCookie, deleteCookie } from 'cookies-next'
// import { logoutUser } from '@/services/user/logout-sessions-user'
// import { api } from '@/lib/api-fetch'

// interface User {
//   id: string
//   // Adicione outros campos conforme necessário, por exemplo:
//   name: string
//   email: string
// }

// interface MeuComponenteProps {
//   children: React.ReactNode
// }

// interface SessionContextType {
//   user: User | null
//   logout: () => void
// }

// const SessionContext = createContext<SessionContextType | undefined>(undefined)

// export const SessionProvider: React.FC<MeuComponenteProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null)

//   const fetchUser = async (userId: string) => {
//     // Substitua pela sua lógica de busca do usuário. Exemplo:
//     try {
//       const response = await api('') // Substitua `/api/user/${userId}` pelo seu endpoint
//       if (!response.ok) {
//         throw new Error('Failed to fetch user')
//       }
//       const userData: User = await response.json()
//       setUser(userData)
//     } catch (error) {
//       console.error('Error fetching user:', error)
//       // Tratar o erro conforme necessário
//     }
//   }

//   useEffect(() => {
//     const userId = getCookie('userId') as string // getCookie retorna um `string | undefined`
//     if (userId) {
//       fetchUser(userId)
//     }
//   }, [])

//   const logout = useCallback(() => {
//     // logoutUser('/ne')
//     deleteCookie('userId')
//     setUser(null)
//   }, [])

//   return (
//     <SessionContext.Provider value={{ user, logout }}>
//       {children}
//     </SessionContext.Provider>
//   )
// }

// export function useSession() {
//   const context = useContext(SessionContext)
//   if (context === undefined) {
//     throw new Error('useSession must be used within a SessionProvider')
//   }
//   return context
// }

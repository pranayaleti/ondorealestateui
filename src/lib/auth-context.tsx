import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authApi, tokenManager, type User, ApiError } from "@/lib/api"

export type UserRole = "super_admin" | "manager" | "owner" | "tenant"

export interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: UserData | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  // Convert API User to UserData
  const convertUser = (apiUser: User): UserData => ({
    id: apiUser.id,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    email: apiUser.email,
    role: apiUser.role,
    avatar: "/abstract-geometric-shapes.png", // Default avatar
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = tokenManager.getToken()
      if (token && !tokenManager.isTokenExpired(token)) {
        try {
          const apiUser = await authApi.me()
          setUser(convertUser(apiUser))
        } catch (error) {
          console.error("Failed to verify session", error)
          tokenManager.removeToken()
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await authApi.login({ email, password })
      tokenManager.setToken(response.token)
      const userData = convertUser(response.user)
      setUser(userData)
      
      // Auto-redirect based on user role
      const redirectPath = userData.role === "tenant" ? "/tenant" : 
                          userData.role === "owner" ? "/owner" : 
                          userData.role === "manager" ? "/dashboard" : "/"
      navigate(redirectPath)
      
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login failed", error)
      setIsLoading(false)
      return false
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const apiUser = await authApi.me()
      setUser(convertUser(apiUser))
    } catch (error) {
      console.error("Failed to refresh user", error)
      logout()
    }
  }

  const logout = () => {
    setUser(null)
    tokenManager.removeToken()
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

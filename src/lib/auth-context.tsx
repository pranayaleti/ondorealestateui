import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authApi, tokenManager, type User, ApiError } from "@/lib/api"

export type UserRole = "admin" | "manager" | "owner" | "tenant"

export interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  phone?: string
  address?: string
  profilePicture?: string
  avatar?: string
}

interface AuthContextType {
  user: UserData | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
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
    phone: apiUser.phone,
    address: apiUser.address,
    profilePicture: apiUser.profilePicture,
    avatar: apiUser.profilePicture || "/abstract-geometric-shapes.png", // Use profile picture or default
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
          // Session invalid or expired, clear token
          tokenManager.removeToken()
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
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
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      
      // Extract error message from ApiError
      let errorMessage = "An unexpected error occurred. Please try again."
      if (error instanceof ApiError) {
        errorMessage = error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      return { success: false, message: errorMessage }
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const apiUser = await authApi.me()
      setUser(convertUser(apiUser))
    } catch (error) {
      // User session invalid, logout
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

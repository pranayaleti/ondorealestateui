import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authApi, tokenManager, type User, ApiError } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

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
    avatar: apiUser.profilePicture, // Use profile picture, fallback handled in components
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
      
      // Show welcome toast once per session after login
      const welcomeKey = `welcome_shown_${userData.id}`
      const hasShownWelcome = sessionStorage.getItem(welcomeKey)
      
      if (!hasShownWelcome && userData.firstName) {
        toast({
          title: `Welcome back, ${userData.firstName}!`,
          description: "Here's your property management overview.",
          duration: 4000,
          variant: "orange",
        })
        sessionStorage.setItem(welcomeKey, "true")
      }
      
      // Auto-redirect based on user role (with small delay to ensure toast shows)
      const redirectPath = userData.role === "tenant" ? "/tenant" : 
                          userData.role === "owner" ? "/owner" : 
                          userData.role === "manager" ? "/dashboard" : "/"
      
      // Small delay to ensure toast is displayed before navigation
      setTimeout(() => {
        navigate(redirectPath)
      }, 100)
      
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

import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authApi, tokenManager, type User, ApiError } from "@/lib/api"

export type UserRole = "manager" | "owner" | "tenant"

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
    phone: apiUser.phone,
    address: apiUser.address,
    profilePicture: apiUser.profilePicture,
    avatar: apiUser.profilePicture || "/abstract-geometric-shapes.png", // Use profile picture or default
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = tokenManager.getToken()
      console.log("Auth context checkSession:", { token: token ? "present" : "missing" })
      if (token && !tokenManager.isTokenExpired(token)) {
        try {
          const apiUser = await authApi.me()
          console.log("Auth context me() response:", apiUser)
          setUser(convertUser(apiUser))
        } catch (error) {
          console.error("Failed to verify session", error)
          tokenManager.removeToken()
        }
      } else {
        console.log("No valid token found")
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    console.log("Auth context login - starting")

    try {
      const response = await authApi.login({ email, password })
      console.log("Auth context login - API response:", { hasToken: !!response.token, user: response.user })
      
      tokenManager.setToken(response.token)
      const userData = convertUser(response.user)
      console.log("Auth context login - setting user:", userData)
      
      setUser(userData)
      
      // Auto-redirect based on user role
      const redirectPath = userData.role === "tenant" ? "/tenant" : 
                          userData.role === "owner" ? "/owner" : 
                          userData.role === "manager" ? "/dashboard" : "/"
      console.log("Auth context login - redirecting to:", redirectPath)
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

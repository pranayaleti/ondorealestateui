import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth-context"
import Loading from "@/components/loading"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("super_admin" | "manager" | "owner" | "tenant")[]
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = ["super_admin", "manager", "owner", "tenant"],
  redirectTo = "/login"
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check if user role is allowed
  if (user.role && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const userDashboard = user.role === "tenant" ? "/tenant" : 
                         user.role === "owner" ? "/owner" : 
                         user.role === "manager" ? "/dashboard" : "/"
    return <Navigate to={userDashboard} replace />
  }

  return <>{children}</>
}

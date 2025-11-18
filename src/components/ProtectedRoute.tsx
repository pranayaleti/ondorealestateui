import { Navigate, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { canAccessRoute, getUnauthorizedRedirectPath, type UserRole } from "@/lib/auth-utils"
import Loading from "@/components/loading"
import { toast } from "@/hooks/use-toast"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles,
  redirectTo = "/login"
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const hasWarnedRef = useRef(false)

  useEffect(() => {
    if (
      !hasWarnedRef.current &&
      !isLoading &&
      user &&
      allowedRoles &&
      allowedRoles.length > 0 &&
      !canAccessRoute(user.role, allowedRoles)
    ) {
      const roleLabel = user.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())
      toast({
        title: "Access restricted",
        description: `${roleLabel} cannot access that page. Redirected to your dashboard.`,
        variant: "destructive",
      })
      hasWarnedRef.current = true
    }
  }, [isLoading, user, allowedRoles])

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // If allowedRoles is specified, check if user role is allowed
  if (allowedRoles && allowedRoles.length > 0) {
    if (!canAccessRoute(user.role, allowedRoles)) {
      const userDashboard = getUnauthorizedRedirectPath(user.role)
      return <Navigate to={userDashboard} replace />
    }
  }

  return <>{children}</>
}

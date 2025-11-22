import { useAuth } from "@/lib/auth-context"
import { useBaseDashboard } from "../BaseDashboardContext"

/**
 * Hook for dashboard permissions management
 * Checks if user has required permissions for portal features
 */
export function useDashboardPermissions() {
  const { user } = useAuth()
  const { config } = useBaseDashboard()

  const hasPermission = (permission: string): boolean => {
    if (!config.permissions || config.permissions.length === 0) {
      return true // No permissions required
    }
    return config.permissions.includes(permission)
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!config.permissions || config.permissions.length === 0) {
      return true
    }
    return permissions.some(p => config.permissions?.includes(p))
  }

  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!config.permissions || config.permissions.length === 0) {
      return true
    }
    return permissions.every(p => config.permissions?.includes(p))
  }

  const canAccessFeature = (featureId: string): boolean => {
    // Check if feature is in config and user has required permissions
    // This can be extended to check specific feature permissions
    return hasPermission(`access_${featureId}`)
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessFeature,
    userRole: user?.role,
    isAuthorized: user?.role === config.role,
  }
}


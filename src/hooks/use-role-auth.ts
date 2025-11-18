/**
 * Hook for role-based authorization checks
 * Provides utilities for conditional rendering based on user roles
 */

import { useAuth } from "@/lib/auth-context"
import { 
  canAccessRoute, 
  hasPermission, 
  canManageRole, 
  FEATURE_PERMISSIONS,
  type UserRole 
} from "@/lib/auth-utils"

/**
 * Hook to check if current user has a specific role
 */
export function useHasRole(role: UserRole): boolean {
  const { user } = useAuth()
  return user?.role === role
}

/**
 * Hook to check if current user can access a route
 */
export function useCanAccessRoute(allowedRoles: UserRole[]): boolean {
  const { user } = useAuth()
  if (!user) return false
  return canAccessRoute(user.role, allowedRoles)
}

/**
 * Hook to check if current user has a specific permission
 */
export function useHasPermission(permission: keyof typeof FEATURE_PERMISSIONS.super_admin): boolean {
  const { user } = useAuth()
  if (!user) return false
  return hasPermission(user.role, permission)
}

/**
 * Hook to check if current user can manage a specific role
 */
export function useCanManageRole(targetRole: UserRole): boolean {
  const { user } = useAuth()
  if (!user) return false
  return canManageRole(user.role, targetRole)
}

/**
 * Hook to get current user role
 */
export function useUserRole(): UserRole | null {
  const { user } = useAuth()
  return user?.role || null
}


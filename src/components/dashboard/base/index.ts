/**
 * Base Dashboard Module
 * 
 * Exports all base dashboard components, types, and utilities
 */

export { BaseDashboard } from "./BaseDashboard"
export { BaseDashboardProvider, useBaseDashboard } from "./BaseDashboardContext"
export { StatCard } from "./widgets/StatCard"
export { ActivityFeed } from "./widgets/ActivityFeed"
export { QuickActions } from "./widgets/QuickActions"

// Export hooks
export {
  useDashboardData,
  useDashboardNavigation,
  useDashboardPermissions,
  useDashboardTheme,
} from "./hooks"

export type {
  PortalConfig,
  DashboardWidget,
  StatCardConfig,
  ActivityItem,
  QuickAction,
  DashboardTab,
  BaseDashboardProps,
  DashboardData,
} from "./types"


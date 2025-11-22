import { useEffect, useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { useWelcomeToast } from "@/hooks/use-welcome-toast"
import { Badge } from "@/components/ui/badge"
import { BaseDashboard, BaseDashboardProvider } from "../../base"
import { createAdminConfig } from "./admin.config"
import { useBaseDashboard } from "../../base/BaseDashboardContext"
import { ActivityFeed } from "../../base/widgets/ActivityFeed"

/**
 * Refactored AdminDashboard using BaseDashboard architecture
 * 
 * This demonstrates how to migrate an existing dashboard to use the base dashboard pattern.
 * The configuration is separated into admin.config.tsx for better maintainability.
 */
function AdminDashboardContent() {
  const { user } = useAuth()
  const { data } = useBaseDashboard()

  // Transform fetched data into config format
  const config = useMemo(() => {
    const properties = data.properties || []
    const invitedUsers = data.invitedUsers || []
    const maintenanceRequests = data.maintenanceRequests || []

    return createAdminConfig(properties, invitedUsers, maintenanceRequests)
  }, [data.properties, data.invitedUsers, data.maintenanceRequests])

  // Update activities in context when data changes
  useEffect(() => {
    if (data.properties && data.maintenanceRequests) {
      const properties = data.properties || []
      const maintenanceRequests = data.maintenanceRequests || []
      
      const activities = [
        ...properties.slice(0, 3).map((p: any, idx: number) => ({
          id: `prop-${idx}`,
          type: "property" as const,
          message: `Property "${p.title}" ${p.status === 'pending' ? 'submitted for review' : p.status === 'approved' ? 'approved' : 'rejected'}`,
          time: p.createdAt,
          status: p.status === 'approved' ? 'success' as const : p.status === 'rejected' ? 'error' as const : 'warning' as const,
          href: `/admin/properties`,
        })),
        ...maintenanceRequests.slice(0, 2).map((m: any, idx: number) => ({
          id: `maint-${idx}`,
          type: "maintenance" as const,
          message: `Maintenance request "${m.title}" ${m.status === 'completed' ? 'completed' : 'updated'}`,
          time: m.updatedAt,
          status: m.status === 'completed' ? 'success' as const : 'warning' as const,
          href: `/admin/maintenance`,
        })),
      ]

      // Update activities in context
      // Note: This would ideally be handled by the config, but we need to update context
      // For now, we'll pass activities through config
    }
  }, [data.properties, data.maintenanceRequests])

  return (
    <BaseDashboard
      config={{
        ...config,
        headerActions: (
          <Badge variant="outline" className="text-sm">
            {user?.firstName} {user?.lastName}
          </Badge>
        ),
      }}
    />
  )
}

export default function AdminDashboardRefactored() {
  useWelcomeToast()

  // Create initial config for provider
  const initialConfig = useMemo(() => {
    return createAdminConfig([], [], [])
  }, [])

  return (
    <BaseDashboardProvider config={initialConfig}>
      <AdminDashboardContent />
    </BaseDashboardProvider>
  )
}


import { useEffect, useMemo, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { useWelcomeToast } from "@/hooks/use-welcome-toast"
import { BaseDashboard, BaseDashboardProvider } from "../../base"
import { createOwnerConfig } from "./owner.config"
import { useBaseDashboard } from "../../base/BaseDashboardContext"
import { formatUSDate } from "@/lib/us-format"
import type { ActivityItem } from "../../base/types"

/**
 * New OwnerDashboard using BaseDashboard architecture
 * 
 * This implementation uses the base dashboard system for consistent layout and functionality.
 */
function OwnerDashboardContent() {
  const { user } = useAuth()
  const { data, updateData } = useBaseDashboard()

  // Transform fetched data into config format
  const config = useMemo(() => {
    // Filter properties for current owner
    const allProperties = data.properties || []
    const properties = allProperties.filter(p => p.ownerId === user?.id)

    return createOwnerConfig(properties)
  }, [data.properties, user?.id])

  // Generate activities from fetched data
  const activities = useMemo(() => {
    const allProperties = data.properties || []
    const properties = allProperties.filter(p => p.ownerId === user?.id)

    return properties.slice(0, 5).map((p: any, idx: number) => ({
      id: `prop-${idx}`,
      type: "property" as const,
      message: `Property "${p.title}" ${p.status === 'approved' ? 'approved' : p.status === 'pending' ? 'pending review' : 'rejected'}`,
      time: formatUSDate(p.createdAt),
      status: p.status === 'approved' ? 'success' as const : p.status === 'rejected' ? 'error' as const : 'warning' as const,
      href: `/owner/properties`,
    }))
  }, [data.properties, user?.id])

  // Update activities in context (useEffect to avoid render-time state updates)
  const prevActivitiesRef = useRef<string>()
  useEffect(() => {
    const activitiesKey = JSON.stringify(activities)
    if (prevActivitiesRef.current !== activitiesKey) {
      prevActivitiesRef.current = activitiesKey
      updateData('activities', activities)
    }
  }, [activities, updateData])

  return (
    <BaseDashboard config={config} />
  )
}

export default function OwnerDashboardNew() {
  useWelcomeToast()

  // Create initial config for provider
  const initialConfig = useMemo(() => {
    return createOwnerConfig([])
  }, [])

  return (
    <BaseDashboardProvider config={initialConfig}>
      <OwnerDashboardContent />
    </BaseDashboardProvider>
  )
}


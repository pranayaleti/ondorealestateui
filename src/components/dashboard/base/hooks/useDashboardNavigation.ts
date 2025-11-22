import { useNavigate, useLocation } from "react-router-dom"
import { useBaseDashboard } from "../BaseDashboardContext"

/**
 * Hook for dashboard navigation management
 * Provides utilities for tab navigation and URL synchronization
 */
export function useDashboardNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { config } = useBaseDashboard()

  const navigateToTab = (tabValue: string) => {
    const tab = config.tabs?.find(t => t.value === tabValue)
    if (tab) {
      // Update URL without navigation if tabs are internal
      const params = new URLSearchParams(location.search)
      params.set("tab", tabValue)
      navigate({ search: params.toString() }, { replace: true })
    }
  }

  const getActiveTab = () => {
    const params = new URLSearchParams(location.search)
    const tabFromUrl = params.get("tab")
    if (tabFromUrl && config.tabs?.some(t => t.value === tabFromUrl)) {
      return tabFromUrl
    }
    return config.tabs?.[0]?.value || ""
  }

  const navigateToQuickAction = (actionId: string) => {
    const action = config.quickActions?.find(a => a.id === actionId)
    if (action?.href) {
      navigate(action.href)
    }
  }

  return {
    navigateToTab,
    getActiveTab,
    navigateToQuickAction,
    currentPath: location.pathname,
  }
}


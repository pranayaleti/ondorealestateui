import { useBaseDashboard } from "../BaseDashboardContext"
import { useMemo } from "react"

/**
 * Hook for dashboard theme management
 * Provides theme values from portal config
 */
export function useDashboardTheme() {
  const { config } = useBaseDashboard()

  const theme = useMemo(() => {
    return {
      primaryColor: config.theme?.primaryColor || "#3B82F6", // Default blue
      accentColor: config.theme?.accentColor || "#10B981", // Default green
      ...config.theme,
    }
  }, [config.theme])

  const getThemeStyle = () => {
    return {
      "--dashboard-primary": theme.primaryColor,
      "--dashboard-accent": theme.accentColor,
    } as React.CSSProperties
  }

  return {
    theme,
    primaryColor: theme.primaryColor,
    accentColor: theme.accentColor,
    getThemeStyle,
  }
}


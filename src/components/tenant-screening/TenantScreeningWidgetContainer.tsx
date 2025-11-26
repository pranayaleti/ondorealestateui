import { TenantScreeningWidget, type TenantScreeningWidgetProps } from "./TenantScreeningWidget"
import { useTenantScreening } from "@/hooks/useTenantScreening"
import type { TenantScreeningApplicantParams } from "@/lib/api"

type ContainerProps = Omit<
  TenantScreeningWidgetProps,
  "summary" | "applicants" | "loading" | "error" | "onRefresh"
> & {
  propertyId?: string
  tenantId?: string
  timeframe?: "7d" | "30d" | "90d"
  limit?: number
  status?: TenantScreeningApplicantParams["status"]
  auto?: boolean
}

export function TenantScreeningWidgetContainer({
  propertyId,
  tenantId,
  timeframe,
  limit = 4,
  status,
  auto,
  ...widgetProps
}: ContainerProps) {
  const { summary, applicants, loading, error, refresh } = useTenantScreening({
    propertyId,
    tenantId,
    timeframe,
    limit,
    status,
    auto,
  })

  return (
    <TenantScreeningWidget
      summary={summary}
      applicants={applicants}
      loading={loading}
      error={error}
      onRefresh={refresh}
      {...widgetProps}
    />
  )
}



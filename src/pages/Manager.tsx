import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import ManagerDashboard from "@/components/manager/manager-dashboard"
import ManagerProperties from "@/components/manager/manager-property-review"
import ManagerTenants from "@/components/manager/manager-tenants"
import ManagerOwners from "@/components/manager/manager-owners"
import ManagerMaintenance from "@/components/manager/manager-maintenance"
import ManagerFinances from "@/components/manager/manager-finances"
import ManagerReports from "@/components/manager/manager-reports"
import ManagerSettings from "@/components/manager/manager-settings"
import ManagerProfile from "@/components/manager/manager-profile"
import { PortalSidebar } from "@/components/portal-sidebar"
import Loading from "@/components/loading"

export default function Manager() {
  return (
    <PortalSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<ManagerDashboard />} />
            <Route path="/properties/*" element={<ManagerProperties />} />
            <Route path="/owners/*" element={<ManagerOwners />} />
            <Route path="/tenants/*" element={<ManagerTenants />} />
            <Route path="/maintenance/*" element={<ManagerMaintenance />} />
            <Route path="/finances/*" element={<ManagerFinances />} />
            <Route path="/reports" element={<ManagerReports />} />
            <Route path="/profile" element={<ManagerProfile />} />
            <Route path="/settings" element={<ManagerSettings />} />
          </Routes>
        </Suspense>
      </div>
    </PortalSidebar>
  )
}


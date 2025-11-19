import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import MaintenanceDashboard from "@/components/maintenance/maintenance-dashboard"
import MaintenanceTickets from "@/components/maintenance/maintenance-tickets"
import MaintenanceProfile from "@/components/maintenance/maintenance-profile"
import { PortalSidebar } from "@/components/portal-sidebar"
import Loading from "@/components/loading"

export default function Maintenance() {
  return (
    <PortalSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MaintenanceDashboard />} />
            <Route path="/tickets/*" element={<MaintenanceTickets />} />
            <Route path="/profile" element={<MaintenanceProfile />} />
          </Routes>
        </Suspense>
      </div>
    </PortalSidebar>
  )
}


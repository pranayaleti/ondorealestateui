import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminManagers from "@/components/admin/admin-managers"
import AdminOwners from "@/components/admin/admin-owners"
import AdminTenants from "@/components/admin/admin-tenants"
import AdminMaintenance from "@/components/admin/admin-maintenance"
import AdminProperties from "@/components/admin/admin-properties"
import AdminFinances from "@/components/admin/admin-finances"
import AdminReports from "@/components/admin/admin-reports"
import AdminProfile from "@/components/admin/admin-profile"
import { PortalSidebar } from "@/components/portal-sidebar"
import Loading from "@/components/loading"

export default function Admin() {
  return (
    <PortalSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/managers/*" element={<AdminManagers />} />
            <Route path="/owners/*" element={<AdminOwners />} />
            <Route path="/tenants/*" element={<AdminTenants />} />
            <Route path="/maintenance/*" element={<AdminMaintenance />} />
            <Route path="/properties/*" element={<AdminProperties />} />
            <Route path="/finances/*" element={<AdminFinances />} />
            <Route path="/reports/*" element={<AdminReports />} />
            <Route path="/profile" element={<AdminProfile />} />
          </Routes>
        </Suspense>
      </div>
    </PortalSidebar>
  )
}


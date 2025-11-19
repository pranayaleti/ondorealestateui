import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import SuperAdminDashboard from "@/components/super-admin/super-admin-dashboard"
import SuperAdminManagers from "@/components/super-admin/super-admin-managers"
import SuperAdminAdmins from "@/components/super-admin/super-admin-admins"
import SuperAdminOwners from "@/components/super-admin/super-admin-owners"
import SuperAdminTenants from "@/components/super-admin/super-admin-tenants"
import SuperAdminMaintenance from "@/components/super-admin/super-admin-maintenance"
import SuperAdminProperties from "@/components/super-admin/super-admin-properties"
import SuperAdminFinances from "@/components/super-admin/super-admin-finances"
import SuperAdminReports from "@/components/super-admin/super-admin-reports"
import SuperAdminProfile from "@/components/super-admin/super-admin-profile"
import { PortalSidebar } from "@/components/portal-sidebar"
import Loading from "@/components/loading"

export default function SuperAdmin() {
  return (
    <PortalSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<SuperAdminDashboard />} />
            <Route path="/managers/*" element={<SuperAdminManagers />} />
            <Route path="/admins/*" element={<SuperAdminAdmins />} />
            <Route path="/owners/*" element={<SuperAdminOwners />} />
            <Route path="/tenants/*" element={<SuperAdminTenants />} />
            <Route path="/maintenance/*" element={<SuperAdminMaintenance />} />
            <Route path="/properties/*" element={<SuperAdminProperties />} />
            <Route path="/finances/*" element={<SuperAdminFinances />} />
            <Route path="/reports/*" element={<SuperAdminReports />} />
            <Route path="/profile" element={<SuperAdminProfile />} />
          </Routes>
        </Suspense>
      </div>
    </PortalSidebar>
  )
}


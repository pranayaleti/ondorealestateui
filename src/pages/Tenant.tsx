import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import TenantDashboard from "@/components/tenant/tenant-dashboard"
import TenantMaintenance from "@/components/tenant/tenant-maintenance"
import TenantPayments from "@/components/tenant/tenant-payments"
import TenantDocuments from "@/components/tenant/tenant-documents"
import TenantMessages from "@/components/tenant/tenant-messages"
import TenantProfile from "@/components/tenant/tenant-profile"
import TenantLeaseDetails from "@/components/tenant/tenant-lease-details"
import { PortalSidebar } from "@/components/portal-sidebar"
import Loading from "@/components/loading"

export default function Tenant() {
  return (
    <PortalSidebar>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<TenantDashboard />} />
          <Route path="/lease-details" element={<TenantLeaseDetails />} />
          <Route path="/maintenance/*" element={<TenantMaintenance />} />
          <Route path="/payments" element={<TenantPayments />} />
          <Route path="/documents" element={<TenantDocuments />} />
          <Route path="/messages" element={<TenantMessages />} />
          <Route path="/profile" element={<TenantProfile />} />
        </Routes>
      </Suspense>
    </div>
    </PortalSidebar>
  )
}

import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import TenantDashboard from "@/components/tenant/tenant-dashboard"
import TenantMaintenance from "@/components/tenant/tenant-maintenance"
import TenantPayments from "@/components/tenant/tenant-payments"
import TenantDocuments from "@/components/tenant/tenant-documents"
import TenantMessages from "@/components/tenant/tenant-messages"
import TenantProfile from "@/components/tenant/tenant-profile"
import TenantSettings from "@/components/tenant/tenant-settings"
import Loading from "@/components/loading"

export default function Tenant() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<TenantDashboard />} />
          <Route path="/maintenance/*" element={<TenantMaintenance />} />
          <Route path="/payments" element={<TenantPayments />} />
          <Route path="/documents" element={<TenantDocuments />} />
          <Route path="/messages" element={<TenantMessages />} />
          <Route path="/profile" element={<TenantProfile />} />
          <Route path="/settings" element={<TenantSettings />} />
        </Routes>
      </Suspense>
    </div>
  )
}

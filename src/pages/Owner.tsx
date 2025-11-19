import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import OwnerDashboard from "@/components/owner/owner-dashboard"
import OwnerProperties from "@/components/owner/owner-properties"
import OwnerFinances from "@/components/owner/owner-finances"
import OwnerReports from "@/components/owner/owner-reports"
import OwnerTenants from "@/components/owner/owner-tenants"
import OwnerProfile from "@/components/owner/owner-profile"
import OwnerMessages from "@/components/owner/owner-messages"
import OwnerDocuments from "@/components/owner/owner-documents"
import { AddPropertyForm } from "@/components/owner/add-property-form"
import { OwnerMaintenanceManagement } from "@/components/owner/maintenance-management"
import { PortalSidebar } from "@/components/portal-sidebar"
import Loading from "@/components/loading"

export default function Owner() {
  return (
    <PortalSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<OwnerDashboard />} />
            {/* Property creation routes - both old and new URLs */}
            <Route path="/properties/add" element={<AddPropertyForm />} />
            <Route path="/property-management/add" element={<AddPropertyForm />} />
            <Route path="/properties/*" element={<OwnerProperties />} />
            <Route path="/finances/*" element={<OwnerFinances />} />
            <Route path="/reports/*" element={<OwnerReports />} />
            <Route path="/tenants" element={<OwnerTenants />} />
            <Route path="/maintenance/*" element={<OwnerMaintenanceManagement />} />
            <Route path="/messages/*" element={<OwnerMessages />} />
            <Route path="/documents/*" element={<OwnerDocuments />} />
            <Route path="/profile" element={<OwnerProfile />} />
          </Routes>
        </Suspense>
      </div>
    </PortalSidebar>
  )
}

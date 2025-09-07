import type { Metadata } from "next"
import TenantApplicationsClientPage from "./TenantApplicationsClientPage"

export const metadata: Metadata = {
  title: "Tenant Applications | PropertyPro Management",
  description: "Manage tenant applications",
}

export default function TenantApplicationsPage() {
  return <TenantApplicationsClientPage />
}

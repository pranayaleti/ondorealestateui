import type { Metadata } from "next"
import MaintenanceClientPage from "./MaintenanceClientPage"

export const metadata: Metadata = {
  title: "Maintenance | PropertyPro Management",
  description: "Manage maintenance requests",
}

export default function MaintenancePage() {
  return <MaintenanceClientPage />
}

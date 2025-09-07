import type { Metadata } from "next"
import PropertiesPageClient from "./properties-page-client"

export const metadata: Metadata = {
  title: "Properties | Property Management CRM",
  description: "Manage your properties",
}

export default function PropertiesPage() {
  return <PropertiesPageClient />
}

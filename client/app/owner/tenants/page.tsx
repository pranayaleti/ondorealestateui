import type { Metadata } from "next"
import { TenantsView } from "@/components/owner/tenants-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Tenants | Real Estate",
  description: "Manage your tenants",
}

export default function TenantsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner/tenants">
                <Users className="h-4 w-4 mr-1" />
                Tenants
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Tenants</h1>
        <p className="text-muted-foreground">Manage your tenants and leases</p>
      </div>

      <TenantsView />
    </div>
  )
}

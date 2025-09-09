import type { Metadata } from "next"
import { OwnerPropertiesView } from "@/components/owner/properties-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "My Properties | Real Estate",
  description: "Manage your property portfolio",
}

export default function OwnerPropertiesPage() {
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
              <BreadcrumbLink href="/owner/properties">Properties</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">My Properties</h1>
        <p className="text-muted-foreground">Manage your property portfolio</p>
      </div>
      <OwnerPropertiesView />
    </div>
  )
}

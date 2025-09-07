import { UnderMaintenance } from "@/components/ui/under-maintenance"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Building, Edit } from "lucide-react"

export default function EditPropertyPage({ params }: { params: { id: string } }) {
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
              <BreadcrumbLink href="/owner/properties">
                <Building className="h-4 w-4 mr-1" />
                Properties
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/owner/properties/${params.id}`}>Property Details</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/owner/properties/${params.id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Property
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">Update your property details</p>
      </div>

      <UnderMaintenance
        title="Edit Property Coming Soon"
        description="We're currently developing the property editing functionality. Please check back soon."
        showHomeButton={false}
        actionText="Return to Property Details"
        actionHref={`/owner/properties/${params.id}`}
      />
    </div>
  )
}

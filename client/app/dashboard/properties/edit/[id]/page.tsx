import { Suspense } from "react"
import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { PropertyEditForm } from "@/components/dashboard/property-edit-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Loading from "@/components/loading"

export const metadata: Metadata = {
  title: "Edit Property | Property Management CRM",
  description: "Edit property details",
}

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Property" text={`Edit property details for ID: ${params.id}`} />
      <Suspense fallback={<Loading />}>
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Update the details of this property</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyEditForm propertyId={params.id} />
          </CardContent>
        </Card>
      </Suspense>
    </DashboardShell>
  )
}

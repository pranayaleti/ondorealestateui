import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { PropertyForm } from "@/components/dashboard/property-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Add Property | Property Management CRM",
  description: "Add a new property to your CRM",
}

export default function AddPropertyPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add Property" text="Add a new property to your CRM" />
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Enter the details of the property you want to add</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

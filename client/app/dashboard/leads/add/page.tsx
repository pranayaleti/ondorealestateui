import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { LeadForm } from "@/components/dashboard/lead-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Add Lead | Property Management CRM",
  description: "Add a new lead to your CRM",
}

export default function AddLeadPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add Lead" text="Add a new lead to your CRM" />
      <Card>
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
          <CardDescription>Enter the details of the lead you want to add</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

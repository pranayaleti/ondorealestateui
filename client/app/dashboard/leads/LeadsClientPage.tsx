"use client"

import { Suspense, useState } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Loading from "@/components/loading"
import { LeadFormSheet } from "@/components/lead-form-sheet"

export default function LeadsClientPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Leads" text="Manage and track your leads">
        <LeadsActions />
      </DashboardHeader>
      <Suspense fallback={<Loading />}>
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>View and manage all your leads</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadsTable />
          </CardContent>
        </Card>
      </Suspense>
    </DashboardShell>
  )
}

// Client component for the actions
function LeadsActions() {
  const [showLeadForm, setShowLeadForm] = useState(false)

  return (
    <>
      <Button onClick={() => setShowLeadForm(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Lead
      </Button>

      <LeadFormSheet open={showLeadForm} onOpenChange={setShowLeadForm} />
    </>
  )
}

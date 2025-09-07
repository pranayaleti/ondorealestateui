"use client"

import { Suspense, useState } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { PropertiesTable } from "@/components/dashboard/properties-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Loading from "@/components/loading"
import { PropertyFormSheet } from "@/components/dashboard/property-form-sheet"

export default function PropertiesPageClient() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Properties" text="Manage and track your properties">
        <PropertiesActions />
      </DashboardHeader>
      <Suspense fallback={<Loading />}>
        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>View and manage all your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertiesTable />
          </CardContent>
        </Card>
      </Suspense>
    </DashboardShell>
  )
}

// Client component for the actions
function PropertiesActions() {
  const [showPropertyForm, setShowPropertyForm] = useState(false)

  return (
    <>
      <Button onClick={() => setShowPropertyForm(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Property
      </Button>

      <PropertyFormSheet open={showPropertyForm} onOpenChange={setShowPropertyForm} />
    </>
  )
}

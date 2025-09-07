import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { LeasesTable } from "@/components/dashboard/leases-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Leases | PropertyPro Management",
  description: "Manage property leases",
}

export default function LeasesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Leases" text="Manage and track property leases">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Lease
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Leases</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Leases</CardTitle>
              <CardDescription>View and manage all property leases</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeasesTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Active Leases</CardTitle>
              <CardDescription>Currently active property leases</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeasesTable status="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Upcoming Leases</CardTitle>
              <CardDescription>Leases that will start soon</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeasesTable status="upcoming" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Expiring Leases</CardTitle>
              <CardDescription>Leases expiring within 60 days</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeasesTable status="expiring" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Expired Leases</CardTitle>
              <CardDescription>Leases that have expired</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeasesTable status="expired" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

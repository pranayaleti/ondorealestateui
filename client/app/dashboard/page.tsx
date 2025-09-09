import { Suspense } from "react"
import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { PropertyTypeDistribution } from "@/components/dashboard/property-type-distribution"
import { PropertyValueDistribution } from "@/components/dashboard/property-value-distribution"
import { MaintenanceRequests } from "@/components/dashboard/maintenance-requests"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Loading from "@/components/loading"

export const metadata: Metadata = {
  title: "Dashboard | OnDo Real Estate",
  description: "Dashboard for OnDo Real Estate",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your property management business">
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </DashboardHeader>
      <Suspense fallback={<Loading />}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DashboardOverview />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Property Types</CardTitle>
                  <CardDescription>Distribution of property types</CardDescription>
                </CardHeader>
                <CardContent>
                  <PropertyTypeDistribution />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Rental Revenue</CardTitle>
                  <CardDescription>Monthly rental income</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PropertyValueDistribution />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tenant Applications</CardTitle>
                  <CardDescription>Recently submitted applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentLeads />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>Recent maintenance requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <MaintenanceRequests />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Performance</CardTitle>
                <CardDescription>Detailed property metrics and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Property performance metrics will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Management</CardTitle>
                <CardDescription>Tenant information and lease details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Tenant management content will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Revenue, expenses, and financial analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Financial reports will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
    </DashboardShell>
  )
}

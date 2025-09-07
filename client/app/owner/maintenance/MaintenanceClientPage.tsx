"use client"

import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { MaintenanceTable } from "@/components/dashboard/maintenance-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export default function MaintenanceClientPage() {
  const { toast } = useToast()

  useEffect(() => {
    // This effect will run only once after the component mounts
    // and display the toast message.
  }, []) // Empty dependency array ensures it runs only once

  const handleNewRequestClick = () => {
    toast({
      title: "Feature in development",
      description: "Adding maintenance requests is coming soon.",
      variant: "destructive",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Maintenance" text="Manage and track maintenance requests">
        <Button onClick={handleNewRequestClick}>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </DashboardHeader>

      <div className="bg-amber-50 p-4 rounded-md flex items-start gap-3 border border-amber-200 mb-4">
        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Maintenance Management in Development</p>
          <p className="text-sm text-amber-700">
            The maintenance management functionality is currently being developed. Some features may not be fully
            functional.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Maintenance Requests</CardTitle>
              <CardDescription>View and manage all maintenance requests</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="open" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Open Requests</CardTitle>
              <CardDescription>Maintenance requests that need attention</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="open" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>In Progress Requests</CardTitle>
              <CardDescription>Maintenance requests currently being addressed</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="in-progress" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Scheduled Requests</CardTitle>
              <CardDescription>Maintenance requests with scheduled service</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="scheduled" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Completed Requests</CardTitle>
              <CardDescription>Maintenance requests that have been resolved</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MaintenanceTable status="completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

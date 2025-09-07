"use client"

import { useState } from "react"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeadFormSheet } from "@/components/lead-form-sheet"
import { Plus } from "lucide-react"

export default function TenantApplicationsClientPage() {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)

  return (
    <DashboardShell>
      <DashboardHeader heading="Tenant Applications" text="Manage and track tenant applications">
        <Button onClick={() => setIsAddLeadOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Application
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Tenant Applications</CardTitle>
              <CardDescription>View and manage all tenant applications</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>New Applications</CardTitle>
              <CardDescription>Recently submitted tenant applications</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contacted" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Contacted Applications</CardTitle>
              <CardDescription>Applications where initial contact has been made</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="qualified" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Qualified Applications</CardTitle>
              <CardDescription>Applications that have passed initial screening</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Approved Applications</CardTitle>
              <CardDescription>Applications that have been approved</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>Applications that have been rejected</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <LeadFormSheet open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen} />
    </DashboardShell>
  )
}

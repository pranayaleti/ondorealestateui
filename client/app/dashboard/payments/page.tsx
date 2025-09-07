import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { PaymentsTable } from "@/components/dashboard/payments-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Payments | PropertyPro Management",
  description: "Manage rent payments and financial transactions",
}

export default function PaymentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Payments" text="Manage rent payments and financial transactions">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Payments</CardTitle>
              <CardDescription>View and manage all payment transactions</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <PaymentsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Received Payments</CardTitle>
              <CardDescription>Payments that have been successfully processed</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <PaymentsTable status="received" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Payments that are being processed</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <PaymentsTable status="pending" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Overdue Payments</CardTitle>
              <CardDescription>Payments that are past their due date</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <PaymentsTable status="overdue" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="refunded" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Refunded Payments</CardTitle>
              <CardDescription>Payments that have been refunded</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <PaymentsTable status="refunded" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

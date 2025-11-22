import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { AddTenantDialog } from "@/components/shared/add-tenant-dialog"

export default function SuperAdminTenants() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Tenant Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all tenant accounts in the system
          </p>
        </div>
        <AddTenantDialog />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tenants</CardTitle>
          <CardDescription>View and manage tenant accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Tenant management interface - connect to API to display and manage tenants
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


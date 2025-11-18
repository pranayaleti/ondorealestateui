import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function AdminTenants() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Tenant Management
          </CardTitle>
          <CardDescription>Manage all tenant accounts in the system</CardDescription>
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

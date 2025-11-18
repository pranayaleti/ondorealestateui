import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"

export default function SuperAdminOwners() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            Owner Management
          </CardTitle>
          <CardDescription>Manage all owner accounts in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Owner management interface - connect to API to display and manage owners
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


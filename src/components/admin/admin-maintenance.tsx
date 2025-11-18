import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench } from "lucide-react"

export default function AdminMaintenance() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-6 w-6" />
            Maintenance Staff Management
          </CardTitle>
          <CardDescription>Manage all maintenance staff accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Maintenance staff management interface - connect to API to display and manage maintenance accounts
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

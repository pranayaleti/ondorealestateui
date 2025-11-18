import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"

export default function AdminProperties() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            System Properties
          </CardTitle>
          <CardDescription>View all properties across the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Properties overview - connect to API to display all properties
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

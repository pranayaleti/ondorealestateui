import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export default function AdminFinances() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            System Finances
          </CardTitle>
          <CardDescription>View financial data across the entire system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Financial overview - connect to API to display system-wide financial data
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

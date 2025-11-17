import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OwnerPropertyManagement() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Property Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Detailed property management workflows are coming soon. You'll be able to configure maintenance preferences,
            assign managers, and automate communications from this page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            In the meantime feel free to continue using the existing owner tools to manage your portfolio.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


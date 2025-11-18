import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { hasPermission } from "@/lib/auth-utils"

export default function AdminManagers() {
  const { user } = useAuth()

  if (!user || !hasPermission(user.role, "canManageManagers")) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Manager Management
              </CardTitle>
              <CardDescription>Manage all manager accounts in the system</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Manager
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Manager management interface - connect to API to display and manage managers
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


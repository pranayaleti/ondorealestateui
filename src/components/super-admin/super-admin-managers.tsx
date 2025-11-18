import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { hasPermission } from "@/lib/auth-utils"
import { Link } from "react-router-dom"

export default function SuperAdminManagers() {
  const { user } = useAuth()

  if (!user || !hasPermission(user.role, "canManageManagers")) {
    return null
  }

  const canManageAdmins = hasPermission(user.role, "canManageAdmins")

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
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Manager management interface - connect to API to display and manage managers
          </p>
          
          {/* Super Admin Exclusive: Admin Management */}
          {canManageAdmins && (
            <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Shield className="h-5 w-5" />
                  Super Admin Exclusive
                </CardTitle>
                <CardDescription>Manage admin accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/super-admin/admins">
                  <Button variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900">
                    <Shield className="h-4 w-4 mr-2" />
                    Manage Admins
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}



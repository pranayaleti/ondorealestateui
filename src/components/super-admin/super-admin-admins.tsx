import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { hasPermission } from "@/lib/auth-utils"

export default function SuperAdminAdmins() {
  const { user } = useAuth()

  if (!user || !hasPermission(user.role, "canManageAdmins")) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Shield className="h-6 w-6" />
                Admin Management
              </CardTitle>
              <CardDescription className="text-purple-600 dark:text-purple-400">
                Super Admin Exclusive: Manage all admin accounts in the system
              </CardDescription>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-2">
              ⚡ Super Admin Authority
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              As a Super Admin, you have exclusive authority to create, modify, and manage admin accounts. 
              Admins have the same system-wide access as you, but cannot manage other admins or super admins.
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              Admin management interface - connect to API to display and manage admins
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


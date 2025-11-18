import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ProfileShell, ProfileSummaryCard } from "@/components/portal/profile"

export default function AdminProfile() {
  const { user } = useAuth()

  return (
    <ProfileShell
      title="Admin Profile"
      description="Manage your admin account"
      summary={<ProfileSummaryCard roleLabel="Admin" />}
    >
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Core information about your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">Admin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ProfileShell>
  )
}


import { Suspense } from "react"
import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserActivity } from "@/components/dashboard/user-activity"
import Loading from "@/components/loading"

export const metadata: Metadata = {
  title: "Profile | Property Management CRM",
  description: "Manage your profile",
}

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your account settings and preferences" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>

        <TabsContent value="activity">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <UserActivity />
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>

        <TabsContent value="security">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="current-password">Current Password</label>
                      <input id="current-password" type="password" className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="new-password">New Password</label>
                      <input id="new-password" type="password" className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="confirm-password">Confirm New Password</label>
                      <input id="confirm-password" type="password" className="w-full p-2 border rounded" />
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded">Update Password</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication is disabled</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded">Enable</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

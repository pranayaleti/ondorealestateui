import { Suspense } from "react"
import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Loading from "@/components/loading"

export const metadata: Metadata = {
  title: "Settings | Property Management CRM",
  description: "Manage your system settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your system settings and preferences" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsForm />
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>

        <TabsContent value="notifications">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Lead Notifications</p>
                        <p className="text-sm text-gray-500">Receive an email when a new lead is created</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="new-lead" className="mr-2" defaultChecked />
                        <label htmlFor="new-lead">Enabled</label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Lead Status Updates</p>
                        <p className="text-sm text-gray-500">Receive an email when a lead's status changes</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="lead-status" className="mr-2" defaultChecked />
                        <label htmlFor="lead-status">Enabled</label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Property Updates</p>
                        <p className="text-sm text-gray-500">Receive an email when a property is updated</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="property-updates" className="mr-2" />
                        <label htmlFor="property-updates">Enabled</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Urgent Lead Notifications</p>
                        <p className="text-sm text-gray-500">Receive a text message for high-priority leads</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="urgent-lead" className="mr-2" />
                        <label htmlFor="urgent-lead">Enabled</label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Appointment Reminders</p>
                        <p className="text-sm text-gray-500">Receive a text message reminder before appointments</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="appointment-reminder" className="mr-2" defaultChecked />
                        <label htmlFor="appointment-reminder">Enabled</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>

        <TabsContent value="appearance">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 cursor-pointer bg-white">
                      <div className="h-10 bg-white border rounded-md mb-2"></div>
                      <p className="text-center text-sm font-medium">Light</p>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer bg-gray-900">
                      <div className="h-10 bg-gray-800 border border-gray-700 rounded-md mb-2"></div>
                      <p className="text-center text-sm font-medium text-white">Dark</p>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer bg-gradient-to-b from-white to-gray-900">
                      <div className="h-10 bg-gradient-to-r from-white to-gray-800 border rounded-md mb-2"></div>
                      <p className="text-center text-sm font-medium">System</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dashboard Layout</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact View</p>
                        <p className="text-sm text-gray-500">Display more information in less space</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="compact-view" className="mr-2" />
                        <label htmlFor="compact-view">Enabled</label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Welcome Message</p>
                        <p className="text-sm text-gray-500">Display a welcome message on the dashboard</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="welcome-message" className="mr-2" defaultChecked />
                        <label htmlFor="welcome-message">Enabled</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>

        <TabsContent value="integrations">
          <Suspense fallback={<Loading />}>
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect with third-party services and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connected Services</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-sm text-gray-500">Connected on Apr 12, 2023</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm">Disconnect</button>
                    </div>

                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Twitter</p>
                          <p className="text-sm text-gray-500">Connected on Mar 4, 2023</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm">Disconnect</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Integrations</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-md flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-gray-500">Connect your Google account</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">Connect</button>
                    </div>

                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-gray-500">Connect your LinkedIn account</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">Connect</button>
                    </div>
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

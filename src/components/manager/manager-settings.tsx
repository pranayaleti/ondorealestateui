import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Moon, Sun, Laptop, CheckCircle } from "lucide-react"
import { US_TIMEZONES } from "@/constants"
import { useUserTimezone } from "@/hooks/use-user-timezone"

export default function ManagerSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    general: {
      theme: "light",
      language: "en-US",
      timezone: "America/Denver",
    },
    notifications: {
      email: {
        propertyAlerts: true,
        maintenanceRequests: true,
        tenantIssues: true,
        financialReports: true,
        leaseRenewals: true,
        ownerCommunications: true,
      },
      push: {
        urgentMaintenance: true,
        tenantPayments: true,
        leaseExpirations: false,
        ownerMessages: true,
      },
    },
    security: {
      twoFactor: false,
      sessionTimeout: "60",
      loginAlerts: true,
    },
    business: {
      defaultLeaseTerm: "12",
      maintenanceResponseTime: "24",
      autoBackup: true,
      dataRetention: "7",
    },
  })
  const { toast } = useToast()
  const { displayTimezone, storageTimezone } = useUserTimezone()

  const handleToggleChange = (category: string, subcategory: string, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as any)[subcategory],
          [setting]: !(prev[category as keyof typeof prev] as any)[subcategory][setting],
        },
      },
    }))
  }

  const handleSettingChange = (category: string, subcategory: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    // TODO: Implement API call to save settings
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manager Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your account preferences and business settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your general preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Theme</Label>
                  <Select
                    value={settings.general.theme}
                    onValueChange={(value) => handleSettingChange("general", "theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center">
                          <Laptop className="h-4 w-4 mr-2" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => handleSettingChange("general", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => handleSettingChange("general", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={displayTimezone.display} />
                    </SelectTrigger>
                    <SelectContent>
                      {US_TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Showing local time as {displayTimezone.display}. Records are saved using {storageTimezone.display}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Property Alerts</Label>
                    <p className="text-sm text-gray-500">New property listings and updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.propertyAlerts}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "propertyAlerts")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Requests</Label>
                    <p className="text-sm text-gray-500">New maintenance requests from tenants</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.maintenanceRequests}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "maintenanceRequests")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Tenant Issues</Label>
                    <p className="text-sm text-gray-500">Urgent tenant-related issues</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.tenantIssues}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "tenantIssues")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Financial Reports</Label>
                    <p className="text-sm text-gray-500">Monthly and quarterly financial reports</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.financialReports}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "financialReports")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lease Renewals</Label>
                    <p className="text-sm text-gray-500">Lease renewal reminders and updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.leaseRenewals}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "leaseRenewals")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Configure push notifications for your devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Urgent Maintenance</Label>
                    <p className="text-sm text-gray-500">Emergency maintenance requests</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push.urgentMaintenance}
                    onCheckedChange={() => handleToggleChange("notifications", "push", "urgentMaintenance")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Tenant Payments</Label>
                    <p className="text-sm text-gray-500">Payment received notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push.tenantPayments}
                    onCheckedChange={() => handleToggleChange("notifications", "push", "tenantPayments")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lease Expirations</Label>
                    <p className="text-sm text-gray-500">Lease expiration warnings</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push.leaseExpirations}
                    onCheckedChange={() => handleToggleChange("notifications", "push", "leaseExpirations")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactor}
                    onCheckedChange={() => handleToggleChange("security", "twoFactor", "true")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={settings.security.loginAlerts}
                    onCheckedChange={() => handleToggleChange("security", "loginAlerts", "true")}
                  />
                </div>

                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Select
                    value={settings.security.sessionTimeout}
                    onValueChange={(value) => handleSettingChange("security", "sessionTimeout", value)}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>Configure your business preferences and defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Default Lease Term (months)</Label>
                  <Select
                    value={settings.business.defaultLeaseTerm}
                    onValueChange={(value) => handleSettingChange("business", "defaultLeaseTerm", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="18">18 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Maintenance Response Time (hours)</Label>
                  <Select
                    value={settings.business.maintenanceResponseTime}
                    onValueChange={(value) => handleSettingChange("business", "maintenanceResponseTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Data Retention (years)</Label>
                  <Select
                    value={settings.business.dataRetention}
                    onValueChange={(value) => handleSettingChange("business", "dataRetention", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Automatic Data Backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup your data daily</p>
                </div>
                <Switch
                  checked={settings.business.autoBackup}
                  onCheckedChange={() => handleToggleChange("business", "autoBackup", "true")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900">
            <CheckCircle className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </Tabs>
    </div>
  )
}

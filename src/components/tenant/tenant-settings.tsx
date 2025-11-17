import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Shield, Globe, Moon, Sun, Smartphone, CheckCircle } from "lucide-react"
import { US_TIMEZONES } from "@/constants"
import { useUserTimezone } from "@/hooks/use-user-timezone"

export default function TenantSettings() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [settings, setSettings] = useState({
    notifications: {
      email: {
        maintenance: true,
        payments: true,
        leaseUpdates: true,
        announcements: false,
      },
      push: {
        urgentMaintenance: true,
        paymentReminders: true,
        leaseReminders: true,
      },
    },
    preferences: {
      theme: "light",
      language: "en-US",
      timezone: "America/Denver",
    },
    security: {
      twoFactor: false,
      sessionTimeout: "60",
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
        <h1 className="text-3xl font-bold">Tenant Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your account preferences and notifications</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

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
                    <Label>Maintenance Updates</Label>
                    <p className="text-sm text-gray-500">Receive notifications about maintenance requests and updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.maintenance}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "maintenance")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payment Reminders</Label>
                    <p className="text-sm text-gray-500">Get reminded when rent payments are due</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.payments}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "payments")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lease Updates</Label>
                    <p className="text-sm text-gray-500">Important updates about your lease agreement</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.leaseUpdates}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "leaseUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Property Announcements</Label>
                    <p className="text-sm text-gray-500">News and announcements from property management</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.announcements}
                    onCheckedChange={() => handleToggleChange("notifications", "email", "announcements")}
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
                    <p className="text-sm text-gray-500">Emergency maintenance notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push.urgentMaintenance}
                    onCheckedChange={() => handleToggleChange("notifications", "push", "urgentMaintenance")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payment Due Reminders</Label>
                    <p className="text-sm text-gray-500">Notifications when rent is almost due</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push.paymentReminders}
                    onCheckedChange={() => handleToggleChange("notifications", "push", "paymentReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lease Reminders</Label>
                    <p className="text-sm text-gray-500">Important lease-related notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push.leaseReminders}
                    onCheckedChange={() => handleToggleChange("notifications", "push", "leaseReminders")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>Configure your general application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) => handleSettingChange("preferences", "theme", value)}
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
                          <Smartphone className="h-4 w-4 mr-2" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => handleSettingChange("preferences", "language", value)}
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
                    value={settings.preferences.timezone}
                    onValueChange={(value) => handleSettingChange("preferences", "timezone", value)}
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
                    Viewing times in {displayTimezone.display}. We store the canonical timezone as {storageTimezone.display}.
                  </p>
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

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Password & Access</h4>
                <div className="space-y-4">
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Update Email Address
                  </Button>
                </div>
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

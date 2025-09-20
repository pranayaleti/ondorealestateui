import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Building,
  Settings,
  Shield
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

const getInitialProfileData = (user: any) => ({
  personalInfo: {
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "456 Investment Ave, Salt Lake City, UT 84101"
  },
  investmentPreferences: {
    monthlyReports: true,
    propertyAlerts: true,
    marketAnalysis: false,
    taxReminders: true
  },
  companyInfo: {
    companyName: "",
    services: {
      propertyManagement: true,
      maintenanceCoordination: true,
      tenantScreening: true,
      financialReporting: true
    }
  }
})

export default function OwnerProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(() => getInitialProfileData(user))

  // Update profile data when user data changes
  useEffect(() => {
    setProfileData(getInitialProfileData(user))
  }, [user])

  const handleInputChange = (section: string, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      investmentPreferences: {
        ...prev.investmentPreferences,
        [field]: value
      }
    }))
  }

  const handleServiceChange = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        services: {
          ...prev.companyInfo.services,
          [field]: value
        }
      }
    }))
  }

  const handleSave = () => {
    // TODO: Implement API call to update profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setProfileData(getInitialProfileData(user))
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Owner Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and investment preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mt-4">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-gray-500">Property Owner</p>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                
                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Properties Owned:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Units:</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Portfolio Value:</span>
                    <span className="font-medium">$8.5M</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="investment">Investment Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                      <Button size="sm" onClick={handleSave}>Save</Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.personalInfo.firstName}
                        onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.personalInfo.lastName}
                        onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.personalInfo.email}
                        onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.personalInfo.phone}
                        onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.personalInfo.address}
                      onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Preferences</CardTitle>
                  <CardDescription>Configure your investment and reporting preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Monthly Financial Reports</Label>
                        <p className="text-sm text-gray-500">Receive detailed monthly performance reports</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.investmentPreferences.monthlyReports}
                        onChange={(e) => handlePreferenceChange("monthlyReports", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Property Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified about important property events</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.investmentPreferences.propertyAlerts}
                        onChange={(e) => handlePreferenceChange("propertyAlerts", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Market Analysis</Label>
                        <p className="text-sm text-gray-500">Receive quarterly market analysis reports</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.investmentPreferences.marketAnalysis}
                        onChange={(e) => handlePreferenceChange("marketAnalysis", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Tax Document Reminders</Label>
                        <p className="text-sm text-gray-500">Annual tax document preparation reminders</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.investmentPreferences.taxReminders}
                        onChange={(e) => handlePreferenceChange("taxReminders", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave}>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Account Security</h4>
                    <div className="space-y-4">
                      <Button variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

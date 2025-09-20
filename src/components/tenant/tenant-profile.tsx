import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  Edit,
  Save,
  Camera,
  Key,
  Bell,
  CreditCard
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

// Mock tenant profile data - will be replaced with real data from API
const getInitialProfileData = (user: any) => ({
  personalInfo: {
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Smith",
    email: user?.email || "john.smith@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1990-05-15",
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "(555) 987-6543"
    }
  },
  leaseInfo: {
    propertyAddress: "123 Oak Street, Apt 2B",
    city: "Salt Lake City, UT 84101",
    leaseStart: "2023-09-16",
    leaseEnd: "2024-12-31",
    monthlyRent: 1850,
    securityDeposit: 1850,
    petDeposit: 200
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    maintenanceReminders: true,
    rentReminders: true,
    marketingEmails: false
  }
})

export default function TenantProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(() => getInitialProfileData(user))

  const handleSave = () => {
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg">
                      {profileData.personalInfo.firstName[0]}{profileData.personalInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-semibold text-lg mt-4">
                  {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                </h3>
                <p className="text-sm text-gray-500">{profileData.personalInfo.email}</p>
                <p className="text-sm text-gray-500 mt-1">{profileData.leaseInfo.propertyAddress}</p>
                
                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lease Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lease Expires:</span>
                    <span className="font-medium">{profileData.leaseInfo.leaseEnd}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly Rent:</span>
                    <span className="font-medium">${profileData.leaseInfo.monthlyRent}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="lease">Lease Details</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
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
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.personalInfo.lastName}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                        }))}
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
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.personalInfo.phone}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.personalInfo.dateOfBirth}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="emergencyName">Name</Label>
                        <Input
                          id="emergencyName"
                          value={profileData.personalInfo.emergencyContact.name}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              emergencyContact: { ...prev.personalInfo.emergencyContact, name: e.target.value }
                            }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyRelationship">Relationship</Label>
                        <Input
                          id="emergencyRelationship"
                          value={profileData.personalInfo.emergencyContact.relationship}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              emergencyContact: { ...prev.personalInfo.emergencyContact, relationship: e.target.value }
                            }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={profileData.personalInfo.emergencyContact.phone}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              emergencyContact: { ...prev.personalInfo.emergencyContact, phone: e.target.value }
                            }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lease" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lease Information</CardTitle>
                  <CardDescription>Your current lease details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Property Address</Label>
                      <p className="text-lg font-medium">{profileData.leaseInfo.propertyAddress}</p>
                      <p className="text-sm text-gray-500">{profileData.leaseInfo.city}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Monthly Rent</Label>
                      <p className="text-lg font-medium">${profileData.leaseInfo.monthlyRent}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Lease Start Date</Label>
                      <p className="text-lg font-medium">{profileData.leaseInfo.leaseStart}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Lease End Date</Label>
                      <p className="text-lg font-medium">{profileData.leaseInfo.leaseEnd}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Security Deposit</Label>
                      <p className="text-lg font-medium">${profileData.leaseInfo.securityDeposit}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Pet Deposit</Label>
                      <p className="text-lg font-medium">${profileData.leaseInfo.petDeposit}</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Lease Actions</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Request Lease Renewal
                      </Button>
                      <Button variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Add Occupant
                      </Button>
                      <Button variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        Request Additional Keys
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you'd like to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive general notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.emailNotifications}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, emailNotifications: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive urgent notifications via text message</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.smsNotifications}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, smsNotifications: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Maintenance Reminders</Label>
                        <p className="text-sm text-gray-500">Get notified about scheduled maintenance</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.maintenanceReminders}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, maintenanceReminders: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Rent Reminders</Label>
                        <p className="text-sm text-gray-500">Get reminded when rent is due</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.rentReminders}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, rentReminders: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.marketingEmails}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, marketingEmails: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
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
                    <h4 className="font-medium mb-4">Account Actions</h4>
                    <div className="space-y-4">
                      <Button variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable Two-Factor Authentication
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Update Email Address
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

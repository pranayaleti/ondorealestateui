import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Shield
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { authApi, ApiError, type PortfolioStats } from "@/lib/api"

const getInitialProfileData = (user: any) => ({
  personalInfo: {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
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
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(() => getInitialProfileData(user))

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Update profile data when user data changes
  useEffect(() => {
    console.log("Owner Profile - User data changed:", user)
    setProfileData(getInitialProfileData(user))
  }, [user])

  // Fetch portfolio statistics
  useEffect(() => {
    const fetchPortfolioStats = async () => {
      if (!user || user.role !== "owner") return

      try {
        setIsLoadingStats(true)
        const stats = await authApi.getPortfolioStats()
        setPortfolioStats(stats)
      } catch (error) {
        console.error("Error fetching portfolio stats:", error)
        // Set default values if API fails
        setPortfolioStats({
          propertiesOwned: 0,
          totalUnits: 0,
          portfolioValue: 0,
          formattedPortfolioValue: "$0.0M"
        })
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchPortfolioStats()
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


  const handleSave = async () => {
    if (!profileData.personalInfo.firstName.trim() || !profileData.personalInfo.lastName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (First Name, Last Name).",
        variant: "destructive",
      })
      return
    }

    setIsSavingProfile(true)
    try {
      const response = await authApi.updateProfile({
        firstName: profileData.personalInfo.firstName.trim(),
        lastName: profileData.personalInfo.lastName.trim(),
        phone: profileData.personalInfo.phone.trim() || undefined,
        address: profileData.personalInfo.address.trim() || undefined,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
      
      // Refresh user data in context
      console.log("About to call refreshUser...")
      await refreshUser()
      console.log("refreshUser completed")
      
      // Also update the profile data immediately with the response
      if (response.user) {
        console.log("Updating profile data with response:", response.user)
        setProfileData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            email: response.user.email,
            phone: response.user.phone || "",
            address: response.user.address || "",
          }
        }))
      }
      
      setIsEditing(false)
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : "Failed to update profile. Please try again."
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleCancel = () => {
    setProfileData(getInitialProfileData(user))
    setIsEditing(false)
  }

  const handlePasswordInputChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error", 
        description: "New password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)
    try {
      await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      toast({
        title: "Success",
        description: "Password changed successfully.",
      })

      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : "Failed to change password. Please try again."
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
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
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.propertiesOwned || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Units:</span>
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.totalUnits || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Portfolio Value:</span>
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.formattedPortfolioValue || "$0.0M"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              {/* <TabsTrigger value="investment">Investment Preferences</TabsTrigger> */}
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
                      <Button variant="outline" size="sm" onClick={handleCancel} disabled={isSavingProfile}>Cancel</Button>
                      <Button size="sm" onClick={handleSave} disabled={isSavingProfile}>
                        {isSavingProfile ? "Saving..." : "Save"}
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
                        onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.personalInfo.lastName}
                        onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
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
                        disabled={true}
                        className="bg-gray-50 text-gray-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.personalInfo.phone}
                        onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.personalInfo.address}
                      onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                      disabled={!isEditing || isSavingProfile}
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
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordInputChange("currentPassword", e.target.value)}
                          disabled={isChangingPassword}
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordInputChange("newPassword", e.target.value)}
                          disabled={isChangingPassword}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordInputChange("confirmPassword", e.target.value)}
                          disabled={isChangingPassword}
                        />
                      </div>
                      <Button 
                        onClick={handlePasswordChange}
                        disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      >
                        {isChangingPassword ? "Updating..." : "Update Password"}
                      </Button>
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

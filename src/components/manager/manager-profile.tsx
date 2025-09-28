import { useState, useEffect } from "react"
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
import { authApi, ApiError, type ManagerPortfolioStats } from "@/lib/api"

export default function ManagerProfile() {
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [portfolioStats, setPortfolioStats] = useState<ManagerPortfolioStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  

  // Update form data when user data changes
  useEffect(() => {
    console.log("Manager Profile - User data changed:", user)
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }))
    }
  }, [user])

  // Fetch portfolio statistics
  useEffect(() => {
    const fetchPortfolioStats = async () => {
      if (!user || user.role !== "manager") return

      try {
        setIsLoadingStats(true)
        const stats = await authApi.getPortfolioStats() as unknown as ManagerPortfolioStats
        setPortfolioStats(stats)
      } catch (error) {
        console.error("Error fetching manager portfolio stats:", error)
        // Set default values if API fails
        setPortfolioStats({
          propertiesManaged: 0,
          totalUnits: 0,
          activeTenants: 0,
          monthlyRevenue: 0,
          formattedMonthlyRevenue: "$0K",
          occupancyRate: 0
        })
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchPortfolioStats()
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
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
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
      
      // Refresh user data in context
      console.log("About to call refreshUser...")
      await refreshUser()
      console.log("refreshUser completed")
      
      // Also update the form data immediately with the response
      if (response.user) {
        console.log("Updating form data with response:", response.user)
        setFormData(prev => ({
          ...prev,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          phone: response.user.phone || "",
          address: response.user.address || "",
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
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    })
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
        <h1 className="text-3xl font-bold">Manager Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and property management preferences</p>
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
                <p className="text-sm text-gray-500">Property Manager</p>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>

                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Properties Managed:</span>
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.propertiesManaged || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Units:</span>
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.totalUnits || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active Tenants:</span>
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.activeTenants || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly Revenue:</span>
                    <span className="font-medium">
                      {isLoadingStats ? "..." : portfolioStats?.formattedMonthlyRevenue || "$0K"}
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
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                        value={formData.email}
                        disabled={true}
                        className="bg-gray-50 text-gray-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing || isSavingProfile}
                      placeholder="Enter your address"
                    />
                  </div>
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

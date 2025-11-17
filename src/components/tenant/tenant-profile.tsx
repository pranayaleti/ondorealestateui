import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageUploader } from "@/components/ui/image-uploader"
import { ProfilePictureViewer } from "@/components/ui/profile-picture-viewer"
import { User, Calendar, Edit, Save, Loader2, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { propertyApi, authApi, type Property } from "@/lib/api"

// Mock tenant profile data - will be replaced with real data from API
const getInitialProfileData = (user: any) => ({
  personalInfo: {
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Smith",
    email: user?.email || "john.smith@email.com",
    phone: user?.phone || "(555) 123-4567",
    address: user?.address || "",
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
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(() => getInitialProfileData(user))
  const [assignedProperty, setAssignedProperty] = useState<Property | null>(null)
  const [loadingProperty, setLoadingProperty] = useState(true)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  // Fetch assigned property data
  useEffect(() => {
    const fetchAssignedProperty = async () => {
      try {
        setLoadingProperty(true)
        const property = await propertyApi.getTenantProperty()
        setAssignedProperty(property)
        console.log("Fetched assigned property:", property)
      } catch (error) {
        console.error("Error fetching assigned property:", error)
        setAssignedProperty(null)
      } finally {
        setLoadingProperty(false)
      }
    }

    if (user?.role === "tenant") {
      fetchAssignedProperty()
    }
  }, [user])

  const handleSave = async () => {
    if (!profileData.personalInfo.firstName.trim() || !profileData.personalInfo.lastName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (First Name, Last Name).",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSavingProfile(true)
      await authApi.updateProfile({
        firstName: profileData.personalInfo.firstName,
        lastName: profileData.personalInfo.lastName,
        phone: profileData.personalInfo.phone,
        address: profileData.personalInfo.address
      })
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
      setIsEditing(false)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
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

  const handleProfilePictureUpdate = async (profilePictureUrl: string) => {
    try {
      setIsSavingProfile(true)
      
      await authApi.updateProfile({
        firstName: profileData.personalInfo.firstName,
        lastName: profileData.personalInfo.lastName,
        phone: profileData.personalInfo.phone,
        address: profileData.personalInfo.address,
        profilePicture: profilePictureUrl,
      })

      await refreshUser()
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      })
    } catch (error: any) {
      console.error('Error updating profile picture:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile picture. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSavingProfile(false)
    }
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

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsChangingPassword(true)
      await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      
      toast({
        title: "Success",
        description: "Password updated successfully.",
      })
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error: any) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
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
                  {user?.profilePicture ? (
                    <ProfilePictureViewer
                      imageSrc={user.profilePicture}
                      userName={`${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`}
                    />
                  ) : (
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback className="text-lg">
                        {profileData.personalInfo.firstName[0]}{profileData.personalInfo.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <ImageUploader 
                    onCropComplete={handleProfilePictureUpdate}
                    trigger={
                      <Button 
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
                <h3 className="font-semibold text-lg mt-4">
                  {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                </h3>
                <p className="text-sm text-gray-500">{profileData.personalInfo.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {loadingProperty ? "Loading..." : assignedProperty ? assignedProperty.title : "No property assigned"}
                </p>
                
                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lease Status:</span>
                    <span className="font-medium text-green-600">
                      {loadingProperty ? "..." : assignedProperty ? "Active" : "No Property"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lease Expires:</span>
                    <span className="font-medium">
                      {loadingProperty ? "..." : assignedProperty ? 
                        new Date(new Date(assignedProperty.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : 
                        "N/A"
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly Rent:</span>
                    <span className="font-medium">
                      {loadingProperty ? "..." : assignedProperty ? `$${assignedProperty.price || 0}` : "$0"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="lease">Lease Details</TabsTrigger>
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
                      <Button onClick={handleSave} disabled={isSavingProfile}>
                        {isSavingProfile ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
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
                        disabled={true}
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
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
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={profileData.personalInfo.address}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value }
                      }))}
                      disabled={!isEditing}
                      placeholder="Enter your address"
                      rows={3}
                    />
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
                  {loadingProperty ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2">Loading property details...</span>
                    </div>
                  ) : assignedProperty ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Property Name</Label>
                        <p className="text-lg font-medium">{assignedProperty.title}</p>
                        <p className="text-sm text-gray-500">{assignedProperty.addressLine1}, {assignedProperty.city}, {assignedProperty.state} {assignedProperty.zipcode}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Monthly Rent</Label>
                        <p className="text-lg font-medium">${assignedProperty.price || 0}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Lease Start Date</Label>
                        <p className="text-lg font-medium">{new Date(assignedProperty.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Lease End Date</Label>
                        <p className="text-lg font-medium">
                          {new Date(new Date(assignedProperty.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Property Type</Label>
                        <p className="text-lg font-medium capitalize">{assignedProperty.type}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Bedrooms/Bathrooms</Label>
                        <p className="text-lg font-medium">{assignedProperty.bedrooms || 'N/A'} bed / {assignedProperty.bathrooms || 'N/A'} bath</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Square Footage</Label>
                        <p className="text-lg font-medium">{assignedProperty.sqft || 'N/A'} sq ft</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Property Status</Label>
                        <p className="text-lg font-medium capitalize">{assignedProperty.status}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No property assigned to your account.</p>
                    </div>
                  )}

                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Lease Actions</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Request Lease Renewal
                        coming soon...
                      </Button>
                      <Button variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Add Occupant coming soon...
                      </Button>
                    </div>
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
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          disabled={isChangingPassword}
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          disabled={isChangingPassword}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          disabled={isChangingPassword}
                        />
                      </div>
                      <Button 
                        onClick={handlePasswordChange}
                        disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      >
                        {isChangingPassword ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
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

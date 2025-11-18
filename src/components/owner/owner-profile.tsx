import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageUploader } from "@/components/ui/image-uploader"
import { ProfilePictureViewer } from "@/components/ui/profile-picture-viewer"
import { Upload, User, Phone, Building, Mail, DollarSign } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { authApi, propertyApi, ApiError, type PortfolioStats } from "@/lib/api"
import { ProfileShell, ProfileSummaryCard, type SummaryMetric } from "@/components/portal/profile"
import { AddressForm, type AddressFormValues } from "@/components/forms/address-form"
import { parseAddressString, formatAddressFields } from "@/utils/address"

const getInitialProfileData = (user: any) => ({
  personalInfo: {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || "",
    address: user?.address || "",
    bio: user?.bio || ""
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
  },
  notifications: {
    email: {
      marketing: true,
      maintenance: true,
      payments: true,
      leases: true,
      messages: true,
    },
    push: {
      maintenance: true,
      payments: true,
      leases: false,
      messages: true,
    },
  },
  billing: {
    plan: "professional",
    paymentMethod: "visa",
    autoRenew: true,
  }
})

const buildAddressFormValue = (address?: string | null): AddressFormValues => {
  const parsed = parseAddressString(address)
  return {
    addressType: "home",
    addressLine1: parsed.line1,
    addressLine2: parsed.line2,
    city: parsed.city,
    state: parsed.state,
    postalCode: parsed.postalCode,
  }
}

const formatAddressFromForm = (value: AddressFormValues) => {
  return formatAddressFields({
    line1: value.addressLine1,
    line2: value.addressLine2,
    city: value.city,
    state: value.state,
    postalCode: value.postalCode,
  })
}

export default function OwnerProfile() {
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [profileData, setProfileData] = useState(() => getInitialProfileData(user))
  const [addressFormValue, setAddressFormValue] = useState<AddressFormValues>(() => buildAddressFormValue(user?.address))

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>({
    propertiesOwned: 0,
    activeTenants: 0,
    portfolioValue: 0,
    formattedPortfolioValue: "$0K"
  })
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  // Update profile data when user data changes
  useEffect(() => {
    console.log("Owner Profile - User data changed:", user)
    setProfileData(getInitialProfileData(user))
    setAddressFormValue(buildAddressFormValue(user?.address))
  }, [user])

  // Fetch portfolio statistics from properties API
  useEffect(() => {
    const fetchPortfolioStats = async () => {
      if (!user || user.role !== "owner") return

      try {
        setIsLoadingStats(true)
        console.log("Fetching portfolio stats for owner:", user.id)
        
        // Get properties data to calculate stats
        const properties = await propertyApi.getProperties()
        console.log("Properties received:", properties)
        
        // Calculate stats from properties data
        const propertiesOwned = properties.length
        const propertiesWithTenants = properties.filter(p => p.tenantId)
        const activeTenants = propertiesWithTenants.length
        
        // Calculate total monthly rent (portfolio value)
        const totalMonthlyRent = propertiesWithTenants.reduce((sum, property) => {
          return sum + (property.price || 0)
        }, 0)
        
        // Format portfolio value
        const formattedPortfolioValue = totalMonthlyRent > 0 
          ? `$${(totalMonthlyRent / 1000).toFixed(1)}K/month`
          : "$0/month"
        
        const stats = {
          propertiesOwned,
          activeTenants,
          portfolioValue: totalMonthlyRent,
          formattedPortfolioValue
        }
        
        console.log("Calculated portfolio stats:", stats)
        setPortfolioStats(stats)
      } catch (error) {
        console.error("Error fetching portfolio stats:", error)
        // Set default values if API fails
        setPortfolioStats({
          propertiesOwned: 0,
          activeTenants: 0,
          portfolioValue: 0,
          formattedPortfolioValue: "$0/month"
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

  const handleAddressFormChange = (nextValue: AddressFormValues) => {
    setAddressFormValue(nextValue)
    handleInputChange("personalInfo", "address", formatAddressFromForm(nextValue))
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
      await authApi.updateProfile({
        firstName: profileData.personalInfo.firstName.trim(),
        lastName: profileData.personalInfo.lastName.trim(),
        phone: profileData.personalInfo.phone.trim() || undefined,
        address: profileData.personalInfo.address.trim() || undefined,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
      
      await refreshUser()
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


  const handleProfilePictureUpdate = async (profilePictureUrl: string) => {
    try {
      setIsSavingProfile(true)
      
      // Update profile picture in the backend
      await authApi.updateProfile({
        firstName: profileData.personalInfo.firstName,
        lastName: profileData.personalInfo.lastName,
        phone: profileData.personalInfo.phone,
        address: profileData.personalInfo.address,
        profilePicture: profilePictureUrl,
      })

      // Update the user context to refresh the profile picture
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

  const summaryMetrics: SummaryMetric[] = [
    {
      id: "properties",
      label: "Properties Owned",
      value: portfolioStats?.propertiesOwned || 0,
      icon: <Building className="h-4 w-4" />,
      href: "/owner/properties",
      loading: isLoadingStats,
    },
    {
      id: "tenants",
      label: "Active Tenants",
      value: portfolioStats?.activeTenants || 0,
      icon: <User className="h-4 w-4" />,
      href: "/owner/tenants",
      loading: isLoadingStats,
    },
    {
      id: "value",
      label: "Portfolio Value",
      value: <span className="text-primary">{portfolioStats?.formattedPortfolioValue || "$0K"}</span>,
      icon: <DollarSign className="h-4 w-4" />,
      href: "/owner/finances",
      loading: isLoadingStats,
    },
  ]

  return (
    <ProfileShell
      title="My Profile"
      description="Manage your personal information and account settings"
      summary={
        <ProfileSummaryCard
          roleLabel="Property Owner"
          metrics={summaryMetrics}
          onAvatarChange={handleProfilePictureUpdate}
          isAvatarUpdating={isSavingProfile}
        />
      }
    >
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="personal" className="py-2.5">Personal Info</TabsTrigger>
          <TabsTrigger value="security" className="py-2.5">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="py-2.5">Notifications</TabsTrigger>
          <TabsTrigger value="billing" className="py-2.5">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>Update your personal and business information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                    <div className="relative mb-4">
                      {user?.profilePicture ? (
                        <ProfilePictureViewer
                          imageSrc={user.profilePicture}
                          userName={`${user.firstName} ${user.lastName}`}
                        />
                      ) : (
                        <Avatar className="h-32 w-32 ring-4 ring-background shadow-lg">
                          <AvatarImage src={user?.profilePicture} />
                          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <ImageUploader 
                      onCropComplete={handleProfilePictureUpdate}
                      trigger={
                        <Button variant="outline" size="sm" className="shadow-sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                      }
                    />
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        value={`${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`.trim()}
                        onChange={(e) => {
                          const names = e.target.value.split(' ').filter(n => n)
                          handleInputChange("personalInfo", "firstName", names[0] || "")
                          handleInputChange("personalInfo", "lastName", names.slice(1).join(' ') || "")
                        }}
                        className="pl-9 h-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.personalInfo.phone}
                        onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                        className="pl-9 h-10"
                        placeholder="555-123-4567"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        value={profileData.personalInfo.company}
                        onChange={(e) => handleInputChange("personalInfo", "company", e.target.value)}
                        className="pl-9 h-10"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="owner-profile-address" className="text-sm font-medium">Address</Label>
                    <AddressForm
                      value={addressFormValue}
                      onChange={handleAddressFormChange}
                      disabled={isSavingProfile}
                      idPrefix="owner-profile"
                      className="bg-muted/30 shadow-none border border-border/60"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.personalInfo.email}
                        disabled={true}
                        className="pl-9 h-10 bg-muted/50 text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>Email cannot be changed</span>
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.personalInfo.bio}
                      onChange={(e) => handleInputChange("personalInfo", "bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">Share a brief description about yourself</p>
                  </div>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end mt-8 pt-6 border-t">
                <Button onClick={handleSave} disabled={isSavingProfile} className="min-w-[140px] shadow-sm">
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4 text-base">Email Notifications</h4>
                <div className="space-y-3 pl-1">
                  {Object.entries(profileData.notifications.email).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Label className="font-normal capitalize cursor-pointer flex-1">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          setProfileData(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              email: {
                                ...prev.notifications.email,
                                [key]: e.target.checked
                              }
                            }
                          }))
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-base">Push Notifications</h4>
                <div className="space-y-3 pl-1">
                  {Object.entries(profileData.notifications.push).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Label className="font-normal capitalize cursor-pointer flex-1">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          setProfileData(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              push: {
                                ...prev.notifications.push,
                                [key]: e.target.checked
                              }
                            }
                          }))
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSave} disabled={isSavingProfile} className="shadow-sm">
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4 text-base">Current Plan</h4>
                <div className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold capitalize text-lg">{profileData.billing.plan}</p>
                      <p className="text-sm text-muted-foreground mt-1">Active subscription</p>
                    </div>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-base">Payment Method</h4>
                <div className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold capitalize text-lg">{profileData.billing.paymentMethod}</p>
                      <p className="text-sm text-muted-foreground mt-1">•••• •••• •••• 4242</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div className="flex-1">
                  <Label className="font-medium cursor-pointer">Auto-renew subscription</Label>
                  <p className="text-sm text-muted-foreground mt-1">Automatically renew your subscription</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.billing.autoRenew}
                  onChange={(e) => {
                    setProfileData(prev => ({
                      ...prev,
                      billing: {
                        ...prev.billing,
                        autoRenew: e.target.checked
                      }
                    }))
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button onClick={handleSave} disabled={isSavingProfile} className="shadow-sm">
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Security Settings</CardTitle>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ProfileShell>
  )
}

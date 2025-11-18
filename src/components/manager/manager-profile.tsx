import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageUploader } from "@/components/ui/image-uploader"
import { ProfilePictureViewer } from "@/components/ui/profile-picture-viewer"
import { 
  Shield,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Lock,
  Building2,
  Users,
  DollarSign,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { authApi, ApiError, type ManagerPortfolioStats, type InvitedUser } from "@/lib/api"

const defaultAddressFields = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
}

const parseAddressString = (address?: string | null) => {
  if (!address) {
    return { ...defaultAddressFields }
  }

  const segments = address
    .split(",")
    .map(segment => segment.trim())
    .filter(Boolean)

  return {
    line1: segments[0] || "",
    line2: segments[1] || "",
    city: segments[2] || "",
    state: segments[3] || "",
    postalCode: segments.slice(4).join(", ") || "",
  }
}

const formatAddressFields = (fields: typeof defaultAddressFields) => {
  return [fields.line1, fields.line2, fields.city, fields.state, fields.postalCode]
    .filter(part => part && part.trim().length > 0)
    .join(", ")
}

export default function ManagerProfile() {
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const initialAddress = parseAddressString(user?.address)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    addressLine1: initialAddress.line1,
    addressLine2: initialAddress.line2,
    city: initialAddress.city,
    state: initialAddress.state,
    postalCode: initialAddress.postalCode,
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
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([])
  const [isLoadingInvited, setIsLoadingInvited] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  

  // Update form data when user data changes
  useEffect(() => {
    console.log("Manager Profile - User data changed:", user)
    if (user) {
      const parsedAddress = parseAddressString(user.address)
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        addressLine1: parsedAddress.line1,
        addressLine2: parsedAddress.line2,
        city: parsedAddress.city,
        state: parsedAddress.state,
        postalCode: parsedAddress.postalCode,
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

  // Fetch invited users to compute active owners count
  useEffect(() => {
    const fetchInvited = async () => {
      if (!user || user.role !== "manager") return
      try {
        setIsLoadingInvited(true)
        const users = await authApi.getInvitedUsers()
        setInvitedUsers(users)
      } catch (error) {
        console.error("Error fetching invited users:", error)
        setInvitedUsers([])
      } finally {
        setIsLoadingInvited(false)
      }
    }
    fetchInvited()
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
      await authApi.updateProfile({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || undefined,
        address: formatAddressFields({
          line1: formData.addressLine1,
          line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        }) || undefined,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
      
      await refreshUser()
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
    const parsedAddress = parseAddressString(user?.address)
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      addressLine1: parsedAddress.line1,
      addressLine2: parsedAddress.line2,
      city: parsedAddress.city,
      state: parsedAddress.state,
      postalCode: parsedAddress.postalCode,
    })
    setIsEditing(false)
  }

  const handleProfilePictureUpdate = async (profilePictureUrl: string) => {
    try {
      setIsSavingProfile(true)
      
      await authApi.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formatAddressFields({
          line1: formData.addressLine1,
          line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        }),
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manager Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account and property management preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardContent className="pt-8 pb-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  {user?.profilePicture ? (
                    <ProfilePictureViewer
                      imageSrc={user.profilePicture}
                      userName={`${user.firstName} ${user.lastName}`}
                    />
                  ) : (
                    <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <ImageUploader 
                    onCropComplete={handleProfilePictureUpdate}
                    trigger={
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute bottom-0 right-0 rounded-full h-9 w-9 p-0 shadow-md hover:shadow-lg transition-shadow border-2 border-background"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
                <h3 className="font-semibold text-xl mt-2 mb-1">
                  {user?.firstName} {user?.lastName}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                  <User className="h-3.5 w-3.5" />
                  <span>Property Manager</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="break-all">{user?.email}</span>
                </div>

                <div className="w-full space-y-4 pt-6 border-t">
                  <Link to="/dashboard/properties" className="block">
                    <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>Properties Managed</span>
                      </div>
                      <span className="font-semibold text-base">
                        {isLoadingStats ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          portfolioStats?.propertiesManaged || 0
                        )}
                      </span>
                    </div>
                  </Link>
                  <Link to="/dashboard/owners" className="block">
                    <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Active Owners</span>
                      </div>
                      <span className="font-semibold text-base">
                        {(isLoadingInvited || isLoadingStats) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          invitedUsers.filter(u => u.role === "owner" && u.isActive).length
                        )}
                      </span>
                    </div>
                  </Link>
                  <Link to="/dashboard/tenants" className="block">
                    <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Active Tenants</span>
                      </div>
                      <span className="font-semibold text-base">
                        {(isLoadingInvited || isLoadingStats) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          invitedUsers.filter(u => u.role === "tenant" && u.isActive).length
                        )}
                      </span>
                    </div>
                  </Link>
                  <Link to="/dashboard/finances" className="block">
                    <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Monthly Revenue</span>
                      </div>
                      <span className="font-semibold text-base text-primary">
                        {isLoadingStats ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          portfolioStats?.formattedMonthlyRevenue || "$0K"
                        )}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-11">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-start justify-between pb-4">
                  <div>
                    <CardTitle className="text-2xl mb-1">Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancel} 
                        disabled={isSavingProfile}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSave} 
                        disabled={isSavingProfile}
                        className="gap-2"
                      >
                        {isSavingProfile ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        disabled={true}
                        className="bg-muted text-muted-foreground cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Lock className="h-3 w-3" />
                        Email cannot be changed
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Address Lines
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="Building / Street"
                      />
                      <Input
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="Area / Locality"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        disabled={!isEditing || isSavingProfile}
                        className={!isEditing ? "bg-muted" : ""}
                        placeholder="ZIP / PIN"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl mb-1 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security and password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Change Password
                      </h4>
                      <p className="text-sm text-muted-foreground mb-6">
                        Update your password to keep your account secure. Use a strong password with at least 8 characters.
                      </p>
                      <div className="space-y-5 max-w-lg">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="currentPassword" 
                              type={showPasswords.current ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => handlePasswordInputChange("currentPassword", e.target.value)}
                              disabled={isChangingPassword}
                              placeholder="Enter your current password"
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                              disabled={isChangingPassword}
                            >
                              {showPasswords.current ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input 
                              id="newPassword" 
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => handlePasswordInputChange("newPassword", e.target.value)}
                              disabled={isChangingPassword}
                              placeholder="Enter your new password"
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                              disabled={isChangingPassword}
                            >
                              {showPasswords.new ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                          {passwordData.newPassword && passwordData.newPassword.length < 8 && (
                            <p className="text-xs text-destructive">
                              Password must be at least 8 characters long
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input 
                              id="confirmPassword" 
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => handlePasswordInputChange("confirmPassword", e.target.value)}
                              disabled={isChangingPassword}
                              placeholder="Confirm your new password"
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                              disabled={isChangingPassword}
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                          {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                            <p className="text-xs text-destructive">
                              Passwords do not match
                            </p>
                          )}
                        </div>
                        <Button 
                          onClick={handlePasswordChange}
                          disabled={
                            isChangingPassword || 
                            !passwordData.currentPassword || 
                            !passwordData.newPassword || 
                            !passwordData.confirmPassword ||
                            passwordData.newPassword.length < 8 ||
                            passwordData.newPassword !== passwordData.confirmPassword
                          }
                          className="gap-2"
                        >
                          {isChangingPassword ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Updating Password...
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4" />
                              Update Password
                            </>
                          )}
                        </Button>
                      </div>
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

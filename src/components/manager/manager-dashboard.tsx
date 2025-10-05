import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Building, 
  AlertTriangle,
  Clock,
  BarChart3,
  UserPlus,
  Mail,
  Users,
  MapPin,
  Check,
  X,
  Shield,
  ShieldOff
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { propertyApi, authApi, leadApi, ApiError, type Property, type InvitedUser, type Lead } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { PropertyDetailModal } from "@/components/property-detail-modal"

export default function ManagerDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [properties, setProperties] = useState<Property[]>([])
  const [pendingProperties, setPendingProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  
  // Invite functionality
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "owner" as "owner" | "tenant"
  })
  const [isSendingInvite, setIsSendingInvite] = useState(false)
  
  // Invited users
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  
  // Property detail modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showPropertyDetail, setShowPropertyDetail] = useState(false)
  
  // Leads functionality
  const [leads, setLeads] = useState<Lead[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)

  useEffect(() => {
    fetchDashboardData()
    fetchInvitedUsers()
    fetchLeads()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch all properties and filter for pending ones
      const allProps = await propertyApi.getProperties()
      const pendingProps = allProps.filter(p => p.status === "pending")
      
      setProperties(allProps)
      setPendingProperties(pendingProps)
      
      console.log("Fetched properties:", allProps)
      console.log("Properties with owners:", allProps.filter(p => p.owner))
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchInvitedUsers = async () => {
    try {
      setLoadingUsers(true)
      const users = await authApi.getInvitedUsers()
      console.log("Fetched users:", users) // Debug log
      setInvitedUsers(users)
    } catch (error) {
      console.error("Failed to fetch invited users:", error)
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingUsers(false)
    }
  }

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true)
      const managerLeads = await leadApi.getManagerLeads()
      setLeads(managerLeads)
    } catch (error) {
      console.error("Failed to fetch leads:", error)
      toast({
        title: "Error",
        description: "Failed to load leads. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingLeads(false)
    }
  }

  // Calculate stats from real data
  const stats = {
    totalProperties: properties.length,
    pendingReview: pendingProperties.length,
    approvedProperties: properties.filter(p => p.status === "approved").length,
    rejectedProperties: properties.filter(p => p.status === "rejected").length,
  }

  const handlePropertyStatusUpdate = async (propertyId: string, status: 'approved' | 'rejected') => {
    try {
      await propertyApi.updatePropertyStatus(propertyId, status)
      
      toast({
        title: "Property Updated",
        description: `Property has been ${status}.`,
        duration: 1000, // 4 seconds for property updates
      })
      
      // Refresh properties to show updated status
      fetchDashboardData()
      
      // Close modal if it's open
      if (showPropertyDetail) {
        setShowPropertyDetail(false)
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : `Failed to ${status} property. Please try again.`
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 6000, // 6 seconds for error messages
      })
    }
  }

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property)
    setShowPropertyDetail(true)
  }

  const handleLeadStatusUpdate = async (leadId: string, status: Lead['status']) => {
    try {
      await leadApi.updateLeadStatus(leadId, status)
      
      toast({
        title: "Lead Updated",
        description: `Lead status updated to ${status}.`,
      })
      
      // Refresh leads to show updated status
      fetchLeads()
    } catch (error) {
      console.error("Failed to update lead status:", error)
      toast({
        title: "Error",
        description: "Failed to update lead status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUserStatusUpdate = async (userId: string, isActive: boolean) => {
    try {
      await authApi.updateUserStatus(userId, isActive)
      
      toast({
        title: "User Status Updated",
        description: `User has been ${isActive ? 'enabled' : 'disabled'}.`,
        duration: 4000, // 4 seconds for user status updates
      })
      
      // Refresh users list
      fetchInvitedUsers()
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : `Failed to ${isActive ? 'enable' : 'disable'} user. Please try again.`
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 6000, // 6 seconds for error messages
      })
    }
  }

  const handleSendInvite = async () => {
    if (!inviteData.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
        duration: 4000, // 4 seconds for validation errors
      })
      return
    }

    setIsSendingInvite(true)
    try {
      await authApi.invite({
        email: inviteData.email.trim(),
        role: inviteData.role,
      })

      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${inviteData.email} as ${inviteData.role}.`,
        duration: 5000, // 5 seconds for successful invitations
      })

      // Clear invite form and refresh users
      setInviteData({
        email: "",
        role: "owner"
      })
      
      // Refresh invited users list
      fetchInvitedUsers()
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : "Failed to send invitation. Please try again."
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 6000, // 6 seconds for error messages
      })
    } finally {
      setIsSendingInvite(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.firstName} {user?.lastName}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your property management overview.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="owner-properties">Owner Properties</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="my-users">My Users</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProperties}</div>
                <p className="text-xs text-muted-foreground">All registered properties</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingReview}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approvedProperties}</div>
                <p className="text-xs text-muted-foreground">Active properties</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejectedProperties}</div>
                <p className="text-xs text-muted-foreground">Rejected submissions</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Property Submissions</CardTitle>
              <CardDescription>Latest properties submitted for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProperties.slice(0, 5).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Building className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-gray-600">{property.addressLine1}, {property.city}</p>
                        {property.owner && (
                          <p className="text-xs text-gray-500">Owner: {property.owner.firstName} {property.owner.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProperty(property)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePropertyStatusUpdate(property.id, 'approved')}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePropertyStatusUpdate(property.id, 'rejected')}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingProperties.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No pending properties</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <Badge variant={
                      property.status === "approved" ? "default" : 
                      property.status === "rejected" ? "destructive" : 
                      "secondary"
                    }>
                      {property.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{property.addressLine1}, {property.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize">{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owner:</span>
                      <span>{property.owner ? `${property.owner.firstName} ${property.owner.lastName}` : 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProperty(property)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    {property.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handlePropertyStatusUpdate(property.id, 'approved')}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handlePropertyStatusUpdate(property.id, 'rejected')}
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {properties.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Properties will appear here once submitted by owners.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="owner-properties" className="space-y-4">
          {/* Owner Properties Grouped View */}
          {(() => {
            // Group properties by owner
            const propertiesByOwner = properties.reduce((acc, property) => {
              if (property.owner) {
                const ownerKey = property.owner.id;
                if (!acc[ownerKey]) {
                  acc[ownerKey] = {
                    owner: property.owner,
                    properties: []
                  };
                }
                acc[ownerKey].properties.push(property);
              }
              return acc;
            }, {} as Record<string, { owner: any, properties: Property[] }>);

            const ownerGroups = Object.values(propertiesByOwner);

            if (ownerGroups.length === 0) {
              return (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No owners found</h3>
                  <p className="text-gray-600">Property owners will appear here once they submit properties.</p>
                </div>
              );
            }

            return (
              <div className="space-y-6">
                {ownerGroups.map(({ owner, properties: ownerProperties }) => (
                  <Card key={owner.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {owner.firstName} {owner.lastName}
                            </CardTitle>
                            <CardDescription>{owner.email}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {ownerProperties.length} {ownerProperties.length === 1 ? 'Property' : 'Properties'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ownerProperties.map((property) => (
                          <Card key={property.id} className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">{property.title}</CardTitle>
                                <Badge variant={
                                  property.status === "approved" ? "default" : 
                                  property.status === "rejected" ? "destructive" : 
                                  "secondary"
                                }>
                                  {property.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                </Badge>
                              </div>
                              <CardDescription className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {property.addressLine1}, {property.city}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Type:</span>
                                  <span className="capitalize">{property.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Submitted:</span>
                                  <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Photos:</span>
                                  <span>{property.photos?.length || 0}</span>
                                </div>
                              </div>
                              
                              {/* Action buttons */}
                              <div className="flex gap-2 mt-3 pt-3 border-t">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewProperty(property)}
                                  className="flex-1 text-xs"
                                >
                                  View Details
                                </Button>
                                {property.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handlePropertyStatusUpdate(property.id, 'approved')}
                                      className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handlePropertyStatusUpdate(property.id, 'rejected')}
                                      className="flex-1 text-xs"
                                    >
                                      <X className="h-3 w-3 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </TabsContent>

        <TabsContent value="my-users" className="space-y-4">
          {/* My Invited Users */}
          {loadingUsers ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading users...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Owners Section */}
              {(() => {
                const owners = invitedUsers.filter(user => user.role === 'owner');
                if (owners.length > 0) {
                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Property Owners ({owners.length})
                        </CardTitle>
                        <CardDescription>Owners you have invited to the platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {owners.map((owner) => (
                            <Card key={owner.id} className="border-l-4 border-l-green-500">
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm font-medium">
                                    {owner.firstName} {owner.lastName}
                                  </CardTitle>
                                  <Badge variant="default">Owner</Badge>
                                </div>
                                <CardDescription>{owner.email}</CardDescription>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Properties:</span>
                                    <span>{owner.propertyCount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Joined:</span>
                                    <span>{new Date(owner.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
                return null;
              })()}

              {/* Tenants Section */}
              {(() => {
                const tenants = invitedUsers.filter(user => user.role === 'tenant');
                if (tenants.length > 0) {
                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Tenants ({tenants.length})
                        </CardTitle>
                        <CardDescription>Tenants you have invited to the platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tenants.map((tenant) => (
                            <Card key={tenant.id} className="border-l-4 border-l-purple-500">
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm font-medium">
                                    {tenant.firstName} {tenant.lastName}
                                  </CardTitle>
                                  <Badge variant="secondary">Tenant</Badge>
                                </div>
                                <CardDescription>{tenant.email}</CardDescription>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Joined:</span>
                                    <span>{new Date(tenant.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
                return null;
              })()}

              {/* Empty State */}
              {invitedUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users invited yet</h3>
                  <p className="text-gray-600">Users you invite will appear here. Use the User Management tab to send invitations.</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="user-management" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Invite Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Invite Users
                </CardTitle>
                <CardDescription>Send invitations to property owners and tenants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="inviteEmail">Email Address</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={inviteData.email}
                    onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isSendingInvite}
                  />
                </div>
                <div>
                  <Label htmlFor="inviteRole">Role</Label>
                  <Select 
                    value={inviteData.role} 
                    onValueChange={(value: "owner" | "tenant") => setInviteData(prev => ({ ...prev, role: value }))}
                    disabled={isSendingInvite}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Property Owner</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleSendInvite}
                  disabled={isSendingInvite || !inviteData.email.trim()}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isSendingInvite ? "Sending Invitation..." : "Send Invitation"}
                </Button>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Manage Users
                </CardTitle>
                <CardDescription>Control user access and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="text-center py-8">
                    <div className="text-sm text-gray-500">Loading users...</div>
                  </div>
                ) : invitedUsers.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {invitedUsers.map((user) => {
                      console.log(`User ${user.firstName} ${user.lastName} - isActive:`, user.isActive) // Debug log
                      return (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            user.role === 'owner' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            <Users className={`h-4 w-4 ${
                              user.role === 'owner' ? 'text-blue-600' : 'text-purple-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={user.role === 'owner' ? 'default' : 'secondary'} className="text-xs">
                                {user.role}
                              </Badge>
                              {user.role === 'owner' && (
                                <span className="text-xs text-gray-500">
                                  {user.propertyCount} properties
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={`user-${user.id}`}
                                checked={user.isActive}
                                onChange={() => handleUserStatusUpdate(user.id, true)}
                                className="text-green-600"
                              />
                              <Shield className="h-4 w-4 text-green-600" />
                              <span className="text-xs text-green-600">Enable</span>
                            </label>
                          </div>
                          <div className="flex items-center gap-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={`user-${user.id}`}
                                checked={!user.isActive}
                                onChange={() => handleUserStatusUpdate(user.id, false)}
                                className="text-red-600"
                              />
                              <ShieldOff className="h-4 w-4 text-red-600" />
                              <span className="text-xs text-red-600">Disable</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No users found</p>
                    <p className="text-xs text-gray-400">Invited users will appear here</p>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-6">
                  <h4 className="font-medium mb-2 text-sm">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm"
                      variant="outline" 
                      onClick={() => setInviteData({ email: "", role: "owner" })}
                      disabled={isSendingInvite}
                      className="text-xs"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Invite Owner
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline" 
                      onClick={() => setInviteData({ email: "", role: "tenant" })}
                      disabled={isSendingInvite}
                      className="text-xs"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Invite Tenant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Property Leads
              </CardTitle>
              <CardDescription>
                Manage tenant inquiries and leads from your properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingLeads ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading leads...</p>
                </div>
              ) : leads.length > 0 ? (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{lead.tenantName}</h4>
                          <p className="text-sm text-gray-600">{lead.tenantEmail} • {lead.tenantPhone}</p>
                        </div>
                        <Badge variant={
                          lead.status === "new" ? "secondary" :
                          lead.status === "contacted" ? "default" :
                          lead.status === "qualified" ? "default" :
                          lead.status === "converted" ? "default" :
                          "outline"
                        }>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{lead.propertyTitle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{lead.propertyAddress}, {lead.propertyCity}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {lead.propertyType} • Owner: {lead.ownerFirstName} {lead.ownerLastName}
                        </div>
                      </div>
                      
                      {lead.message && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3">
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Message:</p>
                          <p className="text-sm text-blue-800 dark:text-blue-200">{lead.message}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Submitted: {new Date(lead.createdAt).toLocaleDateString()}</span>
                        <span>Source: {lead.source}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={lead.status}
                          onValueChange={(newStatus) => handleLeadStatusUpdate(lead.id, newStatus as Lead['status'])}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const subject = `Re: Interest in ${lead.propertyTitle}`;
                            const body = `Hello ${lead.tenantName},\n\nThank you for your interest in "${lead.propertyTitle}" located at ${lead.propertyAddress}, ${lead.propertyCity}.\n\n${lead.message ? `Regarding your message: "${lead.message}"\n\n` : ''}I would be happy to discuss this property with you further.\n\nBest regards`;
                            const mailtoLink = `mailto:${lead.tenantEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                            window.open(mailtoLink, '_blank');
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">No leads yet</p>
                  <p className="text-sm text-gray-500">
                    Tenant inquiries from your properties will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        open={showPropertyDetail}
        onOpenChange={setShowPropertyDetail}
        onApprove={(propertyId) => handlePropertyStatusUpdate(propertyId, 'approved')}
        onReject={(propertyId) => handlePropertyStatusUpdate(propertyId, 'rejected')}
        showActions={true}
      />
    </div>
  )
}

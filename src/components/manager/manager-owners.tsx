import { useState } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Plus, 
  Search, 
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  Send,
  UserPlus,
  Eye,
  Edit
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { authApi } from "@/lib/api"
import { useApi } from "@/hooks/useApi"

// Mock owners data
const mockOwners = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    joinDate: "2020-03-15",
    status: "active",
    properties: 3,
    totalUnits: 28,
    monthlyRevenue: 45200,
    investmentValue: 6800000,
    lastLogin: "2024-01-20"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "(555) 987-6543",
    joinDate: "2019-08-22",
    status: "active",
    properties: 2,
    totalUnits: 15,
    monthlyRevenue: 28500,
    investmentValue: 4200000,
    lastLogin: "2024-01-18"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 456-7890",
    joinDate: "2021-01-10",
    status: "pending_invitation",
    properties: 0,
    totalUnits: 0,
    monthlyRevenue: 0,
    investmentValue: 0,
    lastLogin: null
  }
]

function OwnersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOwners = mockOwners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         owner.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || owner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending_invitation":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleResendInvitation = (ownerEmail: string) => {
    // Mock resend invitation
    console.log(`Resending invitation to ${ownerEmail}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Property Owners</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your property owner clients</p>
        </div>
        <Link to="/dashboard/owners/new">
          <Button className="bg-ondo-orange hover:bg-ondo-red transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Owner
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Owners</p>
                <p className="text-2xl font-bold">{mockOwners.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Owners</p>
                <p className="text-2xl font-bold">{mockOwners.filter(o => o.status === "active").length}</p>
              </div>
              <Building className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Invites</p>
                <p className="text-2xl font-bold">{mockOwners.filter(o => o.status === "pending_invitation").length}</p>
              </div>
              <Mail className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{mockOwners.reduce((sum, o) => sum + o.properties, 0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending_invitation">Pending Invitation</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Owners List */}
      <div className="space-y-4">
        {filteredOwners.map((owner) => (
          <Card key={owner.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-owner-${owner.id}.jpg`} />
                    <AvatarFallback>
                      {owner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{owner.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{owner.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{owner.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(owner.status)}>
                      {owner.status.replace('_', ' ')}
                    </Badge>
                    {owner.status === "pending_invitation" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white"
                        onClick={() => handleResendInvitation(owner.email)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Resend Invite
                      </Button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              {owner.status === "active" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                  <div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <Building className="h-4 w-4" />
                      <span>Properties</span>
                    </div>
                    <p className="font-medium">{owner.properties}</p>
                    <p className="text-sm text-gray-500">{owner.totalUnits} total units</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Monthly Revenue</span>
                    </div>
                    <p className="font-medium">${owner.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <Building className="h-4 w-4" />
                      <span>Portfolio Value</span>
                    </div>
                    <p className="font-medium">${(owner.investmentValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Last Login</span>
                    </div>
                    <p className="font-medium">{owner.lastLogin || "Never"}</p>
                  </div>
                </div>
              )}

              {owner.status === "pending_invitation" && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        Invitation Pending
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-300">
                        Owner hasn't accepted the invitation yet. Joined: {owner.joinDate}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white"
                      onClick={() => handleResendInvitation(owner.email)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Resend Invitation
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOwners.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No owners found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your filters" 
                : "No property owners have been added yet"}
            </p>
            <Link to="/dashboard/owners/new">
              <Button className="bg-ondo-orange hover:bg-ondo-red transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add First Owner
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddOwner() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { loading: isInviting, execute: sendInvitation } = useApi(authApi.invite)
  
  const [formData, setFormData] = useState({
    email: "",
    role: "owner" as "owner" | "tenant"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await sendInvitation({
        email: formData.email,
        role: formData.role
      })
      
      toast({
        title: "Invitation Sent!",
        description: `Invitation sent to ${formData.email}. They will receive an email with signup instructions.`,
      })
      
      // Show the invitation URL for testing
      console.log("Invitation URL:", response.inviteUrl)
      
      navigate("/dashboard/owners")
    } catch (error: any) {
      toast({
        title: "Invitation Failed",
        description: error.message || "Failed to send invitation. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Property Owner</CardTitle>
            <CardDescription>
              Invite a property owner to join your management platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="owner@email.com"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Invitation will be sent to this email
                </p>
              </div>

              <div>
                <Label htmlFor="role">Role *</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: "owner" | "tenant") => setFormData(prev => ({ ...prev, role: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Property Owner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  The person will be invited as this role
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• An invitation email will be sent to the provided address</li>
                  <li>• The recipient will receive a secure signup link</li>
                  <li>• They'll complete their profile (name, phone, password)</li>
                  <li>• Once registered, they'll have access to their portal</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Link to="/dashboard/owners">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isInviting} className="bg-ondo-orange hover:bg-ondo-red transition-colors">
                  {isInviting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ManagerOwners() {
  return (
    <Routes>
      <Route path="/" element={<OwnersList />} />
      <Route path="/new" element={<AddOwner />} />
    </Routes>
  )
}

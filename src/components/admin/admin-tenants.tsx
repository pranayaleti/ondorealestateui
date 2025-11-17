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
import { Users, Plus, Search, Mail, Phone, MapPin, Calendar, DollarSign, AlertTriangle, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock tenants data
const mockTenants = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    property: "Oak Street Apartments",
    unit: "2B",
    rent: 1850,
    leaseStart: "2023-09-16",
    leaseEnd: "2024-12-31",
    status: "active",
    paymentStatus: "current"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 987-6543",
    property: "Pine View Complex",
    unit: "1A",
    rent: 1650,
    leaseStart: "2023-08-01",
    leaseEnd: "2024-07-31",
    status: "active",
    paymentStatus: "overdue"
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "(555) 456-7890",
    property: "Maple Heights",
    unit: "3C",
    rent: 2100,
    leaseStart: "2023-10-01",
    leaseEnd: "2024-09-30",
    status: "active",
    paymentStatus: "current"
  }
]

function TenantsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter
    const matchesPayment = paymentFilter === "all" || tenant.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "late":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tenants</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your tenant relationships</p>
        </div>
        <Link to="/dashboard/tenants/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold">{mockTenants.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Payments</p>
                <p className="text-2xl font-bold">{mockTenants.filter(t => t.paymentStatus === "current").length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
                <p className="text-2xl font-bold">{mockTenants.filter(t => t.paymentStatus === "overdue").length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Leases</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
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
                placeholder="Search tenants..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenants List */}
      <div className="space-y-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-avatar-${tenant.id}.jpg`} />
                    <AvatarFallback>
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{tenant.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{tenant.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                      {tenant.paymentStatus}
                    </Badge>
                    <Badge variant="outline" className="ml-2">
                      {tenant.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                <div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>Property</span>
                  </div>
                  <p className="font-medium">{tenant.property}</p>
                  <p className="text-sm text-gray-500">Unit {tenant.unit}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Monthly Rent</span>
                  </div>
                  <p className="font-medium">${tenant.rent}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Lease Start</span>
                  </div>
                  <p className="font-medium">{tenant.leaseStart}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Lease End</span>
                  </div>
                  <p className="font-medium">{tenant.leaseEnd}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tenants found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all" || paymentFilter !== "all" 
                ? "Try adjusting your filters" 
                : "No tenants have been added yet"}
            </p>
            <Link to="/dashboard/tenants/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Tenant
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddTenant() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
    moveInDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    inviteMessage: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Tenant Invited",
      description: `Invitation sent to ${formData.email}. They will receive an email to join the tenant portal.`,
    })
    navigate("/dashboard/tenants")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Tenant</CardTitle>
            <CardDescription>
              Invite a tenant to join the platform and access their tenant portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john.smith@email.com"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Tenant portal invitation will be sent here
                  </p>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="property">Property *</Label>
                  <Select 
                    value={formData.property} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, property: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oak-street">Oak Street Apartments</SelectItem>
                      <SelectItem value="pine-view">Pine View Complex</SelectItem>
                      <SelectItem value="maple-heights">Maple Heights</SelectItem>
                      <SelectItem value="cedar-park">Cedar Park Homes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="unit">Unit Number *</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="2B"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="moveInDate">Move-in Date *</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, moveInDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="leaseEndDate">Lease End Date *</Label>
                  <Input
                    id="leaseEndDate"
                    type="date"
                    value={formData.leaseEndDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, leaseEndDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyRent: e.target.value }))}
                    placeholder="1850"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="inviteMessage">Welcome Message</Label>
                <Textarea
                  id="inviteMessage"
                  value={formData.inviteMessage}
                  onChange={(e) => setFormData(prev => ({ ...prev, inviteMessage: e.target.value }))}
                  placeholder="Welcome to your new home! We're excited to have you as our tenant..."
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-1">
                  This message will be included in the tenant portal invitation
                </p>
              </div>

              <div className="flex justify-between">
                <Link to="/dashboard/tenants">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminTenants() {
  return (
    <Routes>
      <Route path="/" element={<TenantsList />} />
      <Route path="/new" element={<AddTenant />} />
    </Routes>
  )
}

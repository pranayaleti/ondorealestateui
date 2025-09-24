import { useState } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  Plus, 
  Search, 
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Settings,
  Eye,
  Edit,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { propertyApi, type Property } from "@/lib/api"
import { PropertyImageCarousel } from "@/components/ui/property-image-carousel"

// Mock property management data
const mockPropertyManagement = [
  {
    id: 1,
    name: "Oak Street Apartments",
    address: "123 Oak Street, Salt Lake City, UT 84101",
    type: "apartment",
    units: 12,
    occupied: 10,
    purchasePrice: 2400000,
    currentValue: 2800000,
    monthlyRent: 18500,
    monthlyExpenses: 5200,
    managementCompany: "PropertyMatch Management",
    managementFee: 1850, // 10% of rent
    acquisitionDate: "2020-03-15",
    status: "active",
    documents: ["deed.pdf", "insurance.pdf", "inspection_report.pdf"],
    maintenanceRequests: 2,
    vacancies: 2
  },
  {
    id: 2,
    name: "Pine View Complex",
    address: "456 Pine Avenue, Salt Lake City, UT 84102",
    type: "apartment",
    units: 8,
    occupied: 7,
    purchasePrice: 1800000,
    currentValue: 2200000,
    monthlyRent: 14200,
    monthlyExpenses: 4100,
    managementCompany: "PropertyMatch Management",
    managementFee: 1420,
    acquisitionDate: "2019-08-22",
    status: "active",
    documents: ["deed.pdf", "insurance.pdf"],
    maintenanceRequests: 1,
    vacancies: 1
  }
]

function PropertyManagementList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProperties = mockPropertyManagement.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "vacant":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Property Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your real estate portfolio and work with your property management company</p>
        </div>
        <Link to="/owner/properties/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{mockPropertyManagement.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Management</p>
                <p className="text-2xl font-bold">{mockPropertyManagement.filter(p => p.status === "active").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Issues</p>
                <p className="text-2xl font-bold">{mockPropertyManagement.reduce((sum, p) => sum + p.maintenanceRequests, 0)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacant Units</p>
                <p className="text-2xl font-bold">{mockPropertyManagement.reduce((sum, p) => sum + p.vacancies, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-red-500" />
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
                placeholder="Search properties..."
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
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties List */}
      <div className="space-y-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{property.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span>Managed by: {property.managementCompany}</span>
                      <span>•</span>
                      <span>Acquired: {property.acquisitionDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold">{property.occupied}/{property.units}</div>
                      <div className="text-sm text-gray-500">Units Occupied</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-2xl font-bold">${property.monthlyRent.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Monthly Rent</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Building className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold">${(property.currentValue / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-gray-500">Current Value</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                      <div className="text-2xl font-bold">{Math.round(((property.currentValue - property.purchasePrice) / property.purchasePrice) * 100)}%</div>
                      <div className="text-sm text-gray-500">Appreciation</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Revenue & Expenses</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Monthly Rent:</span>
                          <span className="font-medium text-green-600">+${property.monthlyRent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Operating Expenses:</span>
                          <span className="font-medium text-red-600">-${property.monthlyExpenses.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Management Fee:</span>
                          <span className="font-medium text-red-600">-${property.managementFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Net Income:</span>
                          <span className="font-semibold text-blue-600">${(property.monthlyRent - property.monthlyExpenses - property.managementFee).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Investment Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Purchase Price:</span>
                          <span className="font-medium">${(property.purchasePrice / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Value:</span>
                          <span className="font-medium">${(property.currentValue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Equity Gain:</span>
                          <span className="font-medium text-green-600">${((property.currentValue - property.purchasePrice) / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Annual ROI:</span>
                          <span className="font-semibold text-blue-600">
                            {(((property.monthlyRent - property.monthlyExpenses - property.managementFee) * 12 / property.purchasePrice) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="management" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Management Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Management Company:</span>
                          <span className="font-medium">{property.managementCompany}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Management Fee:</span>
                          <span className="font-medium">${property.managementFee}/month (10%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contract Status:</span>
                          <Badge variant="outline" className="text-green-600">Active</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Current Issues</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Maintenance Requests:</span>
                          <span className="font-medium">{property.maintenanceRequests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vacant Units:</span>
                          <span className="font-medium">{property.vacancies}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Inspection:</span>
                          <span className="font-medium">Jan 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Property Documents</h4>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {property.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function OwnerPropertyManagement() {
  return <PropertyManagementList />
}

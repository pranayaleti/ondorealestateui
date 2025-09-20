import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Building, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Users,
  DollarSign,
  Settings,
  Eye
} from "lucide-react"

// Mock properties data
const mockProperties = [
  {
    id: 1,
    name: "Oak Street Apartments",
    address: "123 Oak Street",
    city: "Salt Lake City, UT",
    units: 12,
    occupied: 10,
    monthlyRevenue: 18500,
    type: "apartment",
    status: "active"
  },
  {
    id: 2,
    name: "Pine View Complex",
    address: "456 Pine Avenue",
    city: "Salt Lake City, UT",
    units: 8,
    occupied: 7,
    monthlyRevenue: 14200,
    type: "apartment",
    status: "active"
  },
  {
    id: 3,
    name: "Maple Heights",
    address: "789 Maple Drive",
    city: "Salt Lake City, UT",
    units: 15,
    occupied: 13,
    monthlyRevenue: 24750,
    type: "apartment",
    status: "active"
  }
]

function PropertiesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your property portfolio</p>
        </div>
        <Link to="/dashboard/properties/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
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
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{property.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}, {property.city}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={property.status === "active" ? "default" : "outline"}>
                    {property.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{property.occupied}/{property.units}</div>
                  <div className="text-sm text-gray-500">Units Occupied</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">${property.monthlyRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Building className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{Math.round((property.occupied / property.units) * 100)}%</div>
                  <div className="text-sm text-gray-500">Occupancy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AdminProperties() {
  return (
    <Routes>
      <Route path="/" element={<PropertiesList />} />
      <Route path="/*" element={<PropertiesList />} />
    </Routes>
  )
}

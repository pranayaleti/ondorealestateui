import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Building,
  Plus,
  Search,
  Filter,
  MapPin,
  Eye
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { propertyApi, type Property } from "@/lib/api"
import { PropertyImageCarousel } from "@/components/ui/property-image-carousel"
import { PropertyDetailModal } from "@/components/property-detail-modal"

export default function OwnerProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showPropertyDetail, setShowPropertyDetail] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchProperties()
  }, [statusFilter])

  useEffect(() => {
    if (search === "") {
      fetchProperties()
    }
  }, [search])

  const fetchProperties = async () => {
    if (!user?.id) return

    try {
      console.log("Fetching properties...")
      const data = await propertyApi.getProperties()
      console.log("Properties received:", data.length)
      console.log("Properties with photos:", data.map(p => ({ 
        id: p.id, 
        title: p.title, 
        photosCount: p.photos?.length || 0,
        photos: p.photos?.map(photo => ({ url: photo.url, orderIndex: photo.orderIndex }))
      })))
      // Filter properties based on search and status if needed
      let filteredProperties = data
      
      if (search) {
        filteredProperties = filteredProperties.filter(property => 
          property.title.toLowerCase().includes(search.toLowerCase()) ||
          property.city.toLowerCase().includes(search.toLowerCase()) ||
          property.addressLine1.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      if (statusFilter && statusFilter !== "all") {
        filteredProperties = filteredProperties.filter(property => 
          property.status === statusFilter
        )
      }
      
      // For owners, only show their own properties
      if (user.role === "owner") {
        filteredProperties = filteredProperties.filter(property => 
          property.ownerId === user.id
        )
        // When "all" is selected, show all statuses (pending, approved, rejected)
        // No additional filtering needed - let the user see all their properties
      }
      
      setProperties(filteredProperties)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchProperties()
  }

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property)
    setShowPropertyDetail(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>
      case "approved":
        return <Badge variant="default" className="bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading properties...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Properties</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your real estate investment portfolio</p>
          </div>
          <Button asChild>
            <Link to="/owner/properties/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            {/* Property Image Carousel */}
            <div className="relative">
              <PropertyImageCarousel
                photos={property.photos}
                propertyTitle={property.title}
                aspectRatio="video"
                showControls={true}
                showIndicators={true}
                className="h-48"
              />
              {/* Status Badge Overlay */}
              <div className="absolute top-2 right-2">
                {getStatusBadge(property.status)}
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.addressLine1}, {property.city}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Added:</span>
                  <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Photos:</span>
                  <span>{property.photos?.length || 0} {property.photos?.length === 0 && "(Using placeholders)"}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewProperty(property)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first property.</p>
          <Button asChild>
            <Link to="/owner/properties/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>
      )}

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        open={showPropertyDetail}
        onOpenChange={setShowPropertyDetail}
        showActions={false}
      />
    </div>
  )
}

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MapPin,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { propertyApi, type Property } from "@/lib/api"
import { PropertyImageCarousel } from "@/components/ui/property-image-carousel"

export default function ManagerPropertyReview() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [reviewComment, setReviewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [ownerFilter, setOwnerFilter] = useState<string>("all")
  const [owners, setOwners] = useState<{id: string, name: string}[]>([])
  const { } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchProperties()
  }, [statusFilter, ownerFilter])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      // Get all properties and filter by status
      const allProperties = await propertyApi.getProperties()
      console.log("All properties fetched:", allProperties.length)
      console.log("Properties by status:", allProperties.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1
        return acc
      }, {} as Record<string, number>))
      
      let data: Property[]
      
      if (statusFilter === "all") {
        data = allProperties
        console.log("Showing all properties:", data.length)
      } else {
        data = allProperties.filter(p => p.status === statusFilter)
        console.log(`Showing ${statusFilter} properties:`, data.length)
      }

      // Apply owner filter
      if (ownerFilter !== "all") {
        data = data.filter(p => p.ownerId === ownerFilter)
        console.log(`Filtered by owner ${ownerFilter}:`, data.length)
      }

      // Extract unique owners for the filter dropdown
      const uniqueOwners = allProperties
        .filter(p => p.owner) // Only properties with owner info
        .reduce((acc, p) => {
          if (p.owner && !acc.find(o => o.id === p.owner!.id)) {
            acc.push({
              id: p.owner.id,
              name: `${p.owner.firstName} ${p.owner.lastName}`
            })
          }
          return acc
        }, [] as {id: string, name: string}[])
      
      setOwners(uniqueOwners)
      setProperties(data)
    } catch (error) {
      console.error("Error fetching properties:", error)
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (propertyId: string, status: 'approved' | 'rejected') => {
    setIsSubmitting(true)
    try {
      await propertyApi.updatePropertyStatus(propertyId, status, reviewComment)
      
      toast({
        title: "Property Updated",
        description: `Property has been ${status}`,
      })

      // Remove the property from the list
      setProperties(prev => prev.filter(p => p.id !== propertyId))
      setSelectedProperty(null)
      setReviewComment("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property status",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading pending properties...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Property Review</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and manage property submissions</p>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="all">All Properties</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {statusFilter === "all" ? "" : statusFilter} properties
          </h3>
          <p className="text-gray-600">
            {statusFilter === "pending" 
              ? "All properties have been reviewed." 
              : `No properties found with status: ${statusFilter}`
            }
          </p>
        </div>
      ) : (
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
                  <Badge variant={
                    property.status === "approved" ? "default" : 
                    property.status === "rejected" ? "destructive" : 
                    "secondary"
                  }>
                    {property.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                    {property.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {property.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
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
                    <span className="text-gray-600">Submitted:</span>
                    <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Photos:</span>
                    <span>{property.photos?.length || 0} {property.photos?.length === 0 && "(Using placeholders)"}</span>
                  </div>
                  {property.description && (
                    <div className="text-sm">
                      <span className="text-gray-600">Description:</span>
                      <p className="mt-1 text-gray-800 line-clamp-2">{property.description}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedProperty(property)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Property: {property.title}</DialogTitle>
                          <DialogDescription>
                            Review the property details and approve or reject the submission.
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedProperty && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Property Type</Label>
                                <p className="capitalize">{selectedProperty.type}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Status</Label>
                                <Badge variant="secondary">{selectedProperty.status}</Badge>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium">Address</Label>
                              <p>{selectedProperty.addressLine1}</p>
                              {selectedProperty.addressLine2 && <p>{selectedProperty.addressLine2}</p>}
                              <p>{selectedProperty.city}, {selectedProperty.state} {selectedProperty.zipcode}</p>
                              <p>{selectedProperty.country}</p>
                            </div>
                            
                            {selectedProperty.description && (
                              <div>
                                <Label className="text-sm font-medium">Description</Label>
                                <p className="text-gray-700">{selectedProperty.description}</p>
                              </div>
                            )}
                            
                            <div>
                              <Label htmlFor="comment">Review Comment (Optional)</Label>
                              <Textarea
                                id="comment"
                                placeholder="Add a comment about your decision..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div className="flex gap-2 pt-4">
                              <Button
                                onClick={() => handleStatusUpdate(selectedProperty.id, 'approved')}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleStatusUpdate(selectedProperty.id, 'rejected')}
                                disabled={isSubmitting}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

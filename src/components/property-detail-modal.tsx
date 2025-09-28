import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Home,
  User,
  Check,
  X,
  Building
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Property } from "@/lib/api"

interface PropertyDetailModalProps {
  property: Property | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove?: (propertyId: string) => void
  onReject?: (propertyId: string) => void
  showActions?: boolean
}

export function PropertyDetailModal({ 
  property, 
  open, 
  onOpenChange, 
  onApprove, 
  onReject, 
  showActions = false 
}: PropertyDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!property) return null

  const nextImage = () => {
    if (property.photos && property.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.photos.length)
    }
  }

  const prevImage = () => {
    if (property.photos && property.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.photos.length) % property.photos.length)
    }
  }

  const hasImages = property.photos && property.photos.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Building className="h-6 w-6" />
            {property.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Image Slider */}
          {hasImages ? (
            <div className="relative h-[300px] md:h-[400px] mb-6 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={property.photos[currentImageIndex].url}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {property.photos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.photos.length}
                  </div>
                </>
              )}

              {/* Caption */}
              {property.photos[currentImageIndex].caption && (
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm max-w-xs">
                  {property.photos[currentImageIndex].caption}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[300px] md:h-[400px] mb-6 rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Building className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No images available</p>
              </div>
            </div>
          )}

          {/* Property Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <Badge variant={
              property.status === "approved" ? "default" : 
              property.status === "rejected" ? "destructive" : 
              "secondary"
            } className="text-sm">
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
            
            {/* Action Buttons for Managers */}
            {showActions && property.status === 'pending' && onApprove && onReject && (
              <div className="flex gap-2">
                <Button
                  onClick={() => onApprove(property.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onReject(property.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Basic Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className="ml-2 capitalize font-medium">{property.type}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm text-gray-600">Submitted:</span>
                        <span className="ml-2 font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {property.owner && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-sm text-gray-600">Owner:</span>
                          <span className="ml-2 font-medium">{property.owner.firstName} {property.owner.lastName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {property.description && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {property.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Address Information */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Address</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{property.addressLine1}</p>
                          {property.addressLine2 && (
                            <p className="text-gray-600">{property.addressLine2}</p>
                          )}
                          <p className="text-gray-600">
                            {property.city}
                            {property.state && `, ${property.state}`}
                            {property.zipcode && ` ${property.zipcode}`}
                          </p>
                          <p className="text-gray-600">{property.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photos Information */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Media</h4>
                    <div className="text-sm text-gray-600">
                      <p>{property.photos?.length || 0} photo{(property.photos?.length || 0) !== 1 ? 's' : ''} uploaded</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Location Details</h4>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="space-y-2">
                    <p><strong>Address:</strong> {property.addressLine1}</p>
                    {property.addressLine2 && <p><strong>Address Line 2:</strong> {property.addressLine2}</p>}
                    <p><strong>City:</strong> {property.city}</p>
                    {property.state && <p><strong>State:</strong> {property.state}</p>}
                    <p><strong>Country:</strong> {property.country}</p>
                    {property.zipcode && <p><strong>ZIP Code:</strong> {property.zipcode}</p>}
                  </div>
                </div>

                {(property.latitude && property.longitude) && (
                  <div>
                    <h5 className="font-medium mb-2">Coordinates</h5>
                    <p className="text-sm text-gray-600">
                      Latitude: {property.latitude}, Longitude: {property.longitude}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-4">Property Amenities</h4>
                {property.amenities && property.amenities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No amenities listed for this property</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

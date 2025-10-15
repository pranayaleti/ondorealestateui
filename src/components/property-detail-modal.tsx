import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Home,
  User,
  Check,
  X,
  Building,
  Phone,
  Mail,
  UserCheck,
  Heart,
  Send
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Property, leadApi } from "@/lib/api"

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
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadFormData, setLeadFormData] = useState({
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    message: ''
  })
  const { toast } = useToast()

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

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!leadFormData.tenantName || !leadFormData.tenantEmail || !leadFormData.tenantPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Phone).",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingLead(true)
    
    try {
      await leadApi.submitLead({
        propertyId: property.id,
        tenantName: leadFormData.tenantName,
        tenantEmail: leadFormData.tenantEmail,
        tenantPhone: leadFormData.tenantPhone,
        message: leadFormData.message || undefined,
      })

      toast({
        title: "Interest Submitted!",
        description: "Thank you for your interest. The property manager will contact you soon.",
      })

      // Reset form and close
      setLeadFormData({
        tenantName: '',
        tenantEmail: '',
        tenantPhone: '',
        message: ''
      })
      setShowLeadForm(false)
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit your interest. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingLead(false)
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
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
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
                    {property.amenities.map((amenityKey, index) => {
                      // Map amenity keys to readable labels
                      const amenityLabels: Record<string, string> = {
                        parking: "Parking",
                        gym: "Gym/Fitness Center",
                        pool: "Swimming Pool",
                        laundry: "Laundry Facilities",
                        elevator: "Elevator",
                        balcony: "Balcony/Terrace",
                        air_conditioning: "Air Conditioning",
                        heating: "Heating",
                        dishwasher: "Dishwasher",
                        microwave: "Microwave",
                        refrigerator: "Refrigerator",
                        washer_dryer: "Washer/Dryer",
                        internet: "Internet/WiFi",
                        cable_tv: "Cable TV",
                        security: "Security System",
                        doorman: "Doorman/Concierge",
                        pet_friendly: "Pet Friendly",
                        garden: "Garden/Yard",
                        fireplace: "Fireplace",
                        storage: "Storage Space",
                      };
                      
                      return (
                        <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Check className="h-4 w-4 mr-3 text-green-500" />
                          <span>{amenityLabels[amenityKey] || amenityKey}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No amenities listed for this property</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-4">Property Manager Contact</h4>
                {property.manager ? (
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div className="space-y-4">
                      {/* Manager Name */}
                      <div className="flex items-center">
                        <UserCheck className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <p className="font-medium text-lg">
                            {property.manager.firstName} {property.manager.lastName}
                          </p>
                          <p className="text-sm text-gray-600">Property Manager</p>
                        </div>
                      </div>

                      {/* Manager Email */}
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a 
                            href={`mailto:${property.manager.email}`}
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {property.manager.email}
                          </a>
                        </div>
                      </div>

                      {/* Manager Phone */}
                      {property.manager.phone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-3 text-gray-500" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <a 
                              href={`tel:${property.manager.phone}`}
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {property.manager.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Contact Instructions */}
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                          Interested in this property?
                        </h5>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Contact the property manager directly using the information above to inquire about availability, 
                          schedule a viewing, or get more details about this property. The manager will assist you with 
                          your rental application and answer any questions you may have.
                        </p>
                      </div>

                      {/* Lead Form or Interest Button */}
                      <div className="mt-6">
                        {!showLeadForm ? (
                          <Button 
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg"
                            onClick={() => setShowLeadForm(true)}
                          >
                            <Heart className="h-5 w-5" />
                            I'm Interested
                          </Button>
                        ) : (
                          <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <h4 className="font-semibold text-lg">Express Your Interest</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Fill out this form and the property manager will contact you directly.
                            </p>
                            
                            <form onSubmit={handleLeadSubmit} className="space-y-4">
                              <div>
                                <Label htmlFor="tenantName">Full Name *</Label>
                                <Input
                                  id="tenantName"
                                  type="text"
                                  value={leadFormData.tenantName}
                                  onChange={(e) => setLeadFormData(prev => ({ ...prev, tenantName: e.target.value }))}
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="tenantEmail">Email Address *</Label>
                                <Input
                                  id="tenantEmail"
                                  type="email"
                                  value={leadFormData.tenantEmail}
                                  onChange={(e) => setLeadFormData(prev => ({ ...prev, tenantEmail: e.target.value }))}
                                  placeholder="Enter your email address"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="tenantPhone">Phone Number *</Label>
                                <Input
                                  id="tenantPhone"
                                  type="tel"
                                  value={leadFormData.tenantPhone}
                                  onChange={(e) => setLeadFormData(prev => ({ ...prev, tenantPhone: e.target.value }))}
                                  placeholder="Enter your phone number"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="message">Message (Optional)</Label>
                                <Textarea
                                  id="message"
                                  value={leadFormData.message}
                                  onChange={(e) => setLeadFormData(prev => ({ ...prev, message: e.target.value }))}
                                  placeholder="Any specific questions or requirements..."
                                  rows={3}
                                />
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  type="submit"
                                  disabled={isSubmittingLead}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  {isSubmittingLead ? "Submitting..." : "Submit Interest"}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setShowLeadForm(false)}
                                  disabled={isSubmittingLead}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserCheck className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No manager contact information available</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

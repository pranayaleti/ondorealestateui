"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { propertyApi } from "@/lib/api"

export function AddPropertyForm() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Predefined amenities list
  const predefinedAmenities = [
    { key: "parking", label: "Parking" },
    { key: "gym", label: "Gym/Fitness Center" },
    { key: "pool", label: "Swimming Pool" },
    { key: "laundry", label: "Laundry Facilities" },
    { key: "elevator", label: "Elevator" },
    { key: "balcony", label: "Balcony/Terrace" },
    { key: "air_conditioning", label: "Air Conditioning" },
    { key: "heating", label: "Heating" },
    { key: "dishwasher", label: "Dishwasher" },
    { key: "microwave", label: "Microwave" },
    { key: "refrigerator", label: "Refrigerator" },
    { key: "washer_dryer", label: "Washer/Dryer" },
    { key: "internet", label: "Internet/WiFi" },
    { key: "cable_tv", label: "Cable TV" },
    { key: "security", label: "Security System" },
    { key: "doorman", label: "Doorman/Concierge" },
    { key: "pet_friendly", label: "Pet Friendly" },
    { key: "garden", label: "Garden/Yard" },
    { key: "fireplace", label: "Fireplace" },
    { key: "storage", label: "Storage Space" },
  ]

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    description: "",
    
    // Property Details
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    
    // Contact & Business Info
    phone: "",
    website: "",
    
    // Property Management Details
    leaseTerms: "",
    fees: "",
    availability: "",
    
    // Arrays
    specialties: [] as string[],
    services: [] as string[],
    valueRanges: [] as string[],
    amenities: [] as string[], // Changed from amenityIds to amenities
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Removed useEffect for loading amenities - now using predefined list

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!user?.id) {
      console.log("No user ID available:", { user });
      toast({
        title: "Authentication Error",
        description: "Please log in to add a property.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    console.log("Adding property with user:", { user })

    try {
      // Convert string values to appropriate types for API
      const propertyData = {
        ...formData,
        // Convert numeric fields
        price: formData.price ? parseFloat(formData.price) : undefined,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        sqft: formData.sqft ? parseInt(formData.sqft) : undefined,
        // Remove empty strings
        website: formData.website || undefined,
        phone: formData.phone || undefined,
        leaseTerms: formData.leaseTerms || undefined,
        fees: formData.fees || undefined,
        availability: formData.availability || undefined,
      }

      console.log("Creating property with data:", propertyData)

      // Create the property
      const newProperty = await propertyApi.createProperty(propertyData)
      console.log("Property created:", newProperty)

      // Upload photos if any
      if (uploadedFiles.length > 0) {
        for (let i = 0; i < uploadedFiles.length; i++) {
          const file = uploadedFiles[i]
          try {
            await propertyApi.uploadPhoto(newProperty.id, file, undefined, i)
          } catch (photoError) {
            console.error("Failed to upload photo:", photoError)
            // Continue with other photos even if one fails
          }
        }
      }

      toast({
        title: "Property added",
        description: "The property has been successfully added to your portfolio.",
      })

      navigate("/owner/properties")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Basic information about the property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Sunset Apartments"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  placeholder="e.g. 123 Main St"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  placeholder="e.g. Apt 4B"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="e.g. Salt Lake City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="e.g. UT"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="e.g. USA"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipcode">ZIP Code</Label>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    placeholder="e.g. 84101"
                    value={formData.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the property..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Rental and property specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Monthly Rent ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="e.g. 1850"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sqft">Square Footage</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    type="number"
                    placeholder="e.g. 950"
                    value={formData.sqft}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="e.g. 2"
                    value={formData.bedrooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    placeholder="e.g. 2"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="e.g. (801) 555-1234"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="e.g. www.property.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  name="availability"
                  placeholder="e.g. Immediate, Available Jan 1"
                  value={formData.availability}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="leaseTerms">Lease Terms</Label>
                <Textarea
                  id="leaseTerms"
                  name="leaseTerms"
                  placeholder="e.g. 12-month minimum lease term with option to renew. $50 application fee per adult."
                  value={formData.leaseTerms}
                  onChange={handleChange}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fees">Management Fees</Label>
                <Textarea
                  id="fees"
                  name="fees"
                  placeholder="e.g. Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent."
                  value={formData.fees}
                  onChange={handleChange}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Photos</CardTitle>
              <CardDescription>Upload photos of your property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop images here</p>
                <p className="text-xs text-muted-foreground mb-4">JPG, PNG or GIF up to 10MB each</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setUploadedFiles(files)
                  }}
                  className="hidden"
                  id="photo-upload"
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  Browse Files
                </Button>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">{uploadedFiles.length} file(s) selected:</p>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                        <span className="truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newFiles = uploadedFiles.filter((_, i) => i !== index)
                            setUploadedFiles(newFiles)
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Select the amenities available at this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {predefinedAmenities.map((amenity) => (
                  <div key={amenity.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.key}`}
                      checked={formData.amenities.includes(amenity.key)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: [...prev.amenities, amenity.key],
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: prev.amenities.filter((key) => key !== amenity.key),
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={`amenity-${amenity.key}`} className="cursor-pointer">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => navigate("/owner/properties")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding Property..." : "Add Property"}
        </Button>
      </div>
    </form>
  )
}

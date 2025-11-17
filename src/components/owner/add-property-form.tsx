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
import { useS3Upload } from "@/hooks/useS3Upload"
import { US_STATES, DEFAULT_US_COUNTRY, DEFAULT_US_COUNTRY_CODE } from "@/constants"
import { normalizeUSPhone, validateUSPhone, validateUSZip } from "@/lib/us-format"

export function AddPropertyForm() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const { uploadMultiplePhotos, isUploading } = useS3Upload()
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
    country: DEFAULT_US_COUNTRY,
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
    
    // Raw input values for comma-separated fields
    specialtiesInput: "",
    servicesInput: "",
    valueRangesInput: "",
    
    // Rating fields
    rating: "",
    reviewCount: "",
  })

  const formatPhoneInput = (rawValue: string) => {
    const digits = rawValue.replace(/\D/g, "").slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let nextValue = value

    if (name === "phone") {
      nextValue = formatPhoneInput(value)
    } else if (name === "zipcode") {
      nextValue = value.replace(/[^\d-]/g, "").slice(0, 10)
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayFieldBlur = (fieldName: string, value: string) => {
    console.log('handleArrayFieldBlur called:', fieldName, value);
    // Process on blur to allow typing commas without interference
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    console.log('Processed array on blur:', arrayValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: arrayValue
    }))
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

    if (formData.phone && !validateUSPhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid US phone number (e.g., (555) 123-4567).",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (formData.zipcode && !validateUSZip(formData.zipcode)) {
      toast({
        title: "Invalid ZIP code",
        description: "ZIP codes must be 5 digits or ZIP+4 (e.g., 12345 or 12345-6789).",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    console.log("Adding property with user:", { user })

    try {
      // Convert string values to appropriate types for API
      const normalizedPhone = formData.phone ? normalizeUSPhone(formData.phone) : ""
      const propertyData = {
        ...formData,
        state: formData.state || undefined,
        country: DEFAULT_US_COUNTRY,
        // Convert numeric fields
        price: formData.price ? parseFloat(formData.price) : undefined,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        sqft: formData.sqft ? parseInt(formData.sqft) : undefined,
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        reviewCount: formData.reviewCount ? parseInt(formData.reviewCount) : undefined,
        // Include array fields (JSON stringified)
        specialties: formData.specialties.length > 0 ? formData.specialties : undefined,
        services: formData.services.length > 0 ? formData.services : undefined,
        valueRanges: formData.valueRanges.length > 0 ? formData.valueRanges : undefined,
        // Remove empty strings
        website: formData.website || undefined,
        phone: normalizedPhone ? `${DEFAULT_US_COUNTRY_CODE}${normalizedPhone}` : undefined,
        leaseTerms: formData.leaseTerms || undefined,
        fees: formData.fees || undefined,
        availability: formData.availability || undefined,
        zipcode: formData.zipcode || undefined,
      }

      console.log("Creating property with data:", propertyData)
      console.log("Form data specialties:", formData.specialties)
      console.log("Form data services:", formData.services)
      console.log("Form data valueRanges:", formData.valueRanges)

      // Create the property
      const newProperty = await propertyApi.createProperty(propertyData)
      console.log("Property created:", newProperty)

      // Upload photos if any using S3
      if (uploadedFiles.length > 0) {
        try {
          const uploadResults = await uploadMultiplePhotos(uploadedFiles, {
            propertyId: newProperty.id,
            orderIndex: 0,
          });
          
          const failedUploads = uploadResults.filter(result => !result.success);
          if (failedUploads.length > 0) {
            console.warn(`${failedUploads.length} photos failed to upload`);
          }
        } catch (photoError) {
          console.error("Failed to upload photos:", photoError);
          // Continue even if photo upload fails
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
                  <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((stateOption) => (
                        <SelectItem key={stateOption.value} value={stateOption.value}>
                          {stateOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={DEFAULT_US_COUNTRY} readOnly aria-readonly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipcode">ZIP Code</Label>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    placeholder="e.g. 84101 or 84101-1234"
                    value={formData.zipcode}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="\\d{5}(-\\d{4})?"
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
                    inputMode="tel"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Property Rating (1-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reviewCount">Number of Reviews</Label>
                  <Input
                    id="reviewCount"
                    name="reviewCount"
                    type="number"
                    min="0"
                    placeholder="e.g. 25"
                    value={formData.reviewCount}
                    onChange={handleChange}
                  />
                </div>
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

          <Card>
            <CardHeader>
              <CardTitle>Property Categories</CardTitle>
              <CardDescription>Define specialties, services, and value ranges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="specialties">Specialties</Label>
                <Input
                  id="specialties"
                  name="specialtiesInput"
                  placeholder="e.g. Luxury, Pet-friendly, Student housing (comma-separated)"
                  value={formData.specialtiesInput}
                  onChange={handleChange}
                  onBlur={(e) => {
                    console.log('Specialties input blurred:', e.target.value);
                    handleArrayFieldBlur('specialties', e.target.value);
                  }}
                />
                <p className="text-xs text-muted-foreground">Enter specialties separated by commas</p>
                
              </div>

              <div className="grid gap-2">
                <Label htmlFor="services">Services</Label>
                <Input
                  id="services"
                  name="servicesInput"
                  placeholder="e.g. 24/7 maintenance, Concierge, Housekeeping (comma-separated)"
                  value={formData.servicesInput}
                  onChange={handleChange}
                  onBlur={(e) => {
                    console.log('Services input blurred:', e.target.value);
                    handleArrayFieldBlur('services', e.target.value);
                  }}
                />
                <p className="text-xs text-muted-foreground">Enter services separated by commas</p>
                
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valueRanges">Value Ranges</Label>
                <Input
                  id="valueRanges"
                  name="valueRangesInput"
                  placeholder="e.g. $1000-2000, $2000-3000, Premium (comma-separated)"
                  value={formData.valueRangesInput}
                  onChange={handleChange}
                  onBlur={(e) => {
                    console.log('Value ranges input blurred:', e.target.value);
                    handleArrayFieldBlur('valueRanges', e.target.value);
                  }}
                />
                <p className="text-xs text-muted-foreground">Enter value ranges separated by commas</p>
              
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => navigate("/owner/properties")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Adding Property..." : isUploading ? "Uploading Photos..." : "Add Property"}
        </Button>
      </div>
    </form>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Home, Hotel, Store, Users, Loader2, Upload, X, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"

export function PropertyFormSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    type: "",
    value: "",
    owner: "",
    ownerEmail: "",
    ownerPhone: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    lotSize: "",
    parkingSpaces: "",
    amenities: [] as string[],
    status: "active",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    // For amenities which are in an array
    if (name.startsWith("amenity-")) {
      const amenity = name.replace("amenity-", "")
      setFormData((prev) => {
        const currentAmenities = [...prev.amenities]
        if (checked && !currentAmenities.includes(amenity)) {
          currentAmenities.push(amenity)
        } else if (!checked && currentAmenities.includes(amenity)) {
          const index = currentAmenities.indexOf(amenity)
          currentAmenities.splice(index, 1)
        }
        return { ...prev, amenities: currentAmenities }
      })
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      alert("Property added successfully!")
    }, 1500)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Property</SheetTitle>
          <SheetDescription>Enter the details of the property you want to add to your inventory.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select onValueChange={(value) => handleSelectChange("type", value)} defaultValue={formData.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2" />
                          <span>Single-Family</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="multi-family">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Multi-Family</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="commercial">
                        <div className="flex items-center">
                          <Store className="h-4 w-4 mr-2" />
                          <span>Commercial</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="vacation">
                        <div className="flex items-center">
                          <Hotel className="h-4 w-4 mr-2" />
                          <span>Vacation</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="association">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span>Association</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="value">Property Value</Label>
                  <Select onValueChange={(value) => handleSelectChange("value", value)} defaultValue={formData.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-300k">Under $300,000</SelectItem>
                      <SelectItem value="300k-500k">$300,000 - $500,000</SelectItem>
                      <SelectItem value="500k-750k">$500,000 - $750,000</SelectItem>
                      <SelectItem value="750k-1m">$750,000 - $1,000,000</SelectItem>
                      <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="squareFeet">Square Feet</Label>
                  <Input id="squareFeet" name="squareFeet" value={formData.squareFeet} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input id="yearBuilt" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="lotSize">Lot Size (acres)</Label>
                  <Input id="lotSize" name="lotSize" value={formData.lotSize} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                  <Input
                    id="parkingSpaces"
                    name="parkingSpaces"
                    value={formData.parkingSpaces}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-central-air"
                      checked={formData.amenities.includes("central-air")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-central-air", checked)}
                    />
                    <Label htmlFor="amenity-central-air">Central Air</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-fireplace"
                      checked={formData.amenities.includes("fireplace")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-fireplace", checked)}
                    />
                    <Label htmlFor="amenity-fireplace">Fireplace</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-garage"
                      checked={formData.amenities.includes("garage")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-garage", checked)}
                    />
                    <Label htmlFor="amenity-garage">Garage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-backyard"
                      checked={formData.amenities.includes("backyard")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-backyard", checked)}
                    />
                    <Label htmlFor="amenity-backyard">Backyard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-pool"
                      checked={formData.amenities.includes("pool")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-pool", checked)}
                    />
                    <Label htmlFor="amenity-pool">Pool</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-basement"
                      checked={formData.amenities.includes("basement")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-basement", checked)}
                    />
                    <Label htmlFor="amenity-basement">Basement</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="owner" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="owner">Owner Name</Label>
                  <Input id="owner" name="owner" value={formData.owner} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="ownerEmail">Owner Email</Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ownerPhone">Owner Phone</Label>
                  <Input
                    id="ownerPhone"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Label>Property Images</Label>

                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative border rounded-md overflow-hidden h-32">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <div
                    className="border border-dashed rounded-md flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Images</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {images.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
                    <ImageIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-2">No images uploaded yet</p>
                    <p className="text-sm text-gray-400 mb-4">Upload property images to enhance your listing</p>
                    <Button type="button" variant="outline" onClick={triggerFileInput}>
                      <Upload className="h-4 w-4 mr-2" />
                      Select Images
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Property"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

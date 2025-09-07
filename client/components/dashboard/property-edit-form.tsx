"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Home, Hotel, Store, Users, Loader2, Trash2, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock property data based on ID
const getPropertyById = (id: string) => {
  // This would normally be a fetch to your API
  return {
    id,
    address: "123 Main St",
    city: "Salt Lake City",
    state: "UT",
    zipCode: "84101",
    type: "single-family",
    value: "300k-500k",
    status: "active",
    owner: "John Smith",
    ownerEmail: "john.smith@example.com",
    ownerPhone: "(555) 123-4567",
    description:
      "Beautiful single-family home in a quiet neighborhood. Recently renovated with new appliances and hardwood floors throughout.",
    bedrooms: "3",
    bathrooms: "2",
    squareFeet: "1,800",
    yearBuilt: "2005",
    lotSize: "0.25",
    parkingSpaces: "2",
    amenities: ["central-air", "fireplace", "garage", "backyard"],
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    dateAdded: "2023-04-25T09:24:00",
    lastUpdated: "2023-04-28T14:30:00",
  }
}

export function PropertyEditForm({ propertyId }: { propertyId: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [property, setProperty] = useState<any>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const fetchedProperty = getPropertyById(propertyId)
      setProperty(fetchedProperty)
      setIsLoading(false)
    }, 1000)
  }, [propertyId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProperty((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProperty((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    // For amenities which are in an array
    if (name.startsWith("amenity-")) {
      const amenity = name.replace("amenity-", "")
      setProperty((prev: any) => {
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
      setProperty((prev: any) => ({ ...prev, [name]: checked }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert("Property updated successfully!")
    }, 1500)
  }

  const handleDelete = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setDeleteDialogOpen(false)
      alert("Property deleted successfully!")
      // Redirect would happen here in a real app
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="owner">Owner</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={property.address} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={property.city} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={property.state} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input id="zipCode" name="zipCode" value={property.zipCode} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select onValueChange={(value) => handleSelectChange("type", value)} defaultValue={property.type}>
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
                <Select onValueChange={(value) => handleSelectChange("value", value)} defaultValue={property.value}>
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
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue={property.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={property.description}
                  onChange={handleChange}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" value={property.bedrooms} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" value={property.bathrooms} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="squareFeet">Square Feet</Label>
                <Input id="squareFeet" name="squareFeet" value={property.squareFeet} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input id="yearBuilt" name="yearBuilt" value={property.yearBuilt} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="lotSize">Lot Size (acres)</Label>
                <Input id="lotSize" name="lotSize" value={property.lotSize} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                <Input id="parkingSpaces" name="parkingSpaces" value={property.parkingSpaces} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-central-air"
                      checked={property.amenities.includes("central-air")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-central-air", checked)}
                    />
                    <Label htmlFor="amenity-central-air">Central Air</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-fireplace"
                      checked={property.amenities.includes("fireplace")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-fireplace", checked)}
                    />
                    <Label htmlFor="amenity-fireplace">Fireplace</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-garage"
                      checked={property.amenities.includes("garage")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-garage", checked)}
                    />
                    <Label htmlFor="amenity-garage">Garage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-backyard"
                      checked={property.amenities.includes("backyard")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-backyard", checked)}
                    />
                    <Label htmlFor="amenity-backyard">Backyard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-pool"
                      checked={property.amenities.includes("pool")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-pool", checked)}
                    />
                    <Label htmlFor="amenity-pool">Pool</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="amenity-basement"
                      checked={property.amenities.includes("basement")}
                      onCheckedChange={(checked) => handleSwitchChange("amenity-basement", checked)}
                    />
                    <Label htmlFor="amenity-basement">Basement</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="owner" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="owner">Owner Name</Label>
                <Input id="owner" name="owner" value={property.owner} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="ownerEmail">Owner Email</Label>
                <Input
                  id="ownerEmail"
                  name="ownerEmail"
                  type="email"
                  value={property.ownerEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="ownerPhone">Owner Phone</Label>
                <Input id="ownerPhone" name="ownerPhone" value={property.ownerPhone} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="space-y-4">
            <Label>Property Images</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {property.images.map((image: string, index: number) => (
                <div key={index} className="relative border rounded-md overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Property ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    onClick={() => {
                      const newImages = [...property.images]
                      newImages.splice(index, 1)
                      setProperty({ ...property, images: newImages })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="border border-dashed rounded-md flex items-center justify-center h-48 cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto text-gray-400" />
                  <span className="text-sm text-gray-500">Add Image</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Date Added</Label>
                <p className="text-gray-700 mt-1">
                  {new Date(property.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <Label>Last Updated</Label>
                <p className="text-gray-700 mt-1">
                  {new Date(property.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Label>Activity Log</Label>
              <div className="border rounded-md mt-2">
                <div className="p-4 border-b">
                  <p className="font-medium">Property created</p>
                  <p className="text-sm text-gray-500">April 25, 2023 at 9:24 AM by Admin User</p>
                </div>
                <div className="p-4 border-b">
                  <p className="font-medium">Property details updated</p>
                  <p className="text-sm text-gray-500">April 26, 2023 at 11:15 AM by Admin User</p>
                </div>
                <div className="p-4 border-b">
                  <p className="font-medium">Owner information updated</p>
                  <p className="text-sm text-gray-500">April 27, 2023 at 2:30 PM by Admin User</p>
                </div>
                <div className="p-4">
                  <p className="font-medium">Property status changed to Active</p>
                  <p className="text-sm text-gray-500">April 28, 2023 at 2:30 PM by Admin User</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" type="button">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Property
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this property?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the property and all associated data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Property"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

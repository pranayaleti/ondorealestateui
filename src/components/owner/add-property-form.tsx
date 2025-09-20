"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Building, Home, Hotel, Store, Users, Upload, Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AddPropertyForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    type: "",
    yearBuilt: "",
    squareFeet: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    amenities: [] as string[],
    units: [
      {
        name: "Unit 1",
        bedrooms: "1",
        bathrooms: "1",
        squareFeet: "",
        rent: "",
      },
    ],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((a) => a !== amenity),
      }))
    }
  }

  const handleUnitChange = (index: number, field: string, value: string) => {
    const updatedUnits = [...formData.units]
    updatedUnits[index] = { ...updatedUnits[index], [field]: value }
    setFormData((prev) => ({ ...prev, units: updatedUnits }))
  }

  const addUnit = () => {
    setFormData((prev) => ({
      ...prev,
      units: [
        ...prev.units,
        {
          name: `Unit ${prev.units.length + 1}`,
          bedrooms: "1",
          bathrooms: "1",
          squareFeet: "",
          rent: "",
        },
      ],
    }))
  }

  const removeUnit = (index: number) => {
    if (formData.units.length > 1) {
      const updatedUnits = formData.units.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, units: updatedUnits }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would call an API to add the property
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Property added",
        description: "The property has been successfully added to your portfolio.",
      })

      // Redirect to properties page
      router.push("/owner/properties")
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
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Sunset Apartments, 123 Main St"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g. 123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                  required
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
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="e.g. 84101"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
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
                    <SelectItem value="other">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        <span>Other</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    name="yearBuilt"
                    type="number"
                    placeholder="e.g. 2005"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="squareFeet">Square Feet</Label>
                  <Input
                    id="squareFeet"
                    name="squareFeet"
                    type="number"
                    placeholder="e.g. 1500"
                    value={formData.squareFeet}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Total Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="e.g. 3"
                    value={formData.bedrooms}
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

          <Card>
            <CardHeader>
              <CardTitle>Property Units</CardTitle>
              <CardDescription>Add details for each unit in this property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.units.map((unit, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && <Separator />}
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{unit.name}</h4>
                    {formData.units.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeUnit(index)}>
                        <Minus className="h-4 w-4 mr-2" />
                        Remove Unit
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`unit-${index}-name`}>Unit Name</Label>
                      <Input
                        id={`unit-${index}-name`}
                        value={unit.name}
                        onChange={(e) => handleUnitChange(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`unit-${index}-bedrooms`}>Bedrooms</Label>
                      <Select
                        value={unit.bedrooms}
                        onValueChange={(value) => handleUnitChange(index, "bedrooms", value)}
                      >
                        <SelectTrigger id={`unit-${index}-bedrooms`}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Studio</SelectItem>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`unit-${index}-bathrooms`}>Bathrooms</Label>
                      <Select
                        value={unit.bathrooms}
                        onValueChange={(value) => handleUnitChange(index, "bathrooms", value)}
                      >
                        <SelectTrigger id={`unit-${index}-bathrooms`}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="3.5">3.5+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`unit-${index}-rent`}>Monthly Rent ($)</Label>
                      <Input
                        id={`unit-${index}-rent`}
                        type="number"
                        placeholder="e.g. 1500"
                        value={unit.rent}
                        onChange={(e) => handleUnitChange(index, "rent", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addUnit} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Another Unit
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Image</CardTitle>
              <CardDescription>Upload a photo of your property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop your image here</p>
                <p className="text-xs text-muted-foreground mb-4">JPG, PNG or GIF up to 10MB</p>
                <Button type="button" variant="secondary" size="sm">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Select the amenities available at this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Central Air",
                  "Washer/Dryer",
                  "Parking",
                  "Garage",
                  "Backyard",
                  "Fireplace",
                  "Dishwasher",
                  "Hardwood Floors",
                  "Balcony/Patio",
                  "Pool",
                  "Gym",
                  "Pet Friendly",
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/owner/properties")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding Property..." : "Add Property"}
        </Button>
      </div>
    </form>
  )
}

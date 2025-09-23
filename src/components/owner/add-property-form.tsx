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

export function AddPropertyForm() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    // Remove latitude and longitude
    // latitude: "",
    // longitude: "",
    description: "",
    amenities: [] as { key: string; value?: string }[],
    photos: [] as { url: string; caption?: string; orderIndex: number }[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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
      const ownerId = user.id

      console.log("Making API call to:", `/api/owners/${ownerId}/properties`)
      console.log("With payload:", formData)

      const response = await fetch(`/api/owners/${ownerId}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('ondoToken')}`,
        },
        body: JSON.stringify(formData),
      })

      console.log("API response status:", response.status)
      const responseData = await response.json()
      console.log("API response data:", responseData)

      if (!response.ok) throw new Error("Failed to add property")

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
                  { key: "parking", label: "Parking" },
                  { key: "pool", label: "Swimming Pool" },
                  { key: "gym", label: "Gym" },
                  { key: "laundry", label: "Laundry" },
                  { key: "pet_friendly", label: "Pet Friendly" },
                ].map((amenity) => (
                  <div key={amenity.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.key}`}
                      checked={formData.amenities.some(a => a.key === amenity.key)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: [...prev.amenities, { key: amenity.key, value: "" }],
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: prev.amenities.filter((a) => a.key !== amenity.key),
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

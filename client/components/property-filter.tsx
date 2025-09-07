"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export interface PropertyFilters {
  priceRange: [number, number]
  bedrooms: string
  bathrooms: string
  propertyType: string
  amenities: string[]
}

interface PropertyFilterProps {
  onFilterChange: (filters: PropertyFilters) => void
  initialFilters?: PropertyFilters
}

const defaultFilters: PropertyFilters = {
  priceRange: [500, 5000],
  bedrooms: "any",
  bathrooms: "any",
  propertyType: "any",
  amenities: [],
}

const amenitiesList = [
  "In-unit Laundry",
  "Fitness Center",
  "Pet Friendly",
  "Parking",
  "Pool",
  "Balcony",
  "Dishwasher",
  "Hardwood Floors",
  "Air Conditioning",
  "Furnished",
]

export function PropertyFilter({ onFilterChange, initialFilters = defaultFilters }: PropertyFilterProps) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
  const [priceDisplay, setPriceDisplay] = useState<[number, number]>(filters.priceRange)
  const [isOpen, setIsOpen] = useState(false)

  const handlePriceChange = (value: number[]) => {
    setPriceDisplay([value[0], value[1]])
  }

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]

      return {
        ...prev,
        amenities: newAmenities,
      }
    })
  }

  const applyFilters = () => {
    const updatedFilters = {
      ...filters,
      priceRange: priceDisplay as [number, number],
    }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
    setIsOpen(false)
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
    setPriceDisplay(defaultFilters.priceRange)
    onFilterChange(defaultFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.bedrooms !== "any") count++
    if (filters.bathrooms !== "any") count++
    if (filters.propertyType !== "any") count++
    count += filters.amenities.length
    if (
      filters.priceRange[0] !== defaultFilters.priceRange[0] ||
      filters.priceRange[1] !== defaultFilters.priceRange[1]
    )
      count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div>
      <Button variant="outline" className="gap-2" onClick={() => setIsOpen(true)}>
        <Filter className="h-4 w-4" />
        Filter Properties
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[400px] sm:max-w-none p-0 z-[9999]">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <SheetHeader className="mb-2">
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>Customize your search to find the perfect property</SheetDescription>
              </SheetHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                      min={500}
                      max={5000}
                      step={100}
                      value={[priceDisplay[0], priceDisplay[1]]}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <div className="border rounded-md px-3 py-1.5">${priceDisplay[0]}</div>
                      <div className="border rounded-md px-3 py-1.5">${priceDisplay[1]}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Bedrooms</h3>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="any">Any</option>
                    <option value="studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Bathrooms</h3>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="any">Any</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3+">3+</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Property Type</h3>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="any">Any</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="condo">Condo</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityToggle(amenity)}
                        />
                        <Label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t mt-auto">
              <SheetFooter className="flex-row gap-2">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset Filters
                </Button>
                <Button onClick={applyFilters} className="flex-1">
                  Apply Filters
                </Button>
              </SheetFooter>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

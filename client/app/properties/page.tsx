"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Home, Search, ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { PropertyDetailsModal } from "@/components/property-details-modal"
import { PropertyFilter, type PropertyFilters } from "@/components/property-filter"
import { PropertySearch } from "@/components/property-search"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Footer } from "@/components/footer"

// Mock property data
const allProperties = [
  {
    id: 201,
    title: "Modern Apartment",
    address: "Downtown, Salt Lake City",
    price: 1850,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 950,
    type: "apartment",
    image: "/modern-apartment-balcony.png",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 24,
    phone: "(801) 555-1234",
    specialties: ["apartment", "downtown"],
    description: "Luxury apartment with balcony and city views, pet-friendly with modern amenities.",
    valueRanges: ["300k-500k"],
    images: [
      "/modern-apartment-balcony.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "12-month minimum lease term with option to renew. $50 application fee per adult.",
    services: ["24/7 maintenance", "Package receiving", "Online rent payment", "Fitness center", "Rooftop lounge"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.downtownapartments.com",
    amenities: ["In-unit Laundry", "Fitness Center", "Pet Friendly", "Balcony"],
    dateAdded: new Date("2023-04-15"),
  },
  {
    id: 202,
    title: "Suburban House",
    address: "Holladay, UT",
    price: 2400,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2200,
    type: "house",
    image: "/suburban-house-garden.png",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviewCount: 18,
    phone: "(801) 555-5678",
    specialties: ["single-family", "suburban"],
    description: "Spacious family home with fenced backyard, finished basement, and 2-car garage.",
    valueRanges: ["500k-750k"],
    images: [
      "/suburban-house-garden.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "12-month lease. $45 application fee per adult. Security deposit equal to one month's rent.",
    services: ["Lawn maintenance", "Snow removal", "Pest control", "Annual HVAC service", "24/7 emergency support"],
    fees: "Management fee: 7% of monthly rent. Leasing fee: 75% of first month's rent.",
    availability: "Available in 30 days",
    website: "www.familyhomerentals.com",
    amenities: ["Parking", "Hardwood Floors", "Air Conditioning", "Dishwasher"],
    dateAdded: new Date("2023-05-20"),
  },
  {
    id: 203,
    title: "Modern Townhouse",
    address: "Midvale, UT",
    price: 1950,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    type: "townhouse",
    image: "/modern-townhouse-garage.png",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviewCount: 15,
    phone: "(801) 555-9012",
    specialties: ["townhouse", "modern"],
    description: "Contemporary townhouse with attached garage, open floor plan, and community pool access.",
    valueRanges: ["300k-500k"],
    images: [
      "/modern-townhouse-garage.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "6 or 12-month lease terms. $40 application fee. Security deposit equal to one month's rent.",
    services: ["Community pool maintenance", "Exterior maintenance", "Trash removal", "Snow removal", "HOA management"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.moderntownhomes.com",
    amenities: ["Pool", "Parking", "Pet Friendly", "Dishwasher"],
    dateAdded: new Date("2023-06-10"),
  },
  {
    id: 204,
    title: "Luxury Condo",
    address: "Downtown, Salt Lake City",
    price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    type: "condo",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviewCount: 22,
    phone: "(801) 555-3456",
    specialties: ["luxury", "downtown"],
    description: "Upscale condo with panoramic city views, high-end finishes, and building amenities.",
    valueRanges: ["750k-1m"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "12-month lease. $75 application fee. Security deposit equal to one month's rent plus $500.",
    services: ["Concierge", "Valet parking", "Package receiving", "Fitness center", "Rooftop lounge"],
    fees: "Management fee: 10% of monthly rent. Leasing fee: One month's rent.",
    availability: "Available in 15 days",
    website: "www.luxurycondos.com",
    amenities: ["Fitness Center", "Pool", "Balcony", "Furnished", "Air Conditioning"],
    dateAdded: new Date("2023-06-25"),
  },
  {
    id: 205,
    title: "Cozy Studio",
    address: "Sugar House, Salt Lake City",
    price: 1100,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 550,
    type: "studio",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    reviewCount: 12,
    phone: "(801) 555-7890",
    specialties: ["studio", "affordable"],
    description: "Charming studio apartment in trendy Sugar House neighborhood with great amenities.",
    valueRanges: ["under-300k"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "6 or 12-month lease. $35 application fee. Security deposit equal to one month's rent.",
    services: ["Laundry facilities", "Bike storage", "Package receiving", "On-site management", "Utilities included"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.sugarhouseliving.com",
    amenities: ["Pet Friendly", "Furnished", "Air Conditioning"],
    dateAdded: new Date("2023-07-05"),
  },
  {
    id: 206,
    title: "Family Home with Yard",
    address: "Murray, UT",
    price: 2200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1900,
    type: "house",
    image: "/placeholder.svg?height=600&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviewCount: 14,
    phone: "(801) 555-2345",
    specialties: ["single-family", "yard"],
    description: "Comfortable family home with large fenced yard, updated kitchen, and finished basement.",
    valueRanges: ["300k-500k"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms: "12-month lease. $45 application fee per adult. Security deposit equal to one month's rent.",
    services: ["Lawn care", "Snow removal", "Pest control", "HVAC maintenance", "24/7 emergency support"],
    fees: "Management fee: 7% of monthly rent. Leasing fee: 75% of first month's rent.",
    availability: "Available in 45 days",
    website: "www.murrayhomes.com",
    amenities: ["Parking", "Dishwasher", "Hardwood Floors", "Air Conditioning"],
    dateAdded: new Date("2023-07-15"),
  },
]

type SortOption = "newest" | "price-low" | "price-high" | "bedrooms" | "bathrooms" | "sqft"

export default function PropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)
  const [properties, setProperties] = useState(allProperties)
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [500, 5000],
    bedrooms: "any",
    bathrooms: "any",
    propertyType: "any",
    amenities: [],
  })
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [searchQuery, setSearchQuery] = useState("")

  const handleViewDetails = (propertyId: number) => {
    setSelectedProperty(propertyId)
  }

  const handleFilterChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Apply filters and sorting
  useEffect(() => {
    let filteredProperties = [...allProperties]

    // Apply price filter
    filteredProperties = filteredProperties.filter(
      (property) => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1],
    )

    // Apply bedroom filter
    if (filters.bedrooms !== "any") {
      if (filters.bedrooms === "studio") {
        filteredProperties = filteredProperties.filter((property) => property.bedrooms === 0)
      } else if (filters.bedrooms === "4+") {
        filteredProperties = filteredProperties.filter((property) => property.bedrooms >= 4)
      } else {
        filteredProperties = filteredProperties.filter(
          (property) => property.bedrooms === Number.parseInt(filters.bedrooms),
        )
      }
    }

    // Apply bathroom filter
    if (filters.bathrooms !== "any") {
      if (filters.bathrooms === "3+") {
        filteredProperties = filteredProperties.filter((property) => property.bathrooms >= 3)
      } else {
        filteredProperties = filteredProperties.filter(
          (property) => property.bathrooms === Number.parseFloat(filters.bathrooms),
        )
      }
    }

    // Apply property type filter
    if (filters.propertyType !== "any") {
      filteredProperties = filteredProperties.filter((property) => property.type === filters.propertyType)
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.amenities.every((amenity) => property.amenities.includes(amenity)),
      )
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filteredProperties.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
        break
      case "price-low":
        filteredProperties.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProperties.sort((a, b) => b.price - a.price)
        break
      case "bedrooms":
        filteredProperties.sort((a, b) => b.bedrooms - a.bedrooms)
        break
      case "bathrooms":
        filteredProperties.sort((a, b) => b.bathrooms - a.bathrooms)
        break
      case "sqft":
        filteredProperties.sort((a, b) => b.sqft - a.sqft)
        break
    }

    setProperties(filteredProperties)
  }, [filters, sortBy, searchQuery])

  const selectedPropertyData = selectedProperty ? properties.find((property) => property.id === selectedProperty) : null

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner with search field */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-black/90 z-10" />
        <div className="relative h-[400px] overflow-hidden">
          <Image src="/modern-apartment-balcony.png" alt="Properties Banner" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Home</h1>
              <p className="text-xl text-white/90 mb-8">
                Browse our curated selection of quality rental properties managed by OnDo Real Estate
              </p>
              <div className="flex justify-center">
                <PropertySearch onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Available Properties</h2>
                <p className="text-muted-foreground mt-2">{properties.length} properties available for rent</p>
              </div>
              <div className="flex gap-2">
                <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort by:{" "}
                      <span className="font-medium ml-1">
                        {sortBy === "newest"
                          ? "Newest"
                          : sortBy === "price-low"
                            ? "Price (Low to High)"
                            : sortBy === "price-high"
                              ? "Price (High to Low)"
                              : sortBy === "bedrooms"
                                ? "Bedrooms"
                                : sortBy === "bathrooms"
                                  ? "Bathrooms"
                                  : "Square Feet"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price (Low to High)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price (High to Low)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("bedrooms")}>Bedrooms</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("bathrooms")}>Bathrooms</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("sqft")}>Square Feet</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-md font-medium">
                        ${property.price}/mo
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{property.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{property.address}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Home className="h-4 w-4" />{" "}
                          {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Beds`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" /> {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Search className="h-4 w-4" /> {property.sqft} sqft
                        </span>
                      </div>
                      <Button className="w-full mt-4" onClick={() => handleViewDetails(property.id)}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <div className="max-w-md w-full">
                  <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">No properties found</h3>
                    <p className="text-gray-600 mb-4 dark:text-gray-300">
                      We couldn't find any properties matching your search criteria.
                    </p>
                    <Button
                      onClick={() => {
                        setFilters({
                          priceRange: [500, 5000],
                          bedrooms: "any",
                          bathrooms: "any",
                          propertyType: "any",
                          amenities: [],
                        })
                        setSearchQuery("")
                      }}
                      className="w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Property Details Modal */}
      {selectedPropertyData && (
        <PropertyDetailsModal
          company={{
            id: selectedPropertyData.id,
            name: selectedPropertyData.title,
            logo: selectedPropertyData.logo,
            rating: selectedPropertyData.rating,
            reviewCount: selectedPropertyData.reviewCount,
            address: selectedPropertyData.address,
            phone: selectedPropertyData.phone,
            specialties: selectedPropertyData.specialties,
            description: selectedPropertyData.description,
            valueRanges: selectedPropertyData.valueRanges,
            images: selectedPropertyData.images,
            leaseTerms: selectedPropertyData.leaseTerms,
            services: selectedPropertyData.services,
            fees: selectedPropertyData.fees,
            availability: selectedPropertyData.availability,
            website: selectedPropertyData.website,
          }}
          open={selectedProperty !== null}
          onOpenChange={() => setSelectedProperty(null)}
        />
      )}
    </div>
  )
}

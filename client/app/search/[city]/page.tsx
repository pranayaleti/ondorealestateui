"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResultsGrid from "@/components/results-grid"
import ResultsList from "@/components/results-list"
import { hasActiveSession, getUserZipCode, clearUserSession } from "@/lib/session-utils"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Search, MapPin, Home } from "lucide-react"
import Link from "next/link"

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 1850,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "Apartment",
    image: "/modern-apartment-balcony.png",
    description: "Luxurious apartment with modern amenities, balcony, and city views.",
    features: ["In-unit Laundry", "Fitness Center", "Pet Friendly", "Parking"],
  },
  {
    id: 2,
    title: "Spacious Suburban House",
    address: "456 Oak Ave, Suburbia",
    price: 2400,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2000,
    type: "House",
    image: "/suburban-house-garden.png",
    description: "Beautiful family home with large backyard and updated kitchen.",
    features: ["Backyard", "Garage", "Updated Kitchen", "Fireplace"],
  },
  {
    id: 3,
    title: "Modern Townhouse",
    address: "789 Pine St, Midtown",
    price: 2100,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: "Townhouse",
    image: "/modern-townhouse-garage.png",
    description: "Contemporary townhouse with attached garage and private patio.",
    features: ["Attached Garage", "Private Patio", "Stainless Appliances", "Hardwood Floors"],
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    address: "101 Elm St, Arts District",
    price: 1200,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 550,
    type: "Studio",
    image: "/modern-studio-apartment.png",
    description: "Charming studio in the heart of the arts district with great amenities.",
    features: ["Rooftop Deck", "Utilities Included", "Bike Storage", "Laundry Facilities"],
  },
  {
    id: 5,
    title: "Luxury Condo with Views",
    address: "222 Skyline Dr, Hillcrest",
    price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    type: "Condo",
    image: "/luxury-condo-view.png",
    description: "Upscale condo with panoramic city views and high-end finishes.",
    features: ["Concierge", "Pool", "Gym", "Balcony with Views"],
  },
  {
    id: 6,
    title: "Renovated Craftsman Home",
    address: "333 Maple Rd, Historic District",
    price: 2600,
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2200,
    type: "House",
    image: "/renovated-craftsman-home.png",
    description: "Beautifully renovated craftsman home with original details and modern updates.",
    features: ["Front Porch", "Fenced Yard", "Original Hardwood", "Updated Kitchen"],
  },
]

export default function SearchResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [properties, setProperties] = useState<typeof mockProperties>([])
  const [loading, setLoading] = useState(true)
  const [sessionValid, setSessionValid] = useState(false)
  const [zipCode, setZipCode] = useState("")

  const city = params.city as string

  useEffect(() => {
    // Check if user has valid session
    const hasSession = hasActiveSession()
    const savedZipCode = getUserZipCode()
    setZipCode(savedZipCode || "")

    if (!hasSession) {
      // Redirect to home if no session
      router.push("/")
      return
    }

    setSessionValid(true)

    // Simulate loading properties based on ZIP code
    setLoading(true)
    setTimeout(() => {
      // In a real app, you would fetch properties based on the ZIP code
      // For demo purposes, we'll show properties for some ZIP codes and none for others
      if (savedZipCode === "84101" || savedZipCode === "84102" || !savedZipCode) {
        setProperties(mockProperties)
      } else {
        // No properties for this ZIP code
        setProperties([])
      }
      setLoading(false)
    }, 1000)
  }, [city, router])

  const handleClearSession = () => {
    clearUserSession()
    router.push("/")
  }

  if (!sessionValid) {
    return null // Don't render anything while checking session
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Available Properties in {city}</h1>
          <p className="text-muted-foreground">{properties.length} properties found in your area</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Tabs defaultValue="grid" className="w-[200px]">
            <TabsList>
              <TabsTrigger value="grid" onClick={() => setViewMode("grid")}>
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" onClick={() => setViewMode("list")}>
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={handleClearSession}>
            Change Location
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : properties.length > 0 ? (
        <>{viewMode === "grid" ? <ResultsGrid properties={properties} /> : <ResultsList properties={properties} />}</>
      ) : (
        <div className="py-12 flex flex-col items-center">
          <div className="max-w-md w-full">
            <Alert className="mb-6">
              <Home className="h-5 w-5" />
              <AlertTitle>No properties found</AlertTitle>
              <AlertDescription>We couldn't find any available properties in ZIP code {zipCode}.</AlertDescription>
            </Alert>

            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h3 className="text-lg font-semibold mb-4">What you can do next:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Try searching in a different ZIP code or nearby area</span>
                </li>
                <li className="flex items-start gap-2">
                  <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Expand your search criteria or check back later as new properties are added regularly</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleClearSession} className="flex-1">
                Search Another Location
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/contact">Contact Us for Help</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

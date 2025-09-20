import { useState } from "react"
// Image component removed - using standard img tags
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BedDouble, Bath, SquareIcon as SquareFoot } from "lucide-react"
import { useEffect } from "react"
import { PropertyDetailsModal } from "@/components/property-details-modal"

const ZIP_CODE_CACHE_KEY = "property-management-zipcode"

interface Property {
  id: number
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  type: string
  image: string
  description: string
  features: string[]
}

interface ResultsListProps {
  properties: Property[]
}

// Mock data for property management companies
const mockCompanies = [
  {
    id: 1,
    name: "Elite Property Management",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 124,
    address: "123 Main St, Salt Lake City, UT",
    phone: "(801) 555-1234",
    specialties: ["single-family", "multi-family"],
    description:
      "Full-service property management company with over 15 years of experience in the Salt Lake City area.",
    valueRanges: ["300k-500k", "500k-750k", "750k-1m"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    leaseTerms:
      "12-month minimum lease term with option to renew. $50 application fee per adult. Security deposit equal to one month's rent.",
    services: [
      "Tenant screening",
      "Rent collection",
      "Property maintenance",
      "24/7 emergency support",
      "Online owner portal",
    ],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.elitepropertymanagement.com",
  },
  // Other company data...
]

export default function ResultsList({ properties }: ResultsListProps) {
  // State to track which property details modal is open
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)

  useEffect(() => {
    // If we're viewing search results, we want to make sure the zip code is cached
    // This handles the case where someone navigates directly to the search page
    const urlParams = new URLSearchParams(window.location.search)
    const zipFromUrl = urlParams.get("zip")

    if (zipFromUrl && zipFromUrl.length === 5 && /^\d+$/.test(zipFromUrl)) {
      localStorage.setItem(ZIP_CODE_CACHE_KEY, zipFromUrl)
    }
  }, [])

  return (
    <div className="space-y-4">
      {properties.length > 0 ? (
        properties.map((property) => (
          <Card key={property.id}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <Image
                    src={property.image || "/placeholder.svg?height=300&width=400"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 md:p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{property.address}</p>

                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center text-gray-700">
                          <BedDouble className="h-4 w-4 mr-1" />
                          <span>
                            {property.bedrooms}{" "}
                            {property.bedrooms === 0 ? "Studio" : property.bedrooms === 1 ? "Bed" : "Beds"}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>
                            {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <SquareFoot className="h-4 w-4 mr-1" />
                          <span>{property.sqft} sqft</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {property.features.slice(0, 4).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{property.features.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xl font-bold mb-4">${property.price}/mo</span>
                      <Button onClick={() => setSelectedCompany(property.id)}>View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your search criteria to see more results.</p>
        </div>
      )}

      {/* Property Details Modal */}
      {selectedCompany && (
        <PropertyDetailsModal
          company={mockCompanies.find((c) => c.id === selectedCompany)!}
          open={selectedCompany !== null}
          onOpenChange={() => setSelectedCompany(null)}
        />
      )}
    </div>
  )
}

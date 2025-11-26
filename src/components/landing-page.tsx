import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchForm } from "@/components/search-form"
import { Home, Building, DollarSign, Shield, Star } from "lucide-react"
import { PropertyDetailsModal } from "@/components/property-details-modal"
import { companyInfo } from "@/constants/companyInfo"
import { TenantScreeningSection } from "@/components/tenant-screening/TenantScreeningSection"

// Mock data for featured properties
const featuredProperties = [
  {
    id: 101,
    name: "Modern Downtown Apartment",
    description: "Salt Lake City, UT",
    image: `${import.meta.env.BASE_URL}modern-apartment-balcony.png`,
    bedrooms: 2,
    bathrooms: 2,
    price: 1850,
    shortDescription: "Luxury apartment with balcony and city views, pet-friendly with modern amenities.",
    address: "123 Downtown Ave, Salt Lake City, UT",
    logo: `${import.meta.env.BASE_URL}placeholder.svg?height=80&width=80`,
    rating: 4.8,
    reviewCount: 24,
    phone: "(801) 555-1234",
    specialties: ["apartment", "downtown"],
    valueRanges: ["300k-500k"],
    images: [
      `${import.meta.env.BASE_URL}modern-apartment-balcony.png`,
      `${import.meta.env.BASE_URL}placeholder.svg?height=600&width=800`,
      `${import.meta.env.BASE_URL}placeholder.svg?height=600&width=800`,
    ],
    leaseTerms: "12-month minimum lease term with option to renew. $50 application fee per adult.",
    services: ["24/7 maintenance", "Package receiving", "Online rent payment", "Fitness center", "Rooftop lounge"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.downtownapartments.com",
  },
  {
    id: 102,
    name: "Family Home with Garden",
    description: "Holladay, UT",
    image: "/suburban-house-garden.png",
    bedrooms: 3,
    bathrooms: 2.5,
    price: 2400,
    shortDescription: "Spacious family home with fenced backyard, finished basement, and 2-car garage.",
    address: "456 Garden Lane, Holladay, UT",
    logo: `${import.meta.env.BASE_URL}placeholder.svg?height=80&width=80`,
    rating: 4.6,
    reviewCount: 18,
    phone: "(801) 555-5678",
    specialties: ["single-family", "suburban"],
    valueRanges: ["500k-750k"],
    images: [
      "/suburban-house-garden.png",
      `${import.meta.env.BASE_URL}placeholder.svg?height=600&width=800`,
      `${import.meta.env.BASE_URL}placeholder.svg?height=600&width=800`,
    ],
    leaseTerms: "12-month lease. $45 application fee per adult. Security deposit equal to one month's rent.",
    services: ["Lawn maintenance", "Snow removal", "Pest control", "Annual HVAC service", "24/7 emergency support"],
    fees: "Management fee: 7% of monthly rent. Leasing fee: 75% of first month's rent.",
    availability: "Available in 30 days",
    website: "www.familyhomerentals.com",
  },
  {
    id: 103,
    name: "Modern Townhouse",
    description: "Midvale, UT",
    image: "/modern-townhouse-garage.png",
    bedrooms: 2,
    bathrooms: 1.5,
    price: 1650,
    shortDescription: "Contemporary townhouse with attached garage, open floor plan, and community pool access.",
    address: "789 Modern Way, Midvale, UT",
    logo: `${import.meta.env.BASE_URL}placeholder.svg?height=80&width=80`,
    rating: 4.7,
    reviewCount: 15,
    phone: "(801) 555-9012",
    specialties: ["townhouse", "modern"],
    valueRanges: ["300k-500k"],
    images: [
      "/modern-townhouse-garage.png",
      `${import.meta.env.BASE_URL}placeholder.svg?height=600&width=800`,
      `${import.meta.env.BASE_URL}placeholder.svg?height=600&width=800`,
    ],
    leaseTerms: "6 or 12-month lease terms. $40 application fee. Security deposit equal to one month's rent.",
    services: ["Community pool maintenance", "Exterior maintenance", "Trash removal", "Snow removal", "HOA management"],
    fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
    availability: "Immediate",
    website: "www.moderntownhomes.com",
  },
]

export default function LandingPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  const handleViewDetails = (propertyId: number) => {
    setSelectedProperty(propertyId)
  }

  const selectedPropertyData = selectedProperty
    ? featuredProperties.find((property) => property.id === selectedProperty)
    : null

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative w-full bg-gradient-to-r from-gray-900 to-gray-800 py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/modern-office-building.png" alt="Modern building" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Perfect Rental Property
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            {companyInfo.name} helps you find the ideal rental home with professional property management services.
          </p>
          <div className="mx-auto max-w-md">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-950 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <TenantScreeningSection
            ctaHref="/contact"
            ctaLabel="Activate screening"
            description="Human experts plus AI instantly surface fraud, verify ID, and return reports your owners trust."
            title="Tenant screening that actually works"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How {companyInfo.name} Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <Home className="h-8 w-8 text-gray-700 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">1. Find Properties</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your ZIP code to browse available rental properties in your area.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <Building className="h-8 w-8 text-gray-700 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">2. Schedule Viewings</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tour your favorite properties with our professional property managers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-gray-700 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">3. Move In</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete your application, sign the lease, and enjoy your new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Rental Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="dark:bg-gray-900">
                <div className="relative h-48 w-full">
                  <img
                    src={property.image || `${import.meta.env.BASE_URL}placeholder.svg`}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="dark:text-white">{property.name}</CardTitle>
                  <CardDescription className="dark:text-gray-300">{property.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm dark:text-gray-300">
                      {property.bedrooms} bed • {property.bathrooms} bath
                    </span>
                    <span className="font-semibold dark:text-white">${property.price}/mo</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{property.shortDescription}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full dark:text-white dark:border-gray-600 dark:hover:bg-gray-800"
                    onClick={() => handleViewDetails(property.id)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <Link to="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Owner Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Property Owners</h2>
              <p className="text-lg mb-6 dark:text-gray-300">
                Let {companyInfo.name} handle the day-to-day management of your rental property. We provide comprehensive
                property management services so you can enjoy passive income without the hassle.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
                  <span className="dark:text-gray-300">Professional tenant screening and placement</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
                  <span className="dark:text-gray-300">Rent collection and financial reporting</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
                  <span className="dark:text-gray-300">Maintenance coordination and 24/7 emergency response</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
                  <span className="dark:text-gray-300">Regular property inspections and detailed reports</span>
                </li>
              </ul>
              <Button asChild className="bg-black hover:bg-gray-800 text-white">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img src="/city-map-with-pin.png" alt="Property management" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <img src="/professional-woman-smiling.png" alt="Sarah J." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-white">Sarah J.</CardTitle>
                    <CardDescription className="dark:text-gray-400">Tenant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{companyInfo.name} made finding my new apartment so easy. Their team was responsive and helped me find
                  exactly what I was looking for in my price range."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <img src="/professional-man-suit.png" alt="Michael T." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-white">Michael T.</CardTitle>
                    <CardDescription className="dark:text-gray-400">Property Owner</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Since hiring {companyInfo.name} to manage my rental properties, I've had zero stress. They handle
                  everything professionally and my income has actually increased."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src="/professional-woman-glasses.png"
                      alt="Jennifer L."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-white">Jennifer L.</CardTitle>
                    <CardDescription className="dark:text-gray-400">Tenant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "The maintenance service through {companyInfo.name} is outstanding. Any issue I've had has been resolved
                  within 24 hours. Best property management I've experienced."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Rental?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enter your ZIP code to start browsing available properties in your area.
          </p>
          <div className="mx-auto max-w-md">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ZIP code"
                className="flex-1 px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Button type="submit" className="bg-black hover:bg-gray-700 text-white">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedPropertyData && (
        <PropertyDetailsModal
          company={{
            id: selectedPropertyData.id,
            name: selectedPropertyData.name,
            logo: selectedPropertyData.logo,
            rating: selectedPropertyData.rating,
            reviewCount: selectedPropertyData.reviewCount,
            address: selectedPropertyData.address,
            phone: selectedPropertyData.phone,
            specialties: selectedPropertyData.specialties,
            description: selectedPropertyData.shortDescription,
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

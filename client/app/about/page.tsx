import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageBanner } from "@/components/page-banner"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageBanner
        title="About OnDo PropertyMatch"
        subtitle="Professional property management services connecting quality properties with qualified tenants"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 dark:text-gray-300">
              OnDo PropertyMatch is a professional property management company dedicated to connecting quality rental
              properties with responsible tenants while providing exceptional management services to property owners.
            </p>

            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Mission</h2>
            <p className="mb-8 dark:text-gray-300">
              Our mission is to create positive rental experiences through professional management, transparent
              communication, and exceptional service. We strive to maximize property values for owners while providing
              safe, comfortable homes for tenants.
            </p>

            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 dark:text-white">For Property Owners</h3>
                <ul className="space-y-2 dark:text-gray-300">
                  <li>• Comprehensive property marketing</li>
                  <li>• Tenant screening and placement</li>
                  <li>• Rent collection and disbursement</li>
                  <li>• Maintenance coordination</li>
                  <li>• Regular property inspections</li>
                  <li>• Financial reporting</li>
                  <li>• Legal compliance management</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 dark:text-white">For Tenants</h3>
                <ul className="space-y-2 dark:text-gray-300">
                  <li>• Wide selection of quality rental properties</li>
                  <li>• Transparent application process</li>
                  <li>• Professional property showings</li>
                  <li>• Responsive maintenance service</li>
                  <li>• Online rent payment options</li>
                  <li>• 24/7 emergency support</li>
                  <li>• Renewal options for long-term stability</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Team</h2>
            <p className="mb-8 dark:text-gray-300">
              Our team consists of experienced property management professionals who are dedicated to providing
              exceptional service. From our property managers to our maintenance staff, everyone at OnDo PropertyMatch is
              committed to creating positive rental experiences.
            </p>

            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Our Coverage Area</h2>
            <p className="mb-8 dark:text-gray-300">
              OnDo PropertyMatch currently serves the greater Salt Lake City area, including Salt Lake City, Holladay,
              Midvale, Magna, and surrounding communities. We're continuously expanding to new areas to better serve our
              clients.
            </p>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">Ready to work with us?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/properties">Browse Properties</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">OnDo Real Estate</h3>
            <p className="text-gray-400">
              Professional property management services connecting quality properties with qualified tenants.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white">
                  Property Listings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Property Management
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Tenant Placement
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              123 Main Street, Suite 100
              <br />
              Salt Lake City, UT 84101
              <br />
              <Link href="tel:+15551234567" className="hover:text-white">
                (555) 123-4567
              </Link>
              <br />
              <Link href="mailto:info@ondo.Real Estate.com" className="hover:text-white">
                info@ondo.Real Estate.com
              </Link>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Real Estate. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

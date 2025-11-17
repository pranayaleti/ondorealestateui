import { Link } from "react-router-dom"
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Home,
  Building,
  Users,
  HelpCircle,
  FileText,
  Shield
} from "lucide-react"
import { SITE_SOCIALS, SITE_ADDRESS, SITE_PHONE, SITE_EMAILS, SITE_HOURS_LABEL, SITE_ADDRESS_STREET, SITE_ADDRESS_CITY, SITE_ADDRESS_REGION, SITE_ADDRESS_POSTAL_CODE } from "@/lib/site"

function EqualHousingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="20"
      height="20"
      aria-hidden="true"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      {/* House */}
      <path d="M16 32 L32 20 L48 32" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="32" width="24" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Equal sign */}
      <rect x="24" y="36" width="16" height="2.5" fill="currentColor" opacity="0.85" />
      <rect x="24" y="41" width="16" height="2.5" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M10.7 2.1c-.7-.3-1.4.2-1.5.9l-.7 6.2c-.1.8.7 1.4 1.4 1.1l3.7-1.6c.7-.3.9-1.2.3-1.7l-3.2-4.9c-.1-.1-.2-.1-.3-.2zM21.5 10.3l-5.9-.9c-.8-.1-1.4.7-1.1 1.4l1.7 3.7c.3.7 1.2.9 1.7.3l4.7-3.3c.6-.4.4-1.3-.1-1.6zM7 11.9l-4.9 3.2c-.6.4-.6 1.3 0 1.7l5.1 3.6c.6.4 1.4 0 1.4-.7l-.2-6.1c0-.8-.9-1.2-1.4-.7zM12.8 14.6l-3.7 1.6c-.7.3-.9 1.2-.3 1.7l3.3 2.3c.6.4 1.4.1 1.6-.6l.6-3.9c.1-.8-.7-1.4-1.5-1.1z"/>
    </svg>
  )
}

function GoogleBusinessIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3h-3l-.8-2h-2.4l-.8 2h-2.4l-.8-2H7.2L6.4 10H4V7zm0 5h16v5a2 2 0 0 1-2 2h-5v-3h3.2a3.6 3.6 0 1 0 0-3.2H13v-1.8H4V12zM8 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    </svg>
  )
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M14.5 3c.5 1.7 1.8 3.2 3.5 3.9.6.3 1.2.4 1.8.5V9c-1.6-.1-3.1-.7-4.3-1.6v6.1c0 3-2.4 5.5-5.5 5.5S4.5 16.5 4.5 13.5 6.9 8 10 8c.5 0 1 .1 1.5.2v2.5c-.5-.2-1-.3-1.5-.3-1.8 0-3.2 1.5-3.2 3.2s1.5 3.2 3.2 3.2 3.2-1.5 3.2-3.2V3h1.3z"/>
    </svg>
  )
}

function LinktreeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      <path fill="currentColor" d="M12 6c-3.314 0-6 2.686-6 6 0 2.25 1.5 4.25 3.5 5.25.25.125.5.25.75.25.5 0 1-.25 1.25-.75.25-.5.25-1 .25-1.5 0-1.25-.5-2.5-1.5-3.5-.5-.5-.75-1.25-.75-2 0-1.5 1-2.5 2.5-2.5.75 0 1.5.25 2 .75.5.5.75 1.25.75 2 0 .75-.25 1.5-.75 2-.5.5-1.25.75-2 .75-.5 0-1-.25-1.25-.75-.25-.5-.25-1-.25-1.5 0-1.25.5-2.5 1.5-3.5.5-.5.75-1.25.75-2 0-1.5-1-2.5-2.5-2.5z"/>
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true">
      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-1.012-2.03-1.129-.272-.118-.47-.178-.668.178-.197.356-.768 1.129-.94 1.36-.173.233-.346.262-.643.088-.297-.173-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
  )
}

export function Footer() {
  // Define social media mapping in a deterministic order to prevent hydration issues
  const socialMediaMap = [
    { pattern: "facebook.com", name: "Facebook", Component: Facebook, hover: "hover:text-primary" },
    { pattern: "youtube.com", name: "YouTube", Component: Youtube, hover: "hover:text-destructive" },
    { pattern: "youtu.be", name: "YouTube", Component: Youtube, hover: "hover:text-destructive" },
    { pattern: "instagram.com", name: "Instagram", Component: Instagram, hover: "hover:text-pink-500" },
    { pattern: "tiktok.com", name: "TikTok", Component: TiktokIcon, hover: "hover:text-fuchsia-500" },
    { pattern: "linkedin.com", name: "LinkedIn", Component: Linkedin, hover: "hover:text-primary" },
    { pattern: "x.com", name: "Twitter", Component: Twitter, hover: "hover:text-sky-500" },
    { pattern: "twitter.com", name: "Twitter", Component: Twitter, hover: "hover:text-sky-500" },
    { pattern: "pinterest.com", name: "Pinterest", Component: PinterestIcon, hover: "hover:text-red-500" },
    { pattern: "yelp.com", name: "Yelp", Component: YelpIcon, hover: "hover:text-red-500" },
    { pattern: "linktr.ee", name: "Linktree", Component: LinktreeIcon, hover: "hover:text-green-500" },
    { pattern: "google.com/maps", name: "Google Business", Component: GoogleBusinessIcon, hover: "hover:text-green-500" },
    { pattern: "google.com/business", name: "Google Business", Component: GoogleBusinessIcon, hover: "hover:text-green-500" },
    { pattern: "g.page", name: "Google Business", Component: GoogleBusinessIcon, hover: "hover:text-green-500" },
  ]

  const socials = SITE_SOCIALS
    .map((href) => {
      const lower = href.toLowerCase()
      const match = socialMediaMap.find(item => lower.includes(item.pattern))
      if (match) {
        return { 
          name: match.name, 
          Component: match.Component, 
          href, 
          hover: match.hover,
          key: `${match.name}-${href}` // Add stable key for consistent rendering
        }
      }
      return null
    })
    .filter(Boolean) as Array<{ name: string; Component: any; href: string; hover: string; key: string }>

  return (
    <footer className="w-full bg-card text-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* For Tenants */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" />
              For Tenants
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/properties" className="text-muted-foreground hover:text-foreground">Find Properties</Link></li>
              <li><Link to="/properties" className="text-muted-foreground hover:text-foreground">Search Rentals</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Application Process</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Schedule Viewing</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">Tenant FAQs</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Maintenance Requests</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Online Payments</Link></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="h-5 w-5" />
              For Owners
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Property Management</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Tenant Placement</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Rent Collection</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Maintenance Services</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Owner Portal</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Financial Reports</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Property Inspections</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/properties" className="text-muted-foreground hover:text-foreground">Property Listings</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Tenant Screening</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Lease Management</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Maintenance Coordination</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">24/7 Emergency Support</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Financial Management</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Legal Compliance</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Our Team</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Property Guides</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Rental Tips</Link></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              About Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Our Story</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Mission & Values</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">News & Updates</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Testimonials</Link></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help Center
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Maintenance Help</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Payment Questions</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Lease Information</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Emergency Contacts</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Support Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Customer Service</p>
                <a
                  href={`tel:${SITE_PHONE.replace(/[^+\d]/g, "")}`}
                  className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label={`Call ${SITE_PHONE}`}
                >
                  {SITE_PHONE}
                </a>
                <p className="text-xs text-muted-foreground">{SITE_HOURS_LABEL}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <a
                  href={`mailto:${SITE_EMAILS.primary}`}
                  className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label={`Email ${SITE_EMAILS.primary}`}
                >
                  {SITE_EMAILS.primary}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Our Location</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label="Open address in Google Maps"
                >
                  <span className="block">{SITE_ADDRESS_STREET}</span>
                  <span className="block">{`${SITE_ADDRESS_CITY}, ${SITE_ADDRESS_REGION} ${SITE_ADDRESS_POSTAL_CODE}`}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Legal */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              {socials.map(({ name, Component, href, hover, key }) => (
                <a
                  key={key}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${hover}`}
                >
                  <Component className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border">
                <a
                  href="https://linktr.ee/ondorealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Scan QR code to access all social media links"
                >
                  <img 
                    src="/Linktree.png" 
                    alt="Linktree QR Code - Scan to access all social media" 
                    className="h-8 w-8 rounded border bg-white p-0.5"
                  />
                </a>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Click or Scan for all links
                </span>
              </div>
            </div>

            {/* Legal Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <EqualHousingIcon className="text-muted-foreground" />
                <span>Equal Housing Opportunity</span>
              </div>
              <span className="h-4 w-px bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm border border-gray-500 flex items-center justify-center text-[8px] font-semibold">R</div>
                <span>REALTOR</span>
              </div>
              <span className="h-4 w-px bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="rounded border border-gray-500 px-1 py-0.5 text-[8px] font-semibold tracking-wide">MLS</div>
                <span>Multiple Listing Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p>© {new Date().getFullYear()} Ondo Real Estate. All rights reserved.</p>
              <p className="flex items-center gap-1">
                <span className="text-muted-foreground/80">Designed. Developed. Deployed by</span>
                <a 
                  href="https://www.ondosoft.com/?utm_source=ondorealestate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:text-primary transition-colors duration-200 hover:underline decoration-primary underline-offset-2"
                >
                  OnDoSoft
                </a>
                <span className="text-muted-foreground/80">The digital engine behind <Link to="/" className="text-primary hover:text-primary/80 hover:underline">Ondo Real Estate</Link>.</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/licensing" className="hover:text-foreground">Licensing</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms of Use</Link>
              <Link to="/accessibility" className="hover:text-foreground">Accessibility</Link>
              <Link to="/sitemap" className="hover:text-foreground">Site Map</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

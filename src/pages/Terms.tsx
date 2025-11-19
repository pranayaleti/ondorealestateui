import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { companyInfo } from "@/constants/companyInfo"

const obligations = [
  "Compliance with federal, state, and municipal housing laws, including the Fair Housing Act and state landlord-tenant statutes.",
  "Authorization for credit, rental history, and background screenings required for tenancy within the United States.",
  "Consent to electronic signatures, notices, and disclosures pursuant to the ESIGN Act.",
  "Responsibility for applicable US sales tax, occupancy tax, and municipal fees where required.",
  "Agreement to resolve disputes under Utah law with venue in Salt Lake County, unless superseded by the lease agreement.",
]

const paymentTerms = [
  "All charges are denominated in US Dollars (USD). International payments are not accepted.",
  "Rent, management fees, and maintenance invoices may include state-specific sales tax as required.",
  "Approved payment methods include ACH, major US credit/debit cards, certified checks, and domestic digital wallets (e.g., Venmo, Zelle).",
  "Late fees, security deposits, and prorated rent follow the applicable state statutes for the property location.",
]

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">US-Only Operations</p>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Effective Date: January 1, 2025</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Scope & Eligibility</CardTitle>
            <CardDescription>
              {companyInfo.name} serves property owners and residents located in the United States. Services are not offered
              outside US jurisdictions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Customer Obligations</h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                {obligations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Payment & Taxes</h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                {paymentTerms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Regulatory Notices</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Fair Housing Act</Badge>
                <Badge variant="secondary">Equal Credit Opportunity Act</Badge>
                <Badge variant="secondary">HUD Guidelines</Badge>
                <Badge variant="secondary">State Privacy Laws</Badge>
              </div>
              <p className="text-muted-foreground">
                We provide required disclosures for lead-based paint, habitability, rent regulations, and habitability
                standards in the states where we manage properties.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


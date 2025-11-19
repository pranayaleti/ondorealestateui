import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { companyInfo } from "@/constants/companyInfo"

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information that identifies, relates to, or could reasonably be linked with a particular consumer or household. This includes account details, rental history, payment records, maintenance requests, and communications with our team.",
  },
  {
    title: "Use of Personal Information",
    content:
      "Information is used to provide property management services, process rent payments, perform credit and background checks, comply with federal, state, and local housing regulations, and deliver mandatory disclosures required within the United States.",
  },
  {
    title: "California Consumer Privacy Act (CCPA)",
    content:
      "California residents have the right to know what personal information we collect, request deletion of personal data (subject to legal retention requirements), and opt out of the sale or sharing of personal information. We do not sell personal information.",
  },
  {
    title: "State-Specific Privacy Rights",
    content:
      `Residents of states with enacted privacy legislation (including Colorado, Connecticut, Utah, and Virginia) may exercise similar rights to access, correct, delete, or restrict the use of their personal information by contacting privacy@${companyInfo.social.twitterDomain}.`,
  },
  {
    title: "Data Retention",
    content:
      "Records are retained to meet federal and state housing laws, tax documentation requirements, and compliance obligations, including HUD, Fair Housing, IRS, and state landlord-tenant regulations.",
  },
  {
    title: "Contact & Requests",
    content:
      `To submit a privacy request or appeal a decision, email privacy@${companyInfo.social.twitterDomain} or mail ${companyInfo.name} Privacy, ${companyInfo.address.streetAddress}, ${companyInfo.address.addressLocality}, ${companyInfo.address.addressRegion} ${companyInfo.address.postalCode}. We respond within legally mandated timelines for US residents.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">US-Only Operations</p>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Effective Date: January 1, 2025 • Applicable within the United States of America
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Commitment to US Privacy Regulations</CardTitle>
            <CardDescription>
              {companyInfo.name} complies with CCPA, CPRA, and applicable state privacy statutes. We do not process data for
              residents outside the United States.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="space-y-2">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


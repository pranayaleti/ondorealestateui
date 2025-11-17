import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageBanner } from "@/components/page-banner"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our property management and rental services"
      />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-6">For Tenants</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I apply for a property?</AccordionTrigger>
                  <AccordionContent>
                    You can apply for a property by clicking the "View Details" button on any property listing. This
                    will open an application form where you can provide your information. Once submitted, a property
                    manager will review your application and contact you within 1-2 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What documents do I need to apply?</AccordionTrigger>
                  <AccordionContent>
                    For a complete rental application, you'll typically need proof of income (pay stubs, tax returns, or
                    bank statements), photo ID, references from previous landlords, and authorization for a credit and
                    background check. Having these documents ready will speed up your application process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How much is the security deposit?</AccordionTrigger>
                  <AccordionContent>
                    Security deposits typically equal one month's rent, but may vary based on the property and your
                    application details. The exact amount will be specified in your lease agreement. Security deposits
                    are fully refundable at the end of your lease, minus any charges for damages beyond normal wear and
                    tear.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I report maintenance issues?</AccordionTrigger>
                  <AccordionContent>
                    You can report maintenance issues through our tenant portal, by email, or by phone for emergencies.
                    Our maintenance team responds to emergency requests within 24 hours and non-emergency requests
                    within 2-3 business days. We provide 24/7 emergency maintenance support for issues like water leaks,
                    heating failures, or security concerns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I have pets in my rental?</AccordionTrigger>
                  <AccordionContent>
                    Pet policies vary by property. Properties that allow pets typically require an additional pet
                    deposit and/or monthly pet rent. Breed and size restrictions may apply. Service animals are
                    accommodated according to fair housing laws and are exempt from pet fees.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">For Property Owners</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="owner-1">
                  <AccordionTrigger>What services do you offer property owners?</AccordionTrigger>
                  <AccordionContent>
                    We offer comprehensive property management services including tenant screening and placement, rent
                    collection, property maintenance, financial reporting, legal compliance, and property marketing. We
                    can customize our services based on your specific needs and property requirements.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-2">
                  <AccordionTrigger>How do you screen potential tenants?</AccordionTrigger>
                  <AccordionContent>
                    Our thorough screening process includes credit checks, criminal background checks, employment
                    verification, income verification (requiring income of 3x the monthly rent), rental history
                    verification, and personal references. This comprehensive approach helps us find reliable,
                    responsible tenants for your property.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-3">
                  <AccordionTrigger>What are your management fees?</AccordionTrigger>
                  <AccordionContent>
                    Our management fees typically range from 7-10% of monthly collected rent, depending on the property
                    type, size, and services required. We also charge a leasing fee of 50-75% of the first month's rent
                    for new tenant placement. We don't get paid unless you get paid, aligning our interests with yours.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-4">
                  <AccordionTrigger>How do you handle maintenance and repairs?</AccordionTrigger>
                  <AccordionContent>
                    We have a network of licensed, insured, and vetted contractors who provide quality work at
                    reasonable rates. For minor repairs (typically under $500), we handle them without owner approval to
                    ensure prompt service. For larger repairs, we consult with you, provide estimates, and proceed with
                    your approval.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="owner-5">
                  <AccordionTrigger>How often will I receive statements and payments?</AccordionTrigger>
                  <AccordionContent>
                    Property owners receive detailed monthly statements showing all income and expenses. Rent payments,
                    minus management fees and any maintenance costs, are directly deposited to your bank account by the
                    15th of each month. You'll also receive annual statements for tax purposes and have 24/7 access to
                    your property's financial information through our owner portal.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

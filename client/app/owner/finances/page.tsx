import type { Metadata } from "next"
import { FinancesView } from "@/components/owner/finances-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DollarSign, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Finances | OnDo Real Estate",
  description: "Manage your property finances",
}

export default function FinancesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/owner/finances">
                <DollarSign className="h-4 w-4 mr-1" />
                Finances
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Financial Management</h1>
        <p className="text-muted-foreground">Track income, expenses, and financial performance</p>
      </div>

      <FinancesView />
    </div>
  )
}

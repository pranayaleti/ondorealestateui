import type { Metadata } from "next"
import { DocumentsView } from "@/components/owner/documents-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FileText, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Documents | OnDo PropertyMatch",
  description: "Manage your property documents",
}

export default function DocumentsPage() {
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
              <BreadcrumbLink href="/owner/documents">
                <FileText className="h-4 w-4 mr-1" />
                Documents
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Document Management</h1>
        <p className="text-muted-foreground">Store, organize, and share important documents</p>
      </div>

      <DocumentsView />
    </div>
  )
}

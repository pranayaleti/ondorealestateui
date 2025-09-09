import type { Metadata } from "next"
import { MessagesView } from "@/components/owner/messages-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Messages | OnDo Real Estate",
  description: "Communicate with tenants and service providers",
}

export default function MessagesPage() {
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
              <BreadcrumbLink href="/owner/messages">
                <MessageSquare className="h-4 w-4 mr-1" />
                Messages
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with tenants and service providers</p>
      </div>

      <MessagesView />
    </div>
  )
}

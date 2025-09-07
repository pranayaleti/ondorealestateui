import { UnderMaintenance } from "@/components/ui/under-maintenance"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Settings } from "lucide-react"

export default function OwnerSettingsPage() {
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
              <BreadcrumbLink href="/owner/settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <UnderMaintenance
        title="Settings Coming Soon"
        description="We're currently developing the settings page to give you more control over your account. Please check back soon."
        showHomeButton={false}
        actionText="Return to Dashboard"
        actionHref="/owner"
      />
    </div>
  )
}

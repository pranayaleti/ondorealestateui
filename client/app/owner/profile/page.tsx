import type { Metadata } from "next"
import { ProfileView } from "@/components/owner/profile-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile | Real Estate",
  description: "Manage your profile information",
}

export default function ProfilePage() {
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
              <BreadcrumbLink href="/owner/profile">
                <User className="h-4 w-4 mr-1" />
                Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings</p>
      </div>

      <ProfileView />
    </div>
  )
}

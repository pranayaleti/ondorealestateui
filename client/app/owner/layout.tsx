import type React from "react"
import type { Metadata } from "next"
import AuthGuard from "@/components/auth-guard"
import Link from "next/link"
import {
  Building,
  FileText,
  Home,
  MessageSquare,
  Settings,
  PenToolIcon as Tool,
  DollarSign,
  Users,
  User,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Owner Dashboard - OnDo PropertyMatch",
  description: "Manage your properties and tenants",
}

interface OwnerLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { name: "Dashboard", href: "/owner", icon: Home },
  { name: "Properties", href: "/owner/properties", icon: Building },
  { name: "Tenants", href: "/owner/tenants", icon: Users },
  { name: "Maintenance", href: "/owner/maintenance", icon: Wrench },
  { name: "Finances", href: "/owner/finances", icon: DollarSign },
  { name: "Documents", href: "/owner/documents", icon: FileText },
  { name: "Messages", href: "/owner/messages", icon: MessageSquare },
  { name: "Profile", href: "/owner/profile", icon: User },
  { name: "Settings", href: "/owner/settings", icon: Settings },
]

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <AuthGuard requiredRole="owner">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-muted/40 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Owner Portal</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/owner">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/owner/properties">
              <Button variant="ghost" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                Properties
              </Button>
            </Link>
            <Link href="/owner/tenants">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Tenants
              </Button>
            </Link>
            <Link href="/owner/maintenance">
              <Button variant="ghost" className="w-full justify-start">
                <Tool className="mr-2 h-4 w-4" />
                Maintenance
              </Button>
            </Link>
            <Link href="/owner/finances">
              <Button variant="ghost" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Finances
              </Button>
            </Link>
            <Link href="/owner/documents">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
            </Link>
            <Link href="/owner/messages">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/owner/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Link href="/owner/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-10">
          <div className="grid grid-cols-5 gap-1 p-1">
            <Link href="/owner">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Home className="h-4 w-4" />
                <span className="text-xs mt-1">Home</span>
              </Button>
            </Link>
            <Link href="/owner/properties">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Building className="h-4 w-4" />
                <span className="text-xs mt-1">Properties</span>
              </Button>
            </Link>
            <Link href="/owner/tenants">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Users className="h-4 w-4" />
                <span className="text-xs mt-1">Tenants</span>
              </Button>
            </Link>
            <Link href="/owner/maintenance">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Tool className="h-4 w-4" />
                <span className="text-xs mt-1">Maintenance</span>
              </Button>
            </Link>
            <Link href="/owner/finances">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs mt-1">Finances</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col pb-16 md:pb-0">{children}</div>
      </div>
    </AuthGuard>
  )
}

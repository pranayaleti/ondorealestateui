import type React from "react"
import type { Metadata } from "next"
import AuthGuard from "@/components/auth-guard"
import Link from "next/link"
import { Building, FileText, Home, MessageSquare, Settings, PenToolIcon as Tool, CreditCard, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Tenant Dashboard - PropertyMatch",
  description: "Manage your rental property and payments",
}

interface TenantLayoutProps {
  children: React.ReactNode
}

export default function TenantLayout({ children }: TenantLayoutProps) {
  return (
    <AuthGuard requiredRole="tenant">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-muted/40 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Tenant Portal</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/tenant">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/tenant/property">
              <Button variant="ghost" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                My Property
              </Button>
            </Link>
            <Link href="/tenant/lease">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Lease
              </Button>
            </Link>
            <Link href="/tenant/payments">
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </Button>
            </Link>
            <Link href="/tenant/maintenance">
              <Button variant="ghost" className="w-full justify-start">
                <Tool className="mr-2 h-4 w-4" />
                Maintenance
              </Button>
            </Link>
            <Link href="/tenant/documents">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
            </Link>
            <Link href="/tenant/messages">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/tenant/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Link href="/tenant/settings">
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
            <Link href="/tenant">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Home className="h-4 w-4" />
                <span className="text-xs mt-1">Home</span>
              </Button>
            </Link>
            <Link href="/tenant/property">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Building className="h-4 w-4" />
                <span className="text-xs mt-1">Property</span>
              </Button>
            </Link>
            <Link href="/tenant/maintenance">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <Tool className="h-4 w-4" />
                <span className="text-xs mt-1">Maintenance</span>
              </Button>
            </Link>
            <Link href="/tenant/payments">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs mt-1">Payments</span>
              </Button>
            </Link>
            <Link href="/tenant/messages">
              <Button variant="ghost" size="sm" className="w-full flex flex-col items-center py-2 h-auto">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs mt-1">Messages</span>
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

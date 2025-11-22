import { Wrench, CreditCard, FileText, MessageSquare, DollarSign, Calendar, Building } from "lucide-react"
import { PortalConfig, StatCardConfig, QuickAction, DashboardTab } from "../../base/types"
import { propertyApi, maintenanceApi, type Property, type MaintenanceRequest } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { formatUSDate } from "@/lib/us-format"
import type { ActivityItem } from "../../base/types"

/**
 * Tenant Portal Configuration
 */
export function createTenantConfig(
  assignedProperty: Property | null,
  maintenanceRequests: MaintenanceRequest[]
): PortalConfig {
  // Calculate next rent due date
  const getNextRentDueDate = () => {
    if (!assignedProperty) return null
    const moveInDate = new Date(assignedProperty.createdAt)
    const now = new Date()
    const nextDueDate = new Date(moveInDate)
    while (nextDueDate <= now) {
      nextDueDate.setMonth(nextDueDate.getMonth() + 1)
    }
    return nextDueDate
  }

  const nextRentDue = getNextRentDueDate()
  const formatRentDueDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  const activeRequests = maintenanceRequests.filter(r => 
    (r.status === 'in_progress' || r.status === 'pending') && r.assignedTo
  )

  // Stat cards configuration
  const statCards: StatCardConfig[] = [
    {
      id: "next-rent-due",
      title: "Next Rent Due",
      value: `$${assignedProperty?.price?.toLocaleString() || '0'}`,
      subtitle: nextRentDue ? `Due ${formatRentDueDate(nextRentDue)}` : 'N/A',
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      href: "/tenant/payments",
    },
    {
      id: "lease-expires",
      title: "Lease Expires",
      value: "Dec 31, 2024", // Mock - would come from lease data
      subtitle: "Renewal available",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      href: "/tenant/lease-details",
    },
    {
      id: "maintenance-requests",
      title: "Active Requests",
      value: activeRequests.length,
      subtitle: "In progress",
      icon: <Wrench className="h-4 w-4 text-muted-foreground" />,
      href: "/tenant/maintenance",
    },
    {
      id: "property-status",
      title: "Property Status",
      value: assignedProperty ? "Active" : "Not Assigned",
      subtitle: assignedProperty ? `${assignedProperty.addressLine1}, ${assignedProperty.city}` : "No property assigned",
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      href: assignedProperty ? "/tenant/lease-details" : undefined,
    },
  ]

  // Quick actions configuration
  const quickActions: QuickAction[] = [
    {
      id: "maintenance",
      title: "Maintenance",
      description: "Submit Request",
      icon: <Wrench className="h-8 w-8 text-blue-500" />,
      href: "/tenant/maintenance",
    },
    {
      id: "payments",
      title: "Payments",
      description: "Coming Soon...",
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      href: "/tenant/payments",
    },
    {
      id: "documents",
      title: "Documents",
      description: "Coming Soon...",
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      href: "/tenant/documents",
    },
    {
      id: "messages",
      title: "Messages",
      description: "Coming Soon...",
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />,
      href: "/tenant/messages",
    },
  ]

  // Generate activity feed
  const activities: ActivityItem[] = [
    ...maintenanceRequests.slice(0, 3).map((m, idx) => ({
      id: `maint-${idx}`,
      type: "maintenance" as const,
      message: `Maintenance request "${m.title}" ${m.status === 'completed' ? 'completed' : 'updated'}`,
      time: formatUSDate(m.updatedAt),
      status: m.status === 'completed' ? 'success' as const : 'warning' as const,
      href: `/tenant/maintenance`,
    })),
  ]

  // Dashboard tabs configuration
  const tabs: DashboardTab[] = [
    {
      id: "overview",
      label: "Overview",
      value: "overview",
      content: (
        <div className="space-y-6">
          {assignedProperty ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Property</CardTitle>
                <CardDescription>Current rental property details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p className="text-lg font-semibold">
                    {assignedProperty.addressLine1}
                    {assignedProperty.addressLine2 && `, ${assignedProperty.addressLine2}`}
                    {assignedProperty.city && `, ${assignedProperty.city}`}
                    {assignedProperty.state && `, ${assignedProperty.state}`}
                    {assignedProperty.zipcode && ` ${assignedProperty.zipcode}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Rent</p>
                  <p className="text-lg font-semibold">${assignedProperty.price?.toLocaleString()}</p>
                </div>
                <Link to="/tenant/lease-details">
                  <Button variant="outline" className="w-full">
                    View Lease Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Property Assigned</CardTitle>
                <CardDescription>You don't have a property assigned yet</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-4">
                  Contact your property manager to get assigned to a property.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ),
    },
    {
      id: "property",
      label: "Property",
      value: "property",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>View your rental property details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">View detailed property information.</p>
              <Link to="/tenant/lease-details">
                <Button>Go to Lease Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "maintenance",
      label: "Maintenance",
      value: "maintenance",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>Submit and track maintenance requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Manage your maintenance requests.</p>
              <Link to="/tenant/maintenance">
                <Button>Go to Maintenance</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "payments",
      label: "Payments",
      value: "payments",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View and manage your payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Payment features coming soon.</p>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]

  return {
    portalId: "tenant",
    role: "tenant",
    title: "Dashboard",
    description: "Your rental property overview",
    
    // Layout configuration
    showHeader: true,
    showTabs: false,
    showQuickActions: true,
    showStats: true,
    showActivityFeed: true,
    
    // Content
    tabs,
    statCards,
    quickActions,
    widgets: [],
    
    // Data configuration
    dataFetchers: {
      assignedProperty: () => propertyApi.getTenantProperty().catch(() => null),
      maintenanceRequests: () => maintenanceApi.getTenantMaintenanceRequests().catch(() => []),
    },
    
    // Theme
    theme: {
      primaryColor: "#F97316", // Orange for tenant
      accentColor: "#3B82F6",
    },
  } as PortalConfig
}


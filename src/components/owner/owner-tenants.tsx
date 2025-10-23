import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react"
import { propertyApi, type Tenant, type OwnerTenantsSummary } from "@/lib/api"

export default function OwnerTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [summary, setSummary] = useState<OwnerTenantsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await propertyApi.getOwnerTenants()
      setTenants(response.tenants)
      setSummary(response.summary)
    } catch (err) {
      console.error("Error fetching tenants:", err)
      setError("Failed to load tenant data")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tenant Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">View tenant information across your properties</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold">{summary?.totalTenants || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                <p className="text-2xl font-bold">{summary?.occupiedUnits || "0/0"}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold">{summary?.occupancyRate || "0%"}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rent</p>
                <p className="text-2xl font-bold">{summary?.avgRent || "$0"}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading tenant data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">{error}</div>
          <button 
            onClick={fetchTenants}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Tenant List */}
      {!loading && !error && (
        <div className="space-y-4">
          {tenants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Tenants Found</h3>
              <p className="text-gray-600">You don't have any tenants assigned to your properties yet.</p>
            </div>
          ) : (
            tenants.map((tenant) => (
              <Card key={tenant.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder-avatar-${tenant.id}.jpg`} />
                        <AvatarFallback>
                          {tenant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{tenant.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{tenant.property} - {tenant.unit}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {tenant.email} {tenant.phone && `• ${tenant.phone}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${tenant.rent.toLocaleString()}/month</p>
                      <Badge 
                        variant="outline" 
                        className={
                          tenant.paymentStatus === 'current' 
                            ? "text-green-600" 
                            : tenant.paymentStatus === 'overdue'
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {tenant.paymentStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-500">Lease Start:</span>
                      <p className="font-medium">{new Date(tenant.leaseStart).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Lease End:</span>
                      <p className="font-medium">{new Date(tenant.leaseEnd).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Additional Property Details */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t text-sm">
                    <div>
                      <span className="text-gray-500">Property Type:</span>
                      <p className="font-medium capitalize">{tenant.propertyType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Bedrooms:</span>
                      <p className="font-medium">{tenant.bedrooms || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Bathrooms:</span>
                      <p className="font-medium">{tenant.bathrooms || 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react"

const mockTenants = [
  {
    id: 1,
    name: "John Smith",
    property: "Oak Street Apartments",
    unit: "2B",
    rent: 1850,
    leaseStart: "2023-09-16",
    leaseEnd: "2024-12-31",
    paymentStatus: "current"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    property: "Pine View Complex",
    unit: "1A",
    rent: 1650,
    leaseStart: "2023-08-01",
    leaseEnd: "2024-07-31",
    paymentStatus: "current"
  },
  {
    id: 3,
    name: "Mike Davis",
    property: "Maple Heights",
    unit: "3C",
    rent: 2100,
    leaseStart: "2023-10-01",
    leaseEnd: "2024-09-30",
    paymentStatus: "current"
  }
]

export default function OwnerTenants() {
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
                <p className="text-2xl font-bold">{mockTenants.length}</p>
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
                <p className="text-2xl font-bold">38/45</p>
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
                <p className="text-2xl font-bold">84.4%</p>
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
                <p className="text-2xl font-bold">$1,847</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenant List */}
      <div className="space-y-4">
        {mockTenants.map((tenant) => (
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
                        <span>{tenant.property} - Unit {tenant.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${tenant.rent}/month</p>
                  <Badge variant="outline" className="text-green-600">
                    {tenant.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">Lease Start:</span>
                  <p className="font-medium">{tenant.leaseStart}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Lease End:</span>
                  <p className="font-medium">{tenant.leaseEnd}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

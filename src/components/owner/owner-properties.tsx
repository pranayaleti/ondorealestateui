import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building, 
  DollarSign, 
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Eye
} from "lucide-react"

const mockProperties = [
  {
    id: 1,
    name: "Oak Street Apartments",
    address: "123 Oak Street, Salt Lake City, UT",
    units: 12,
    occupied: 10,
    monthlyRevenue: 18500,
    monthlyExpenses: 5200,
    netIncome: 13300,
    acquisitionDate: "2020-03-15",
    currentValue: 2800000,
    appreciationRate: 8.5
  },
  {
    id: 2,
    name: "Pine View Complex",
    address: "456 Pine Avenue, Salt Lake City, UT",
    units: 8,
    occupied: 7,
    monthlyRevenue: 14200,
    monthlyExpenses: 4100,
    netIncome: 10100,
    acquisitionDate: "2019-08-22",
    currentValue: 2200000,
    appreciationRate: 6.2
  }
]

export default function OwnerProperties() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your real estate investment portfolio</p>
      </div>

      <div className="space-y-6">
        {mockProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{property.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Acquired: {property.acquisitionDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Investment Property</Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">${property.netIncome.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Monthly Net Income</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{property.occupied}/{property.units}</div>
                  <div className="text-sm text-gray-500">Units Occupied</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Building className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">${(property.currentValue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">Current Value</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold">{property.appreciationRate}%</div>
                  <div className="text-sm text-gray-500">Annual Appreciation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

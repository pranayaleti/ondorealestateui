import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, AlertTriangle } from "lucide-react"
import { AddUnitDialog } from "./add-unit-dialog"
import { useToast } from "@/hooks/use-toast"

export function PropertyUnits() {
  const { toast } = useToast()

  const handleManageTenants = () => {
    toast({
      title: "Feature in development",
      description: "Tenant management for specific units is coming soon.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Units & Tenants</CardTitle>
          <CardDescription>Manage property units and tenants</CardDescription>
        </div>
        <AddUnitDialog />
      </CardHeader>
      <CardContent>
        <div className="bg-amber-50 p-3 rounded-md flex items-start gap-2 border border-amber-200 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Feature in Development</p>
            <p className="text-xs text-amber-700">
              Unit and tenant management functionality is currently being developed. Some features may not be fully
              functional.
            </p>
          </div>
        </div>

        <Tabs defaultValue="units" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
          </TabsList>
          <TabsContent value="units" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Unit 101</h3>
                    <p className="text-sm text-muted-foreground">2 bed, 1 bath • 950 sq ft</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Occupied</Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">$1,250/month</p>
                    <p className="text-xs text-muted-foreground">Lease ends: Dec 31, 2023</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleManageTenants}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Tenants
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Unit 102</h3>
                    <p className="text-sm text-muted-foreground">1 bed, 1 bath • 650 sq ft</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Vacant</Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">$950/month</p>
                    <p className="text-xs text-muted-foreground">Available now</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleManageTenants}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Tenants
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tenants" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-sm text-muted-foreground">Unit 101 • Primary tenant</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm">john.smith@example.com</p>
                    <p className="text-sm">555-123-4567</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleManageTenants}>
                    View Details
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Unit 101 • Co-tenant</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm">sarah.johnson@example.com</p>
                    <p className="text-sm">555-987-6543</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleManageTenants}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

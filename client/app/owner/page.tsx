"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Calendar, DollarSign, PenToolIcon as Tool, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAuth } from "@/lib/auth-context"

export default function OwnerDashboard() {
  const [loading, setLoading] = useState(true)
  const [occupancyRate, setOccupancyRate] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setOccupancyRate(85), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Owner Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "Owner"}</h1>
          <p className="text-muted-foreground">Manage your properties and tenants</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last login: Today, 10:15 AM</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">2 single-family, 5 apartments</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">$8,750.00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 4.3%</span> from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">5 Active</div>
                <p className="text-xs text-muted-foreground">3 completed this month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">6 of 7 units occupied</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Revenue and expenses for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Total Revenue</div>
                    <div className="font-medium">$8,750.00</div>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Expenses</div>
                    <div className="font-medium">$2,340.00</div>
                  </div>
                  <Progress value={27} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <div className="text-xs font-medium">Maintenance</div>
                      <div className="text-sm">$850.00</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Utilities</div>
                      <div className="text-sm">$620.00</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Property Management</div>
                      <div className="text-sm">$570.00</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Insurance</div>
                      <div className="text-sm">$300.00</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-sm font-medium">Net Income</div>
                  <div className="font-medium text-green-600">$6,410.00</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Property Occupancy</CardTitle>
            <CardDescription>Current occupancy status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Overall Occupancy</div>
                    <div>{occupancyRate}%</div>
                  </div>
                  <Progress value={occupancyRate} className="h-2" />
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">123 Main St</p>
                      <p className="text-sm text-muted-foreground">Single Family</p>
                    </div>
                    <div className="font-medium text-green-600">Occupied</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">456 Oak Ave</p>
                      <p className="text-sm text-muted-foreground">Single Family</p>
                    </div>
                    <div className="font-medium text-green-600">Occupied</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Sunset Apts #101</p>
                      <p className="text-sm text-muted-foreground">Apartment</p>
                    </div>
                    <div className="font-medium text-green-600">Occupied</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sunset Apts #205</p>
                      <p className="text-sm text-muted-foreground">Apartment</p>
                    </div>
                    <div className="font-medium text-red-600">Vacant</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest tenant payments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">May 1, 2023</p>
                  </div>
                  <div className="font-medium">$1,250.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">May 1, 2023</p>
                  </div>
                  <div className="font-medium">$950.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-sm text-muted-foreground">May 2, 2023</p>
                  </div>
                  <div className="font-medium">$1,100.00</div>
                </div>
                <Link href="/owner/finances">
                  <Button variant="link" className="p-0 h-auto">
                    View all payments
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common owner tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/owner/properties">
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Manage Properties
                  </Button>
                </Link>
                <Link href="/owner/maintenance">
                  <Button variant="outline" className="w-full justify-start">
                    <Tool className="mr-2 h-4 w-4" />
                    View Maintenance Requests
                  </Button>
                </Link>
                <Link href="/owner/tenants">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Tenants
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates to remember</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Lease Renewal</p>
                    <p className="text-sm text-muted-foreground">123 Main St - May 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Property Inspection</p>
                    <p className="text-sm text-muted-foreground">456 Oak Ave - May 20, 2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Insurance Payment Due</p>
                    <p className="text-sm text-muted-foreground">All Properties - May 31, 2023</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

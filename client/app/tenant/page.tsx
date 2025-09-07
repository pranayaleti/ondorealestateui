"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar, DollarSign, FileText, MessageSquare, PenToolIcon as Tool } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"

export default function TenantDashboard() {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
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
              <BreadcrumbPage>Tenant Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "Tenant"}</h1>
          <p className="text-muted-foreground">Manage your rental and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last login: Today, 9:45 AM</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Rent Due</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">$1,250.00</div>
                <p className="text-xs text-muted-foreground">Due on June 1, 2023</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lease Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">Expires on Dec 31, 2023</p>
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
                <div className="text-2xl font-bold">2 Active</div>
                <p className="text-xs text-muted-foreground">1 completed this month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">3 Unread</div>
                <p className="text-xs text-muted-foreground">From property manager</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Property</CardTitle>
            <CardDescription>Details about your rental</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3 h-48 bg-muted rounded-md overflow-hidden">
                    <img src="/modern-apartment-balcony.png" alt="Apartment" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">123 Main Street, Apt 4B</h3>
                      <p className="text-muted-foreground">New York, NY 10001</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="font-medium">2</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-medium">1</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Square Feet</p>
                        <p className="font-medium">950</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Parking</p>
                        <p className="font-medium">1 Space (#15)</p>
                      </div>
                    </div>
                    <div>
                      <Link href="/tenant/property">
                        <Button variant="outline" size="sm">
                          View Property Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tenant tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/tenant/payments">
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Make a Payment
                  </Button>
                </Link>
                <Link href="/tenant/maintenance/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Tool className="mr-2 h-4 w-4" />
                    Submit Maintenance Request
                  </Button>
                </Link>
                <Link href="/tenant/documents">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Documents
                  </Button>
                </Link>
                <Link href="/tenant/messages">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>Your recent maintenance issues</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded">
                    <Tool className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h4 className="font-medium">Leaking Kitchen Faucet</h4>
                      <Badge className="w-fit mt-1 sm:mt-0 bg-blue-100 text-blue-800 hover:bg-blue-100">
                        In Progress
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Submitted: May 3, 2023</p>
                    <p className="text-sm mt-1">Scheduled repair: May 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="bg-yellow-100 p-2 rounded">
                    <Tool className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h4 className="font-medium">Bathroom Light Fixture</h4>
                      <Badge className="w-fit mt-1 sm:mt-0 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Submitted: May 10, 2023</p>
                    <p className="text-sm mt-1">Awaiting scheduling</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/tenant/maintenance" className="w-full">
              <Button variant="outline" className="w-full">
                View All Requests
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent payments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">May 1, 2023</div>
                    <div className="text-xs text-muted-foreground">Monthly Rent</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">123 Main St, Apt 4B</div>
                    <div className="text-xs text-muted-foreground">Payment #12458</div>
                  </div>
                  <div className="text-sm font-medium">$1,250.00</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">April 1, 2023</div>
                    <div className="text-xs text-muted-foreground">Monthly Rent</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">123 Main St, Apt 4B</div>
                    <div className="text-xs text-muted-foreground">Payment #12345</div>
                  </div>
                  <div className="text-sm font-medium">$1,250.00</div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/tenant/payments" className="w-full">
              <Button variant="outline" className="w-full">
                View All Payments
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card>
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
                  <p className="font-medium">Rent Due</p>
                  <p className="text-sm text-muted-foreground">June 1, 2023</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Maintenance Visit</p>
                  <p className="text-sm text-muted-foreground">May 15, 2023 - Kitchen Faucet Repair</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Building Inspection</p>
                  <p className="text-sm text-muted-foreground">May 25, 2023 - 10:00 AM to 2:00 PM</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

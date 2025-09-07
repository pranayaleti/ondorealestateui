"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Calendar } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function PaymentsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Payment successful",
        description: "Your payment has been processed successfully.",
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/tenant">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Manage your rent payments and view payment history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Pay your rent or other fees</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="bank">Bank Account</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4 pt-4">
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Payment Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="amount" placeholder="1,250.00" className="pl-9" defaultValue="1,250.00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="card" placeholder="4242 4242 4242 4242" className="pl-9" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Pay $1,250.00"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="bank" className="space-y-4 pt-4">
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-amount">Payment Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="bank-amount" placeholder="1,250.00" className="pl-9" defaultValue="1,250.00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Holder Name</Label>
                      <Input id="account-name" placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routing">Routing Number</Label>
                      <Input id="routing" placeholder="123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account">Account Number</Label>
                      <Input id="account" placeholder="987654321" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Pay $1,250.00"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Current balance and upcoming payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Balance</span>
                <span className="font-medium">$1,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Due Date</span>
                <span className="font-medium">June 1, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Payment Breakdown</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Base Rent</span>
                  <span>$1,200.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Utilities</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t mt-1">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">$1,250.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">May 1, 2023</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm">Monthly Rent - 123 Main St, Apt 4B</div>
                <div className="text-xs text-muted-foreground">Payment #12458</div>
              </div>
              <div>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Completed
                </Badge>
              </div>
              <div className="text-sm font-medium text-right">$1,250.00</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">April 1, 2023</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm">Monthly Rent - 123 Main St, Apt 4B</div>
                <div className="text-xs text-muted-foreground">Payment #12345</div>
              </div>
              <div>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Completed
                </Badge>
              </div>
              <div className="text-sm font-medium text-right">$1,250.00</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">March 1, 2023</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm">Monthly Rent - 123 Main St, Apt 4B</div>
                <div className="text-xs text-muted-foreground">Payment #12234</div>
              </div>
              <div>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Completed
                </Badge>
              </div>
              <div className="text-sm font-medium text-right">$1,250.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get("type") || "tenant"

  const [activeTab, setActiveTab] = useState<string>(userType)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent, type: string) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      if (type === "owner") {
        // In a real app, this would redirect to a subdomain
        router.push("/dashboard")
      } else {
        router.push("/properties")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to <span className="text-primary">OnDo</span> Property Match</CardTitle>
          <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tenant">Tenant</TabsTrigger>
              <TabsTrigger value="owner">Property Owner</TabsTrigger>
            </TabsList>
            <TabsContent value="tenant">
              <form onSubmit={(e) => handleLogin(e, "tenant")}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-email">Email</Label>
                    <Input id="tenant-email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tenant-password">Password</Label>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="tenant-password" type="password" required />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="owner">
              <form onSubmit={(e) => handleLogin(e, "owner")}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="owner-email">Email</Label>
                    <Input id="owner-email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="owner-password">Password</Label>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="owner-password" type="password" required />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          {/* Sign up is currently disabled
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth?type=owner" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          */}
          <div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

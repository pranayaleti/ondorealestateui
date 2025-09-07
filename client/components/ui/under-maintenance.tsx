"use client"

import { Construction, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface UnderMaintenanceProps {
  title?: string
  description?: string
  showHomeButton?: boolean
  showBackButton?: boolean
  actionText?: string
  actionHref?: string
}

export function UnderMaintenance({
  title = "Under Maintenance",
  description = "We're working on implementing this feature. Please check back soon.",
  showHomeButton = true,
  showBackButton = true,
  actionText,
  actionHref,
}: UnderMaintenanceProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Construction className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-muted-foreground text-center">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span>Our team is actively working on this section</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
          {showBackButton && (
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          )}
          {showHomeButton && (
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          )}
          {actionText && actionHref && (
            <Link href={actionHref}>
              <Button variant="default">{actionText}</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

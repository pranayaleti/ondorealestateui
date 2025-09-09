import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - OnDo Real Estate",
  description: "Sign in or create an account with OnDo Real Estate",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}

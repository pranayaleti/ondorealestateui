import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - OnDo Property Match",
  description: "Sign in or create an account with OnDo Property Match",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}

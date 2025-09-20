import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Building, LayoutDashboard, Settings, Users } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

interface DashboardNavProps {
  items: NavItem[]
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: <Building className="mr-2 h-4 w-4" />,
  },
  /* Commenting out Analytics and Communications
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Communications",
    href: "/dashboard/communications",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  */
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

export default function DashboardNav({ items }: DashboardNavProps) {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

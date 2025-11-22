import { Card, CardContent } from "@/components/ui/card"
import { QuickAction } from "../types"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useDashboardTheme } from "../hooks/useDashboardTheme"

interface QuickActionsProps {
  actions: QuickAction[]
  className?: string
  columns?: 2 | 3 | 4 | 5
}

export function QuickActions({ actions, className, columns = 4 }: QuickActionsProps) {
  const { primaryColor } = useDashboardTheme()
  
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  }

  return (
    <div className={cn("grid gap-3 md:gap-4", gridCols[columns], className)}>
      {actions.map((action) => {
        const cardContent = (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <div 
                className="h-8 w-8 mr-3"
                style={{ 
                  color: action.variant === "secondary" ? "#6B7280" : primaryColor 
                }}
              >
                {action.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{action.title}</p>
                {action.description && (
                  <p className="text-xs text-gray-500">{action.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )

        if (action.href) {
          return (
            <Link key={action.id} to={action.href}>
              {cardContent}
            </Link>
          )
        }

        if (action.onClick) {
          return (
            <div key={action.id} onClick={action.onClick}>
              {cardContent}
            </div>
          )
        }

        return <div key={action.id}>{cardContent}</div>
      })}
    </div>
  )
}


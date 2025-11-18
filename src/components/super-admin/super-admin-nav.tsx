import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  value: string
  onClick: () => void
}

interface SuperAdminNavProps {
  items: NavItem[]
  activeTab: string
  className?: string
}

export function SuperAdminNav({ items, activeTab, className }: SuperAdminNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <div className={cn("hidden md:flex w-full", className)}>
        <div className="w-full bg-gray-800 dark:bg-gray-900 rounded-lg p-1 flex gap-1 overflow-x-auto">
          {items.map((item) => (
            <Button
              key={item.value}
              onClick={item.onClick}
              variant="ghost"
              className={cn(
                "flex-1 min-w-0 whitespace-nowrap text-sm font-medium transition-all",
                activeTab === item.value
                  ? "bg-black dark:bg-gray-950 text-white"
                  : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-800"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-gray-800 dark:bg-gray-900 text-white hover:bg-gray-700 dark:hover:bg-gray-800 border-gray-700"
            >
              <Menu className="h-5 w-5 mr-2" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-gray-800 dark:bg-gray-900 text-white">
            <div className="flex flex-col gap-2 mt-8">
              {items.map((item) => (
                <Button
                  key={item.value}
                  onClick={() => {
                    item.onClick()
                    setIsOpen(false)
                  }}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-medium transition-all",
                    activeTab === item.value
                      ? "bg-black dark:bg-gray-950 text-white"
                      : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-800"
                  )}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}


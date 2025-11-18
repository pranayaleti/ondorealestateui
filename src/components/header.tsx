import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { Logo } from "@/components/logo"
import { Menu, LogOut, Users } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { authApi, type InvitedUser } from "@/lib/api"

const navItems = [
  { label: "Overview", path: "/dashboard", tab: "overview" },
  { label: "Properties", path: "/dashboard/properties", tab: "properties" },
  { label: "Owner Properties", path: "/dashboard", tab: "owner-properties" },
  { label: "Leads", path: "/dashboard", tab: "leads" },
  { label: "Maintenance", path: "/dashboard/maintenance", tab: "maintenance" },
  { label: "My Users", path: "/dashboard", tab: "my-users" },
  { label: "User Management", path: "/dashboard", tab: "user-management" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([])
  const [isLoadingInvited, setIsLoadingInvited] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch invited users to compute active owners and tenants counts
  useEffect(() => {
    const fetchInvited = async () => {
      if (!user || (user.role !== "manager" && user.role !== "admin")) return
      try {
        setIsLoadingInvited(true)
        const users = await authApi.getInvitedUsers()
        setInvitedUsers(users)
      } catch (error) {
        console.error("Error fetching invited users:", error)
        setInvitedUsers([])
      } finally {
        setIsLoadingInvited(false)
      }
    }
    fetchInvited()
  }, [user])

  const activeOwnersCount = invitedUsers.filter(u => u.role === "owner" && u.isActive).length
  const activeTenantsCount = invitedUsers.filter(u => u.role === "tenant" && u.isActive).length


  const isActive = (item: { path: string; tab?: string }) => {
    // Check if we're on the dashboard path
    if (location.pathname.startsWith("/dashboard")) {
      const urlParams = new URLSearchParams(location.search)
      const currentTab = urlParams.get("tab")
      
      // If item has a tab, check if it matches the current tab
      if (item.tab) {
        // For overview, it's active if no tab is specified or tab is "overview"
        if (item.tab === "overview") {
          return !currentTab || currentTab === "overview"
        }
        return currentTab === item.tab
      }
      
      // For paths that don't have tabs, check path match
      return location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    }
    
    // For non-dashboard paths, check path match
    return location.pathname === item.path || location.pathname.startsWith(item.path + "/")
  }

  // Only show navigation for logged-in users
  if (!user) {
    return (
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200 bg-black dark:bg-gray-950",
          isScrolled && "shadow-lg"
        )}
      >
        <div className="container mx-auto px-2 sm:px-4 md:px-6 h-16 flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Logo 
              size="md" 
              showText={true}
              textColor="white"
              linkTo="/"
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
            <ModeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 dark:hover:bg-gray-900 text-xs sm:text-sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 bg-black dark:bg-gray-950",
        isScrolled && "shadow-lg"
      )}
    >
      {/* Desktop/Tablet Navigation */}
      <div className="hidden lg:flex container mx-auto px-2 sm:px-4 md:px-6 h-16 items-center justify-between gap-2 min-w-0">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 min-w-0">
          <Logo 
            size="md" 
            showText={true}
            textColor="white"
          />
        </div>

        {/* Center: Navigation Links - Fluid with scroll */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-1 justify-center min-w-0 px-2 sm:px-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const href = item.tab ? `${item.path}?tab=${item.tab}` : item.path
              return (
                <Link
                  key={item.tab ? `${item.path}-${item.tab}` : item.path}
                  to={href}
                  className={cn(
                    "px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0",
                    isActive(item)
                      ? "bg-orange-500 text-gray-900 dark:text-gray-900 font-semibold"
                      : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            
            {/* Active Owners and Tenants - Only show for managers/admins */}
            {(user?.role === "manager" || user?.role === "admin") && (
              <>
                <Link
                  to="/dashboard/owners"
                  className={cn(
                    "flex items-center gap-2 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0",
                    location.pathname === "/dashboard/owners" || location.pathname.startsWith("/dashboard/owners/")
                      ? "bg-orange-500 text-gray-900 dark:text-gray-900 font-semibold"
                      : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <Users className={cn(
                    "h-4 w-4",
                    location.pathname === "/dashboard/owners" || location.pathname.startsWith("/dashboard/owners/")
                      ? "text-gray-900 dark:text-gray-900"
                      : "text-gray-400 dark:text-gray-400"
                  )} />
                  <span>Active Owners</span>
                  <span className={cn(
                    "font-bold",
                    location.pathname === "/dashboard/owners" || location.pathname.startsWith("/dashboard/owners/")
                      ? "text-gray-900 dark:text-gray-900"
                      : "text-white"
                  )}>{isLoadingInvited ? "..." : activeOwnersCount}</span>
                </Link>
                <Link
                  to="/dashboard/tenants"
                  className={cn(
                    "flex items-center gap-2 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0",
                    location.pathname === "/dashboard/tenants" || location.pathname.startsWith("/dashboard/tenants/")
                      ? "bg-orange-500 text-gray-900 dark:text-gray-900 font-semibold"
                      : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <Users className={cn(
                    "h-4 w-4",
                    location.pathname === "/dashboard/tenants" || location.pathname.startsWith("/dashboard/tenants/")
                      ? "text-gray-900 dark:text-gray-900"
                      : "text-gray-400 dark:text-gray-400"
                  )} />
                  <span>Active Tenants</span>
                  <span className={cn(
                    "font-bold",
                    location.pathname === "/dashboard/tenants" || location.pathname.startsWith("/dashboard/tenants/")
                      ? "text-gray-900 dark:text-gray-900"
                      : "text-white"
                  )}>{isLoadingInvited ? "..." : activeTenantsCount}</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Right: Mode Toggle, User Menu */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>

      {/* Tablet/Mobile Navigation - Hamburger Menu */}
      <div className="lg:hidden bg-black dark:bg-gray-950">
        <div className="container mx-auto px-2 sm:px-4 h-16">
          <div className="flex items-center justify-between h-full gap-2 min-w-0">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Logo 
                size="sm" 
                showText={true}
                textColor="white"
              />
            </div>

            {/* Right: Menu, Mode Toggle, User Menu */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <ModeToggle />
              <UserMenu />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-800 dark:hover:bg-gray-900 p-2"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-gray-900 text-white p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation menu with links to different sections</SheetDescription>
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-800">
                      <span className="text-lg font-semibold">Menu</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <nav className="flex flex-col">
                        {navItems.map((item) => {
                          const href = item.tab ? `${item.path}?tab=${item.tab}` : item.path
                          return (
                            <Link
                              key={item.tab ? `${item.path}-${item.tab}` : item.path}
                              to={href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "px-4 py-3 text-sm font-medium transition-colors border-b border-gray-800 rounded-md mx-2 my-1",
                                isActive(item)
                                  ? "bg-orange-500 text-gray-900 dark:text-gray-900 font-semibold"
                                  : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                              )}
                            >
                              {item.label}
                            </Link>
                          )
                        })}
                        
                        {/* Active Owners and Tenants - Only show for managers/admins */}
                        {(user?.role === "manager" || user?.role === "admin") && (
                          <>
                            <Link
                              to="/dashboard/owners"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "px-4 py-3 text-sm font-medium transition-colors border-b border-gray-800 rounded-md mx-2 my-1 flex items-center justify-between",
                                location.pathname === "/dashboard/owners" || location.pathname.startsWith("/dashboard/owners/")
                                  ? "bg-orange-500 text-gray-900 dark:text-gray-900 font-semibold"
                                  : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <Users className={cn(
                                  "h-4 w-4",
                                  location.pathname === "/dashboard/owners" || location.pathname.startsWith("/dashboard/owners/")
                                    ? "text-gray-900 dark:text-gray-900"
                                    : "text-gray-400 dark:text-gray-400"
                                )} />
                                <span>Active Owners</span>
                              </div>
                              <span className={cn(
                                "font-bold",
                                location.pathname === "/dashboard/owners" || location.pathname.startsWith("/dashboard/owners/")
                                  ? "text-gray-900 dark:text-gray-900"
                                  : "text-white"
                              )}>{isLoadingInvited ? "..." : activeOwnersCount}</span>
                            </Link>
                            <Link
                              to="/dashboard/tenants"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "px-4 py-3 text-sm font-medium transition-colors border-b border-gray-800 rounded-md mx-2 my-1 flex items-center justify-between",
                                location.pathname === "/dashboard/tenants" || location.pathname.startsWith("/dashboard/tenants/")
                                  ? "bg-orange-500 text-gray-900 dark:text-gray-900 font-semibold"
                                  : "text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <Users className={cn(
                                  "h-4 w-4",
                                  location.pathname === "/dashboard/tenants" || location.pathname.startsWith("/dashboard/tenants/")
                                    ? "text-gray-900 dark:text-gray-900"
                                    : "text-gray-400 dark:text-gray-400"
                                )} />
                                <span>Active Tenants</span>
                              </div>
                              <span className={cn(
                                "font-bold",
                                location.pathname === "/dashboard/tenants" || location.pathname.startsWith("/dashboard/tenants/")
                                  ? "text-gray-900 dark:text-gray-900"
                                  : "text-white"
                              )}>{isLoadingInvited ? "..." : activeTenantsCount}</span>
                            </Link>
                          </>
                        )}
                      </nav>
                    </div>
                    <div className="p-4 border-t border-gray-800">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full justify-start text-gray-300 dark:text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

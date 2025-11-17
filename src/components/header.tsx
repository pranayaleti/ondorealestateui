import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { getLogoPath } from "@/lib/logo"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine where the logo should link based on user role
  const getLogoLink = () => {
    if (!user) return "/"
    switch (user.role) {
      case "manager":
        return "/dashboard"
      case "owner":
        return "/owner"
      case "tenant":
        return "/tenant"
      default:
        return "/dashboard"
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={getLogoLink()} className="flex items-center gap-2">
            <img 
              src={getLogoPath()}
              alt="Ondo Real Estate logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">Ondo Real Estate</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <div className="hidden md:flex gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

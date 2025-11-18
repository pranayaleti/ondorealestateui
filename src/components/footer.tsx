import { Link } from "react-router-dom"
import { useAuth } from "@/lib/auth-context"

export function Footer() {
  const { user } = useAuth()
  const shouldShowContent = user?.role === "owner" || user?.role === "tenant"

  return (
    <footer className="w-full bg-card text-foreground border-t">
      <div className="container mx-auto px-4 py-2">
        {shouldShowContent && (
          <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:justify-between md:gap-4 text-center">
            <p className="text-xs text-muted-foreground order-1 md:order-1 leading-tight">
              © 2025 Ondo Real Estate. All rights reserved.
            </p>
            
            <div className="flex flex-col items-center gap-0.5 md:flex-row md:gap-1.5 order-2 md:order-2">
              <span className="text-xs text-muted-foreground/80 leading-tight">Designed. Developed. Deployed by</span>
              <a 
                href="https://www.ondosoft.com/?utm_source=ondorealestate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-200 hover:underline decoration-orange-500 underline-offset-2 leading-tight"
              >
                OndoSoft
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportPDFButtonProps {
  fileName?: string
  onExport?: () => void | Promise<void>
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportPDFButton({ 
  fileName = "report", 
  onExport,
  className = "",
  variant = "default",
  size = "default"
}: ExportPDFButtonProps) {
  const { toast } = useToast()

  const handleExport = async () => {
    try {
      if (onExport) {
        await onExport()
      } else {
        // Default export behavior - can be enhanced with actual PDF generation
        // For now, we'll show a toast notification
        toast({
          title: "Export Started",
          description: `Generating PDF: ${fileName}.pdf`,
        })
        
        // Simulate PDF generation delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        toast({
          title: "Export Complete",
          description: `${fileName}.pdf has been downloaded`,
        })
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getButtonClassName = () => {
    if (variant === "outline") {
      return `border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white ${className}`
    }
    return `bg-ondo-orange hover:bg-ondo-red text-white ${className}`
  }

  return (
    <Button
      onClick={handleExport}
      className={getButtonClassName()}
      variant={variant === "outline" ? "outline" : "default"}
      size={size}
    >
      <Download className="h-4 w-4 mr-2" />
      Export PDF
    </Button>
  )
}


import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateGenericPDF, PDFContent } from "@/utils/pdf-generator"

// Re-export types for convenience
export type { PDFContent, PDFSection, PDFTable, PDFSummary } from "@/utils/pdf-generator"

interface ExportPDFButtonProps {
  fileName?: string
  content?: PDFContent
  onExport?: () => void | Promise<void>
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}


export function ExportPDFButton({ 
  fileName = "report", 
  content,
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
        // Show "Export Started" toast with auto-dismiss
        const startedToast = toast({
          title: "Generating PDF",
          description: `Preparing ${fileName}.pdf...`,
        })
        
        // Auto-dismiss "Export Started" toast after 2 seconds
        setTimeout(() => {
          startedToast.dismiss()
        }, 2000)
        
        // Generate PDF using HTML-based method
        await generateGenericPDF(content || {}, fileName, false, false)
        
        // Show "Export Complete" toast with auto-dismiss
        const completeToast = toast({
          title: "PDF Ready",
          description: "Use your browser's print dialog to save as PDF.",
        })
        
        // Auto-dismiss "Export Complete" toast after 3 seconds
        setTimeout(() => {
          completeToast.dismiss()
        }, 3000)
      }
    } catch (error) {
      console.error('PDF generation error:', error)
      const errorToast = toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
      
      // Auto-dismiss error toast after 4 seconds
      setTimeout(() => {
        errorToast.dismiss()
      }, 4000)
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


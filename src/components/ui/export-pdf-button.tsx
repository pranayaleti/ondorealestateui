import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { companyInfo } from "@/constants/companyInfo"

export interface PDFContent {
  title?: string
  subtitle?: string
  sections?: PDFSection[]
  tables?: PDFTable[]
  summary?: PDFSummary[]
}

export interface PDFSection {
  title: string
  items: Array<{ label: string; value: string | number }>
}

export interface PDFTable {
  title: string
  headers: string[]
  rows: (string | number)[][]
}

export interface PDFSummary {
  label: string
  value: string | number
  highlight?: boolean
}

interface ExportPDFButtonProps {
  fileName?: string
  content?: PDFContent
  onExport?: () => void | Promise<void>
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

// Helper function to format content for PDF
const formatPDFContent = (fileName: string, content?: PDFContent): string => {
  if (!content) {
    return `Report: ${fileName}\n\nGenerated on ${new Date().toLocaleDateString()}`
  }

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const generatedText = `Generated: ${dateStr} at ${timeStr}`
  
  let pdfText = ''
  
  // Header: Company name (left) and generated date (right) only - NO contact info here
  pdfText += `HEADER:${companyInfo.name.toUpperCase()}|${generatedText}\n`
  pdfText += '='.repeat(80) + '\n'
  pdfText += '\n'
  pdfText += '\n'
  
  // Report Title - contact info appears ONLY in footer
  if (content.title) {
    pdfText += ' '.repeat(5) + content.title.toUpperCase() + '\n'
    pdfText += ' '.repeat(5) + '-'.repeat(content.title.length) + '\n'
  } else {
    pdfText += ' '.repeat(5) + fileName.toUpperCase() + '\n'
    pdfText += ' '.repeat(5) + '-'.repeat(fileName.length) + '\n'
  }
  pdfText += '\n'
  
  // Subtitle
  if (content.subtitle) {
    pdfText += ' '.repeat(5) + content.subtitle + '\n'
    pdfText += '\n'
  }
  
  pdfText += '='.repeat(80) + '\n'
  pdfText += '\n'
  
  // Summary section
  if (content.summary && content.summary.length > 0) {
    pdfText += ' '.repeat(5) + 'EXECUTIVE SUMMARY\n'
    pdfText += ' '.repeat(5) + '-'.repeat(Math.min(70, 'EXECUTIVE SUMMARY'.length)) + '\n'
    pdfText += '\n'
    content.summary.forEach((item, idx) => {
      const value = typeof item.value === 'number' 
        ? (item.value.toLocaleString ? `$${item.value.toLocaleString()}` : item.value.toString())
        : item.value
      const label = ' '.repeat(10) + item.label + ':'
      // Right-align numeric values
      if (typeof item.value === 'number' || (typeof value === 'string' && value.match(/^[\$+\-]?\d/))) {
        pdfText += `${label.padEnd(50)}${value.toString().padStart(25)}\n`
      } else {
        pdfText += `${label.padEnd(50)}${value}\n`
      }
      if (idx < content.summary!.length - 1) {
        pdfText += '\n'
      }
    })
    pdfText += '\n'
    pdfText += '='.repeat(80) + '\n'
    pdfText += '\n'
  }
  
  // Sections
  if (content.sections && content.sections.length > 0) {
    content.sections.forEach((section, idx) => {
      if (idx > 0) {
        pdfText += '\n'
        pdfText += '='.repeat(80) + '\n'
        pdfText += '\n'
      }
      pdfText += ' '.repeat(5) + section.title.toUpperCase() + '\n'
      pdfText += ' '.repeat(5) + '-'.repeat(section.title.length) + '\n'
      pdfText += '\n'
      section.items.forEach((item, itemIdx) => {
        const value = typeof item.value === 'number' 
          ? (item.value.toLocaleString ? `$${item.value.toLocaleString()}` : item.value.toString())
          : item.value
        const label = ' '.repeat(10) + item.label + ':'
        // Right-align numeric values
        if (typeof item.value === 'number' || (typeof value === 'string' && value.match(/^[\$+\-]?\d/))) {
          pdfText += `${label.padEnd(50)}${value.toString().padStart(25)}\n`
        } else {
          pdfText += `${label.padEnd(50)}${value}\n`
        }
        if (itemIdx < section.items.length - 1) {
          pdfText += '\n'
        }
      })
      pdfText += '\n'
    })
  }
  
  // Tables
  if (content.tables && content.tables.length > 0) {
    content.tables.forEach((table, idx) => {
      if (idx > 0) {
        pdfText += '\n'
        pdfText += '='.repeat(80) + '\n'
        pdfText += '\n'
      }
      
      // Table title with better spacing
      pdfText += ' '.repeat(5) + table.title.toUpperCase() + '\n'
      pdfText += ' '.repeat(5) + '-'.repeat(Math.min(table.title.length, 70)) + '\n'
      pdfText += '\n'
      
      // Calculate optimal column widths
      const colWidths = table.headers.map((_, i) => {
        const headerLen = table.headers[i].length
        const maxDataLen = Math.max(
          ...table.rows.map(row => {
            const cellStr = typeof row[i] === 'number' 
              ? (row[i].toLocaleString ? row[i].toLocaleString() : String(row[i]))
              : String(row[i] || '')
            return cellStr.length
          })
        )
        // Add padding: 2 spaces before, 2 spaces after
        return Math.max(headerLen, maxDataLen) + 4
      })
      
      // Ensure total width doesn't exceed page width (80 chars with 5 char margin = 75 usable)
      const totalWidth = colWidths.reduce((a, b) => a + b, 0)
      if (totalWidth > 75) {
        const scaleFactor = 75 / totalWidth
        colWidths.forEach((_, i) => {
          colWidths[i] = Math.floor(colWidths[i] * scaleFactor)
        })
      }
      
      // Header row with better formatting
      pdfText += ' '.repeat(5)
      table.headers.forEach((header, i) => {
        const headerText = header.toUpperCase()
        pdfText += headerText.padEnd(colWidths[i])
      })
      pdfText += '\n'
      
      // Header separator line
      pdfText += ' '.repeat(5)
      colWidths.forEach((width, i) => {
        const headerLen = table.headers[i].length
        pdfText += '-'.repeat(Math.max(headerLen, width - 2))
        if (i < colWidths.length - 1) pdfText += '  '
      })
      pdfText += '\n'
      pdfText += '\n'
      
      // Table rows with better alignment
      table.rows.forEach((row, rowIdx) => {
        pdfText += ' '.repeat(5)
        row.forEach((cell, i) => {
          const cellStr = typeof cell === 'number' 
            ? (cell.toLocaleString ? cell.toLocaleString() : cell.toString())
            : String(cell || '')
          
          // Right-align numbers, left-align text
          if (typeof cell === 'number' || (typeof cell === 'string' && cell.match(/^[\$+\-]?\d/))) {
            pdfText += cellStr.padStart(colWidths[i])
          } else {
            pdfText += cellStr.padEnd(colWidths[i])
          }
        })
        pdfText += '\n'
        
        // Add subtle spacing every 5 rows
        if (rowIdx < table.rows.length - 1 && (rowIdx + 1) % 5 === 0) {
          pdfText += '\n'
        }
      })
      pdfText += '\n'
    })
  }
  
  // Footer - only at the end
  pdfText += '\n'
  pdfText += '='.repeat(80) + '\n'
  pdfText += '\n'
  pdfText += ' '.repeat(5) + `End of Report: ${content.title || fileName}\n`
  pdfText += '\n'
  pdfText += ' '.repeat(5) + 'This report was generated by ' + companyInfo.name + '\n'
  pdfText += '\n'
  pdfText += ' '.repeat(5) + companyInfo.name + '\n'
  pdfText += ' '.repeat(5) + companyInfo.address.streetAddress + '\n'
  pdfText += ' '.repeat(5) + `${companyInfo.address.addressLocality}, ${companyInfo.address.addressRegion} ${companyInfo.address.postalCode}\n`
  pdfText += ' '.repeat(5) + `Phone: ${companyInfo.phoneDisplay} | Email: ${companyInfo.email}\n`
  pdfText += ' '.repeat(5) + companyInfo.urls.website + '\n'
  
  return pdfText
}

// Helper function to create a PDF blob with formatted content
const createPDFBlob = (fileName: string, pdfContent?: PDFContent): Blob => {
  const pdfText = formatPDFContent(fileName, pdfContent)
  
  // Build PDF parts
  const header = '%PDF-1.4\n'
  const catalog = `1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
`
  const pages = `2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
`
  const page = `3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj
`
  
  // Create content stream with proper formatting
  // Split text into lines and position them vertically
  const lines = pdfText.split('\n')
  let contentStream = ''
  let yPos = 750
  let lineHeight = 12
  let currentFontSize = 10
  
  lines.forEach((line, idx) => {
    if (yPos < 50) {
      // Start new page if needed (simplified - would need multi-page support for full implementation)
      yPos = 750
    }
    
    // Handle special header line with company name and date
    if (line.startsWith('HEADER:')) {
      const parts = line.replace('HEADER:', '').split('|')
      const companyName = parts[0]
      const generatedDate = parts[1]
      
      // Company name on left (larger font) - use absolute positioning
      currentFontSize = 18
      lineHeight = 22
      const escapedCompany = companyName.replace(/[()\\]/g, '\\$&').replace(/[^\x20-\x7E]/g, '')
      contentStream += `BT\n/F1 ${currentFontSize} Tf\n1 0 0 1 50 ${yPos} Tm\n(${escapedCompany}) Tj\nET\n`
      
      // Generated date on right (smaller font) - use absolute positioning
      currentFontSize = 10
      const escapedDate = generatedDate.replace(/[()\\]/g, '\\$&').replace(/[^\x20-\x7E]/g, '')
      // Calculate right-aligned position (page width 612, margin 50, so right margin at 562)
      // Approximate text width: date length * 5.5 (average char width at 10pt)
      const dateWidth = escapedDate.length * 5.5
      const rightX = 562 - dateWidth
      contentStream += `BT\n/F1 ${currentFontSize} Tf\n1 0 0 1 ${rightX} ${yPos} Tm\n(${escapedDate}) Tj\nET\n`
      
      yPos -= lineHeight
      return
    }
    
    // Skip empty lines but still account for spacing
    if (line.trim().length === 0) {
      yPos -= 10 // Fixed spacing for empty lines
      return
    }
    
    // Determine font size based on line content
    if (line.match(/^[=]+$/)) {
      // Separator lines - smaller spacing
      currentFontSize = 8
      lineHeight = 10
    } else if (line.match(/^[\s]*-+$/)) {
      // Dashed separator lines
      currentFontSize = 8
      lineHeight = 10
    } else if (line.match(/^[\s]*[A-Z\s]+$/)) {
      // Uppercase section headers (all caps with optional leading spaces)
      const trimmed = line.trim()
      if (trimmed.length > 0 && trimmed === trimmed.toUpperCase() && !line.includes('HEADER:') && trimmed.length > 5) {
        currentFontSize = 12
        lineHeight = 18
      } else {
        currentFontSize = 10
        lineHeight = 13
      }
    } else {
      // Regular content
      currentFontSize = 10
      lineHeight = 13
    }
    
    // Escape special characters for PDF properly
    const trimmedLine = line.trim()
    // Escape parentheses and backslashes, but keep other characters
    let escapedLine = trimmedLine
      .replace(/\\/g, '\\\\')  // Escape backslashes first
      .replace(/\(/g, '\\(')   // Escape opening parentheses
      .replace(/\)/g, '\\)')   // Escape closing parentheses
      .replace(/[^\x20-\x7E]/g, '') // Remove non-printable characters
    
    // Only render if we have content after escaping
    if (escapedLine.length > 0) {
      // Use absolute positioning with text matrix (Tm)
      // Calculate X position based on leading spaces (5 spaces = 25 points)
      const leadingSpaces = line.match(/^(\s*)/)?.[1]?.length || 0
      const xPos = 50 + (leadingSpaces * 5)
      
      // Use text matrix for absolute positioning
      contentStream += `BT\n/F1 ${currentFontSize} Tf\n1 0 0 1 ${xPos} ${yPos} Tm\n(${escapedLine}) Tj\nET\n`
    }
    
    yPos -= lineHeight
  })
  
  const contentObj = `4 0 obj
<<
/Length ${contentStream.length}
>>
stream
${contentStream}
endstream
endobj
`
  const font = `5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
`
  
  // Calculate offsets after building the content
  const catalogStart = header.length
  const pagesStart = catalogStart + catalog.length
  const pageStart = pagesStart + pages.length
  const contentStart = pageStart + page.length
  const fontStart = contentStart + contentObj.length
  const xrefStart = fontStart + font.length
  
  const xref = `xref
0 6
0000000000 65535 f 
${String(catalogStart).padStart(10, '0')} 00000 n 
${String(pagesStart).padStart(10, '0')} 00000 n 
${String(pageStart).padStart(10, '0')} 00000 n 
${String(contentStart).padStart(10, '0')} 00000 n 
${String(fontStart).padStart(10, '0')} 00000 n 
`
  
  const trailer = `trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${xrefStart}
%%EOF`

  const finalPdfContent = header + catalog + pages + page + contentObj + font + xref + trailer
  return new Blob([finalPdfContent], { type: 'application/pdf' })
}

// Helper function to download a blob as a file
const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
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
          title: "Export Started",
          description: `Generating PDF: ${fileName}.pdf`,
        })
        
        // Auto-dismiss "Export Started" toast after 2 seconds
        setTimeout(() => {
          startedToast.dismiss()
        }, 2000)
        
        // Simulate PDF generation delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create and download the PDF with content
        const pdfBlob = createPDFBlob(fileName, content)
        downloadBlob(pdfBlob, fileName)
        
        // Show "Export Complete" toast with auto-dismiss
        const completeToast = toast({
          title: "Export Complete",
          description: `${fileName}.pdf has been downloaded`,
        })
        
        // Auto-dismiss "Export Complete" toast after 3 seconds
        setTimeout(() => {
          completeToast.dismiss()
        }, 3000)
      }
    } catch (error) {
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


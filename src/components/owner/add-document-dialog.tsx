"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddDocumentDialogProps {
  onAddDocument?: (data: any) => void;
  folders?: Array<{ id: string; name: string; description: string; documentCount: number; lastUpdated: string; }>;
}

export function AddDocumentDialog({ onAddDocument, folders }: AddDocumentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setIsOpen(false)

      toast({
        title: "Feature in development",
        description: "Document upload functionality is coming soon. We're working on it!",
        variant: "destructive",
      })
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileUp className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Upload a document to your property management system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpload}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input id="document-name" placeholder="Enter document name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="document-type">Document Type</Label>
              <Select>
                <SelectTrigger id="document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lease">Lease Agreement</SelectItem>
                  <SelectItem value="inspection">Inspection Report</SelectItem>
                  <SelectItem value="maintenance">Maintenance Record</SelectItem>
                  <SelectItem value="financial">Financial Document</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="document-file">Upload File</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop your file here or click to browse</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                <div className="mt-4 w-full">
                  <Input id="document-file" type="file" className="cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-3 rounded-md flex items-start gap-2 border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Feature in Development</p>
                <p className="text-xs text-amber-700">
                  Document upload functionality is currently being developed. This form is for demonstration purposes
                  only.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

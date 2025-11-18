"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import {
  FileText,
  Download,
  Search,
  File,
  FileImage,
  FileIcon as FilePdf,
  FileSpreadsheet,
  MoreHorizontal,
  Trash2,
  Share2,
  Eye,
  FolderOpen,
  Building,
  Upload,
  Grid3x3,
  List,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { AddDocumentDialog } from "@/components/owner/add-document-dialog"
import { CreateFolderDialog } from "@/components/owner/create-folder-dialog"

// Mock documents data matching the image
const DOCUMENTS = [
  {
    id: "doc1",
    name: "Lease Agreement - 123 Main St Unit 1",
    type: "pdf",
    category: "lease",
    property: "123 Main Street",
    size: "1.2 MB",
    uploadedAt: "2023-05-15T10:30:00",
    uploadedBy: "Sarah Johnson",
    folder: "Leases",
    tag: "Lease",
  },
  {
    id: "doc2",
    name: "Lease Agreement - 123 Main St Unit 2",
    type: "pdf",
    category: "lease",
    property: "123 Main Street",
    size: "1.2 MB",
    uploadedAt: "2023-05-15T10:35:00",
    uploadedBy: "Sarah Johnson",
    folder: "Leases",
    tag: "Lease",
  },
  {
    id: "doc3",
    name: "Lease Agreement - 456 Oak Ave",
    type: "pdf",
    category: "lease",
    property: "456 Oak Avenue",
    size: "1.1 MB",
    uploadedAt: "2023-04-10T14:45:00",
    uploadedBy: "Sarah Johnson",
    folder: "Leases",
    tag: "Lease",
  },
  {
    id: "doc4",
    name: "Property Insurance Policy - 123 Main St",
    type: "pdf",
    category: "insurance",
    property: "123 Main Street",
    size: "3.5 MB",
    uploadedAt: "2023-04-20T14:45:00",
    uploadedBy: "Sarah Johnson",
    folder: "Insurance",
    tag: "Insurance",
  },
  {
    id: "doc5",
    name: "Property Insurance Policy - 456 Oak Ave",
    type: "pdf",
    category: "insurance",
    property: "456 Oak Avenue",
    size: "3.2 MB",
    uploadedAt: "2023-04-20T14:50:00",
    uploadedBy: "Sarah Johnson",
    folder: "Insurance",
    tag: "Insurance",
  },
  {
    id: "doc6",
    name: "Property Tax Statement 2023 - 123 Main St",
    type: "pdf",
    category: "tax",
    property: "123 Main Street",
    size: "850 KB",
    uploadedAt: "2023-03-20T09:15:00",
    uploadedBy: "Sarah Johnson",
    folder: "Tax Documents",
    tag: "Tax",
  },
  {
    id: "doc7",
    name: "Property Tax Statement 2023 - 456 Oak Ave",
    type: "pdf",
    category: "tax",
    property: "456 Oak Avenue",
    size: "820 KB",
    uploadedAt: "2023-03-20T09:20:00",
    uploadedBy: "Sarah Johnson",
    folder: "Tax Documents",
    tag: "Tax",
  },
  {
    id: "doc8",
    name: "Maintenance Receipt - Plumbing Repair",
    type: "image",
    category: "maintenance",
    property: "123 Main Street",
    size: "2.1 MB",
    uploadedAt: "2023-05-05T16:20:00",
    uploadedBy: "Sarah Johnson",
    folder: "Maintenance Records",
    tag: "Maintenance",
  },
  {
    id: "doc9",
    name: "Maintenance Receipt - HVAC Service",
    type: "image",
    category: "maintenance",
    property: "456 Oak Avenue",
    size: "1.8 MB",
    uploadedAt: "2023-05-02T13:10:00",
    uploadedBy: "Sarah Johnson",
    folder: "Maintenance Records",
    tag: "Maintenance",
  },
  {
    id: "doc10",
    name: "Property Inspection Report - 123 Main St",
    type: "pdf",
    category: "inspection",
    property: "123 Main Street",
    size: "4.3 MB",
    uploadedAt: "2023-02-12T11:10:00",
    uploadedBy: "Sarah Johnson",
    folder: "Property Inspections",
    tag: "Inspection",
  },
  {
    id: "doc11",
    name: "Rental Income Spreadsheet - Q1 2023",
    type: "spreadsheet",
    category: "financial",
    property: "All Properties",
    size: "1.8 MB",
    uploadedAt: "2023-04-01T13:40:00",
    uploadedBy: "Sarah Johnson",
    folder: "Financial Records",
    tag: "Financial",
  },
  {
    id: "doc12",
    name: "Expense Report - Q1 2023",
    type: "spreadsheet",
    category: "financial",
    property: "All Properties",
    size: "1.5 MB",
    uploadedAt: "2023-04-01T13:45:00",
    uploadedBy: "Sarah Johnson",
    folder: "Financial Records",
    tag: "Financial",
  },
]

// Mock folders data
const FOLDERS = [
  {
    id: "folder1",
    name: "Leases",
    description: "Lease agreements for all properties",
    documentCount: 3,
    lastUpdated: "2023-05-15T10:30:00",
  },
  {
    id: "folder2",
    name: "Insurance",
    description: "Property insurance policies and claims",
    documentCount: 2,
    lastUpdated: "2023-04-20T14:45:00",
  },
  {
    id: "folder3",
    name: "Tax Documents",
    description: "Property tax statements and receipts",
    documentCount: 2,
    lastUpdated: "2023-03-20T09:15:00",
  },
  {
    id: "folder4",
    name: "Maintenance Records",
    description: "Maintenance receipts and service records",
    documentCount: 2,
    lastUpdated: "2023-05-05T16:20:00",
  },
  {
    id: "folder5",
    name: "Property Inspections",
    description: "Inspection reports and certificates",
    documentCount: 1,
    lastUpdated: "2023-02-12T11:10:00",
  },
  {
    id: "folder6",
    name: "Financial Records",
    description: "Financial statements and reports",
    documentCount: 2,
    lastUpdated: "2023-04-01T13:40:00",
  },
]

export default function OwnerDocuments() {
  const [activeTab, setActiveTab] = useState("all")
  const [documents, setDocuments] = useState(DOCUMENTS)
  const [folders, setFolders] = useState(FOLDERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [folderFilter, setFolderFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { toast } = useToast()

  // Filter documents based on search term, property, category, and folder
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProperty = propertyFilter === "all" || doc.property === propertyFilter
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesFolder = folderFilter === "all" || doc.folder === folderFilter

    if (activeTab === "all") return matchesSearch && matchesProperty && matchesCategory && matchesFolder
    if (activeTab === "recent") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return (
        matchesSearch && matchesProperty && matchesCategory && matchesFolder && new Date(doc.uploadedAt) >= oneMonthAgo
      )
    }
    if (activeTab === "shared") {
      // Mock shared documents
      return (
        matchesSearch &&
        matchesProperty &&
        matchesCategory &&
        matchesFolder &&
        ["doc1", "doc4", "doc10"].includes(doc.id)
      )
    }

    return matchesSearch && matchesProperty && matchesCategory && matchesFolder
  })

  const handleAddDocument = (data: any) => {
    const newDocument = {
      id: `doc${documents.length + 1}`,
      name: data.name,
      type: getFileType(data.name),
      category: data.category,
      property: data.property,
      size: "1.5 MB",
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Sarah Johnson",
      folder: data.folder,
      tag: data.category.charAt(0).toUpperCase() + data.category.slice(1),
    }

    setDocuments([newDocument, ...documents])

    toast({
      title: "Document uploaded",
      description: "The document has been successfully uploaded.",
    })
  }

  const handleCreateFolder = (data: any) => {
    const newFolder = {
      id: `folder${folders.length + 1}`,
      name: data.name,
      description: data.description,
      documentCount: 0,
      lastUpdated: new Date().toISOString(),
    }

    setFolders([...folders, newFolder])

    toast({
      title: "Folder created",
      description: "The folder has been successfully created.",
    })
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))

    toast({
      title: "Document deleted",
      description: "The document has been successfully deleted.",
    })
  }

  const handleDeleteFolder = (id: string) => {
    const folderName = folders.find((folder) => folder.id === id)?.name
    if (folderName) {
      setDocuments(
        documents.map((doc) => {
          if (doc.folder === folderName) {
            return { ...doc, folder: "" }
          }
          return doc
        }),
      )
    }

    setFolders(folders.filter((folder) => folder.id !== id))

    toast({
      title: "Folder deleted",
      description: "The folder has been successfully deleted.",
    })
  }

  const getFileIcon = (type: string, category: string) => {
    // Color based on category like in the image
    if (category === "maintenance") {
      return <File className="h-8 w-8 text-blue-500" />
    }
    if (category === "financial") {
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />
    }
    // Default red for most documents
    return <FilePdf className="h-8 w-8 text-red-500" />
  }

  const getFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (extension === "pdf") return "pdf"
    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) return "image"
    if (["xls", "xlsx", "csv"].includes(extension || "")) return "spreadsheet"
    return "other"
  }

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "lease":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "insurance":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "tax":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "maintenance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "inspection":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      case "financial":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={[{ label: "Documents", icon: FileText }]} />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Store, organize, and share important documents</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Tabs and Controls */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap items-center gap-3">
            {/* View Toggle */}
            {activeTab !== "folders" && (
              <div className="flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="123 Main Street">123 Main Street</SelectItem>
                <SelectItem value="456 Oak Avenue">456 Oak Avenue</SelectItem>
                <SelectItem value="All Properties">All Properties</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lease">Lease</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="tax">Tax</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
              </SelectContent>
            </Select>

            {activeTab !== "folders" && (
              <Select value={folderFilter} onValueChange={setFolderFilter}>
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue placeholder="All Folders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {activeTab === "folders" ? (
                <CreateFolderDialog onCreateFolder={handleCreateFolder} />
              ) : (
                <AddDocumentDialog onAddDocument={handleAddDocument} />
              )}
              <Button variant="outline" size="sm" className="h-9">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            </div>
          </div>
        </Card>

        {/* All Documents Tab */}
        <TabsContent value="all" className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="p-4 bg-muted/30 rounded-full mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  {searchTerm || propertyFilter !== "all" || categoryFilter !== "all" || folderFilter !== "all"
                    ? "Try adjusting your search or filters to find what you're looking for"
                    : "Upload your first document to get started organizing your property files"}
                </p>
                <AddDocumentDialog onAddDocument={handleAddDocument} />
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border hover:border-primary/20 group">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            {getFileIcon(document.type, document.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{document.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {document.size} • {formatDate(document.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3 pt-3 border-t">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getTagColor(document.tag)} text-xs`} variant="outline">
                            {document.tag}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <FolderOpen className="h-3 w-3" />
                            {document.folder}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                          <Building className="h-3.5 w-3.5" />
                          <span className="truncate">{document.property}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Property</th>
                        <th className="text-left p-4 font-medium">Category</th>
                        <th className="text-left p-4 font-medium">Folder</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Size</th>
                        <th className="text-right p-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((document) => (
                        <tr key={document.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(document.type, document.category)}
                              <span className="font-medium">{document.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              {document.property}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getTagColor(document.tag)} variant="outline">
                              {document.tag}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <FolderOpen className="h-4 w-4 text-muted-foreground" />
                              {document.folder}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(document.uploadedAt)}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{document.size}</td>
                          <td className="p-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recent Tab */}
        <TabsContent value="recent" className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No recent documents found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {searchTerm || propertyFilter !== "all" || categoryFilter !== "all" || folderFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Upload a document to get started"}
                </p>
                <AddDocumentDialog onAddDocument={handleAddDocument} />
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.type, document.category)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{document.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {document.size} • {formatDate(document.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getTagColor(document.tag)} variant="outline">
                            {document.tag}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <FolderOpen className="h-3 w-3" />
                            {document.folder}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Building className="h-3 w-3" />
                          {document.property}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Property</th>
                        <th className="text-left p-4 font-medium">Category</th>
                        <th className="text-left p-4 font-medium">Folder</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Size</th>
                        <th className="text-right p-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((document) => (
                        <tr key={document.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(document.type, document.category)}
                              <span className="font-medium">{document.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              {document.property}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getTagColor(document.tag)} variant="outline">
                              {document.tag}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <FolderOpen className="h-4 w-4 text-muted-foreground" />
                              {document.folder}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(document.uploadedAt)}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{document.size}</td>
                          <td className="p-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Shared Tab */}
        <TabsContent value="shared" className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Share2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No shared documents found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {searchTerm || propertyFilter !== "all" || categoryFilter !== "all" || folderFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Share a document to get started"}
                </p>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share a Document
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.type, document.category)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{document.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {document.size} • {formatDate(document.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getTagColor(document.tag)} variant="outline">
                            {document.tag}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <FolderOpen className="h-3 w-3" />
                            {document.folder}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Building className="h-3 w-3" />
                          {document.property}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Property</th>
                        <th className="text-left p-4 font-medium">Category</th>
                        <th className="text-left p-4 font-medium">Folder</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Size</th>
                        <th className="text-right p-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((document) => (
                        <tr key={document.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(document.type, document.category)}
                              <span className="font-medium">{document.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              {document.property}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getTagColor(document.tag)} variant="outline">
                              {document.tag}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <FolderOpen className="h-4 w-4 text-muted-foreground" />
                              {document.folder}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(document.uploadedAt)}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{document.size}</td>
                          <td className="p-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Folders Tab */}
        <TabsContent value="folders" className="space-y-4">
          {folders.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="p-4 bg-muted/30 rounded-full mb-4">
                  <FolderOpen className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No folders found</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">Create a folder to organize your documents and keep everything tidy</p>
                <CreateFolderDialog onCreateFolder={handleCreateFolder} />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map((folder) => (
                <Card key={folder.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border hover:border-primary/20 group">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                            <FolderOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{folder.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {folder.documentCount} {folder.documentCount === 1 ? "document" : "documents"}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { setActiveTab("all"); setFolderFilter(folder.name); }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Contents
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Folder
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteFolder(folder.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Folder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="pt-3 border-t space-y-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{folder.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Last updated: {formatDate(folder.lastUpdated)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


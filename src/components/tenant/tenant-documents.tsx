import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Download, 
  Search, 
  Upload,
  Eye,
  Calendar,
  User,
  Building,
  Shield
} from "lucide-react"

// Mock documents data
const mockDocuments = {
  lease: [
    {
      id: 1,
      name: "Lease Agreement - 2024",
      type: "lease",
      size: "2.4 MB",
      uploadDate: "2023-09-15",
      expiryDate: "2024-12-31",
      status: "active"
    },
    {
      id: 2,
      name: "Lease Amendment - Pet Policy",
      type: "amendment",
      size: "156 KB",
      uploadDate: "2023-11-20",
      status: "active"
    }
  ],
  insurance: [
    {
      id: 3,
      name: "Renters Insurance Policy",
      type: "insurance",
      size: "1.8 MB",
      uploadDate: "2023-09-20",
      expiryDate: "2024-09-20",
      status: "active",
      required: true
    },
    {
      id: 4,
      name: "Insurance Certificate",
      type: "certificate",
      size: "245 KB",
      uploadDate: "2023-09-20",
      status: "active"
    }
  ],
  personal: [
    {
      id: 5,
      name: "Emergency Contact Form",
      type: "form",
      size: "89 KB",
      uploadDate: "2023-09-15",
      status: "active"
    },
    {
      id: 6,
      name: "Move-in Inspection Report",
      type: "inspection",
      size: "3.2 MB",
      uploadDate: "2023-09-16",
      status: "completed"
    }
  ],
  notices: [
    {
      id: 7,
      name: "Lease Renewal Notice",
      type: "notice",
      size: "124 KB",
      uploadDate: "2024-01-15",
      status: "new",
      actionRequired: true
    },
    {
      id: 8,
      name: "Maintenance Schedule Notice",
      type: "notice",
      size: "67 KB",
      uploadDate: "2024-01-10",
      status: "read"
    }
  ]
}

export default function TenantDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const getAllDocuments = () => {
    return [
      ...mockDocuments.lease,
      ...mockDocuments.insurance,
      ...mockDocuments.personal,
      ...mockDocuments.notices
    ]
  }

  const getFilteredDocuments = () => {
    let documents = getAllDocuments()
    
    if (activeTab !== "all") {
      documents = mockDocuments[activeTab as keyof typeof mockDocuments] || []
    }
    
    if (searchTerm) {
      documents = documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return documents
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "lease":
      case "amendment":
        return <Building className="h-5 w-5 text-blue-500" />
      case "insurance":
      case "certificate":
        return <Shield className="h-5 w-5 text-green-500" />
      case "notice":
        return <Calendar className="h-5 w-5 text-orange-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (document: any) => {
    if (document.actionRequired) {
      return <Badge className="bg-red-100 text-red-800">Action Required</Badge>
    }
    if (document.status === "new") {
      return <Badge className="bg-blue-100 text-blue-800">New</Badge>
    }
    if (document.status === "active") {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    }
    return <Badge variant="outline">{document.status}</Badge>
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  const filteredDocuments = getFilteredDocuments()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Documents
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Access your lease, insurance, and other important documents
        </p>
      </div>

      {/* Search and Upload */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="lease">Lease</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Expiring Documents Alert */}
          {activeTab === "all" && (
            <div className="space-y-4">
              {getAllDocuments().some(doc => isExpiringSoon(doc.expiryDate)) && (
                <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Documents Expiring Soon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getAllDocuments()
                        .filter(doc => isExpiringSoon(doc.expiryDate))
                        .map(doc => (
                          <div key={doc.id} className="flex items-center justify-between">
                            <span className="text-sm">{doc.name}</span>
                            <span className="text-sm text-orange-600">
                              Expires {doc.expiryDate}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Documents List */}
          <div className="grid gap-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {getDocumentIcon(document.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{document.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>Size: {document.size}</span>
                          <span>Uploaded: {document.uploadDate}</span>
                          {document.expiryDate && (
                            <span className={isExpiringSoon(document.expiryDate) ? "text-orange-600" : ""}>
                              Expires: {document.expiryDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(document)}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No documents found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? "Try adjusting your search terms" 
                    : "No documents available in this category"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Can't find a document or need assistance?
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Request additional documents from your property manager
            </p>
            <Button variant="outline" className="w-full">
              Request Document
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Digital Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sign documents electronically when required
            </p>
            <Button variant="outline" className="w-full">
              Pending Signatures
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

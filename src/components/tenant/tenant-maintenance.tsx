import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, CheckCircle, Clock, AlertCircle, Wrench, MessageSquare, Upload, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { maintenanceApi, type MaintenanceRequest } from "@/lib/api"

// Real API integration - no more static data

function MaintenanceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()

  // Fetch maintenance requests from API
  useEffect(() => {
    fetchMaintenanceRequests()
  }, [])

  const fetchMaintenanceRequests = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("🔍 Fetching maintenance requests...")
      const requests = await maintenanceApi.getTenantMaintenanceRequests()
      console.log("📊 Received maintenance requests:", requests)
      setMaintenanceRequests(requests)
    } catch (err: any) {
      console.error("❌ Error fetching maintenance requests:", err)
      console.error("❌ Error details:", err.message)
      setError("Failed to load maintenance requests")
      toast({
        title: "Error",
        description: "Failed to load maintenance requests. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Requests</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your maintenance requests</p>
        </div>
        <Link to="/tenant/maintenance/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading maintenance requests...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Requests</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchMaintenanceRequests}>
              Try Again
            </Button>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-8">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Maintenance Requests</h3>
            <p className="text-gray-600 mb-4">You haven't submitted any maintenance requests yet.</p>
            <Link to="/tenant/maintenance/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit Your First Request
              </Button>
            </Link>
          </div>
        ) : (
          filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(request.status)}
                  <div>
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{request.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority} priority
                  </Badge>
                  <Badge variant="outline">
                    {request.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Submitted:</span>
                  <p className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                {request.dateScheduled && (
                  <div>
                    <span className="text-gray-500">Scheduled:</span>
                    <p className="font-medium">{new Date(request.dateScheduled).toLocaleDateString()}</p>
                  </div>
                )}
                {request.dateCompleted && (
                  <div>
                    <span className="text-gray-500">Completed:</span>
                    <p className="font-medium">{new Date(request.dateCompleted).toLocaleDateString()}</p>
                  </div>
                )}
                {request.assignedTo && (
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <p className="font-medium">{request.assignedTo}</p>
                  </div>
                )}
              </div>

              {request.managerNotes && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Manager Response:</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <p className="text-sm">{request.managerNotes}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Updated: {new Date(request.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {request.photos && request.photos.length > 0 && (
                    <span className="flex items-center">
                      <Upload className="h-4 w-4 mr-1" />
                      {request.photos.length} photo(s)
                    </span>
                  )}
                  {request.updates && request.updates.length > 0 && (
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {request.updates.length} update(s)
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedRequest(request);
                    setIsDetailsOpen(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Maintenance Request Details</DialogTitle>
            <DialogDescription>
              Complete information about your maintenance request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getPriorityColor(selectedRequest.priority)}>
                    {selectedRequest.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Badge variant="outline">
                    {selectedRequest.priority} priority
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Submitted</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedRequest.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedRequest.description}</p>
              </div>

              {selectedRequest.assignedTo && (
                <div>
                  <Label className="text-sm font-medium">Assigned To</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.assignedTo}</p>
                </div>
              )}

              {selectedRequest.managerNotes && (
                <div>
                  <Label className="text-sm font-medium">Manager Response</Label>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mt-1">
                    <p className="text-sm">{selectedRequest.managerNotes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}

function NewMaintenanceRequest() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    photos: [] as File[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      
      await maintenanceApi.createMaintenanceRequest({
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        priority: formData.priority as any,
        photos: [] // TODO: Handle photo uploads
      })

      toast({
        title: "Request Submitted",
        description: "Your maintenance request has been submitted successfully.",
      })
      navigate("/tenant/maintenance/")
    } catch (error: any) {
      console.error("Error submitting maintenance request:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit maintenance request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newFiles]
      }))
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">New Maintenance Request</h2>
        <p className="text-gray-600 dark:text-gray-400">Submit a new maintenance request</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>
            Please provide detailed information about the maintenance issue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="appliances">Appliances</SelectItem>
                  <SelectItem value="flooring">Flooring</SelectItem>
                  <SelectItem value="windows">Windows/Doors</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Can wait a few days</SelectItem>
                  <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                  <SelectItem value="high">High - Urgent, affects daily life</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide a detailed description of the issue, including when it started, what you've tried, and any other relevant information..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="photos">Photos (Optional)</Label>
              <div className="mt-2">
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="mb-4"
                />
                {formData.photos.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Selected photos:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                          <span className="text-sm mr-2">{photo.name}</span>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Link to="/tenant/maintenance/">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TenantMaintenance() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<MaintenanceList />} />
        <Route path="/new" element={<NewMaintenanceRequest />} />
      </Routes>
    </div>
  )
}

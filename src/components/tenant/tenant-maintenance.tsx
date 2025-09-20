import { useState } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Wrench,
  Calendar,
  MessageSquare,
  Upload,
  X
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock maintenance requests data
const mockMaintenanceRequests = [
  {
    id: 1,
    title: "Leaky Kitchen Faucet",
    description: "The kitchen faucet has been dripping constantly for the past week. It's getting worse and wasting water.",
    category: "plumbing",
    priority: "medium",
    status: "in_progress",
    dateSubmitted: "2024-01-15",
    dateScheduled: "2024-01-22",
    assignedTo: "Mike Johnson - Plumber",
    photos: ["faucet1.jpg", "faucet2.jpg"],
    updates: [
      { date: "2024-01-20", message: "Parts ordered, will be installed on scheduled date", author: "Mike Johnson" },
      { date: "2024-01-16", message: "Request received and reviewed", author: "Property Manager" }
    ]
  },
  {
    id: 2,
    title: "Heating Not Working",
    description: "The heating system stopped working yesterday. Apartment is getting very cold.",
    category: "hvac",
    priority: "high",
    status: "completed",
    dateSubmitted: "2024-01-10",
    dateCompleted: "2024-01-12",
    assignedTo: "Sarah Davis - HVAC Tech",
    photos: ["heater1.jpg"],
    updates: [
      { date: "2024-01-12", message: "Heating system repaired. Thermostat was faulty and has been replaced.", author: "Sarah Davis" },
      { date: "2024-01-10", message: "Emergency request received. Technician dispatched.", author: "Property Manager" }
    ]
  },
  {
    id: 3,
    title: "Bathroom Light Bulb Out",
    description: "The light bulb in the main bathroom burned out and needs replacement.",
    category: "electrical",
    priority: "low",
    status: "pending",
    dateSubmitted: "2024-01-12",
    assignedTo: null,
    photos: [],
    updates: [
      { date: "2024-01-12", message: "Request submitted and pending review", author: "System" }
    ]
  }
]

function MaintenanceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredRequests = mockMaintenanceRequests.filter(request => {
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
        {filteredRequests.map((request) => (
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
                  <p className="font-medium">{request.dateSubmitted}</p>
                </div>
                {request.dateScheduled && (
                  <div>
                    <span className="text-gray-500">Scheduled:</span>
                    <p className="font-medium">{request.dateScheduled}</p>
                  </div>
                )}
                {request.dateCompleted && (
                  <div>
                    <span className="text-gray-500">Completed:</span>
                    <p className="font-medium">{request.dateCompleted}</p>
                  </div>
                )}
                {request.assignedTo && (
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <p className="font-medium">{request.assignedTo}</p>
                  </div>
                )}
              </div>

              {request.updates.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Latest Update:</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <p className="text-sm">{request.updates[0].message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {request.updates[0].date} - {request.updates[0].author}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {request.photos.length > 0 && (
                    <span className="flex items-center">
                      <Upload className="h-4 w-4 mr-1" />
                      {request.photos.length} photo(s)
                    </span>
                  )}
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {request.updates.length} update(s)
                  </span>
                </div>
                <Link to={`/tenant/maintenance/${request.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No maintenance requests found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all" || priorityFilter !== "all" 
                ? "Try adjusting your filters" 
                : "You haven't submitted any maintenance requests yet"}
            </p>
            <Link to="/tenant/maintenance/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit New Request
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "Your maintenance request has been submitted successfully.",
      })
      navigate("/tenant/maintenance")
    }, 1000)
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
              <Link to="/tenant/maintenance">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">
                Submit Request
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

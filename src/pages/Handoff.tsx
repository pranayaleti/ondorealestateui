import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Phone,
  Zap,
  Key,
  Mail,
  Wrench,
  FileText,
  MapPin,
  Shield,
  Car,
  CheckSquare,
  Calendar,
  AlertCircle,
  Building,
  UtensilsCrossed,
  ShoppingCart,
  Heart,
  Dumbbell,
  GraduationCap,
  Bus,
  Snowflake,
  Sun,
  Leaf,
  Wind,
  HelpCircle,
  Lightbulb,
  Download,
  ExternalLink,
  Edit,
  Save,
  X,
  Eye,
  Share2,
  Trash2,
  MoreHorizontal,
  FileIcon
} from "lucide-react"
import { PropertyHandoff } from "@/types/handoff.types"
import { PageBanner } from "@/components/page-banner"
import { useAuth } from "@/lib/auth-context"
import { companyInfo } from "@/constants/companyInfo"
import { PortalSidebar } from "@/components/portal-sidebar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { propertyApi, handoffApi, type Property } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Upload, Grid3x3, List, PartyPopper, CheckCircle2, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Handoff() {
  const { propertyId: urlPropertyId } = useParams<{ propertyId?: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const [handoffData, setHandoffData] = useState<PropertyHandoff | null>(null)
  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [ownerNotes, setOwnerNotes] = useState<string>("")
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(urlPropertyId || null)
  const [loadingProperties, setLoadingProperties] = useState(true)

  // Email helper function
  const getEmail = (prefix: string) => `${prefix}@${companyInfo.social.twitterDomain}`

  // Determine user capabilities based on role
  // Super Admin, Admin, Manager: Full edit access
  // Owner: Write access (can edit notes and handoff info)
  // Tenant: Read-only access
  const hasFullAccess = user && ['super_admin', 'admin', 'manager'].includes(user.role)
  const canEdit = user && ['owner', 'super_admin', 'admin', 'manager'].includes(user.role)
  const isOwner = user?.role === 'owner'
  const isTenant = user?.role === 'tenant'
  const isMaintenance = user?.role === 'maintenance'
  const needsPropertySelection = hasFullAccess || (isOwner && properties.length > 1)
  
  // Default tab based on role
  const getDefaultTab = () => {
    if (isTenant) return 'checklist'
    if (isMaintenance) return 'property'
    return 'overview'
  }

  const [activeTab, setActiveTab] = useState<string>(getDefaultTab())
  const [expandedAccordion, setExpandedAccordion] = useState<string | undefined>(undefined)
  
  // Document section state
  const [documentTab, setDocumentTab] = useState<string>("all")
  const [documentSearch, setDocumentSearch] = useState<string>("")
  const [documentPropertyFilter, setDocumentPropertyFilter] = useState<string>("all")
  const [documentCategoryFilter, setDocumentCategoryFilter] = useState<string>("all")
  const [documentFolderFilter, setDocumentFolderFilter] = useState<string>("all")
  const [documentViewMode, setDocumentViewMode] = useState<"grid" | "list">("grid")
  
  // Modal state for property information
  const [selectedInfoCard, setSelectedInfoCard] = useState<string | null>(null)
  const [selectedPropertySection, setSelectedPropertySection] = useState<string | null>(null)
  const [selectedNeighborhoodSection, setSelectedNeighborhoodSection] = useState<string | null>(null)
  
  // Celebration modal state
  const [showCelebrationModal, setShowCelebrationModal] = useState(false)
  const [hasNotifiedCompletion, setHasNotifiedCompletion] = useState(false)
  
  // Initialize accordion for maintenance users
  useEffect(() => {
    if (isMaintenance && activeTab === 'property') {
      setExpandedAccordion('access')
    }
  }, [isMaintenance, activeTab])

  // Get document type badge color
  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      insurance: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      tax: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      lease: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      inspection: "bg-green-500/20 text-green-300 border-green-500/30",
      manual: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    }
    return colors[type.toLowerCase()] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }

  // Format file size
  const formatFileSize = (size?: string) => {
    return size || "Unknown size"
  }

  // Format date
  const formatDocumentDate = (date?: Date) => {
    if (!date) return "Unknown date"
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
  }

  // Handle document actions
  const handleViewDocument = (doc: PropertyHandoff['documents'][0]) => {
    if (doc.url && doc.url !== "#") {
      window.open(doc.url, '_blank', 'noopener,noreferrer')
    } else {
      toast({
        title: "Document not available",
        description: "This document is not yet available for viewing.",
        variant: "destructive",
      })
    }
  }

  const handleDownloadDocument = (doc: PropertyHandoff['documents'][0]) => {
    if (doc.url && doc.url !== "#") {
      const link = document.createElement('a')
      link.href = doc.url
      link.download = doc.name
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({
        title: "Download started",
        description: `Downloading ${doc.name}...`,
      })
    } else {
      toast({
        title: "Document not available",
        description: "This document is not yet available for download.",
        variant: "destructive",
      })
    }
  }

  const handleShareDocument = async (doc: PropertyHandoff['documents'][0]) => {
    if (doc.url && doc.url !== "#") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: doc.name,
            text: `Check out this document: ${doc.name}`,
            url: doc.url,
          })
          toast({
            title: "Shared successfully",
            description: `${doc.name} has been shared.`,
          })
        } catch (error) {
          // User cancelled or error occurred
          if ((error as Error).name !== 'AbortError') {
            // Fallback to clipboard
            await navigator.clipboard.writeText(doc.url)
            toast({
              title: "Link copied",
              description: "Document link has been copied to clipboard.",
            })
          }
        }
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(doc.url)
        toast({
          title: "Link copied",
          description: "Document link has been copied to clipboard.",
        })
      }
    } else {
      toast({
        title: "Document not available",
        description: "This document is not yet available for sharing.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDocument = (docId: string) => {
    // Only owners and admins can delete
    if (!canEdit) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete documents.",
        variant: "destructive",
      })
      return
    }

    // TODO: Implement actual delete API call
    toast({
      title: "Document deleted",
      description: "The document has been deleted successfully.",
    })
  }

  // Handle navigation to specific section
  const navigateToSection = (tab: string, accordionValue?: string) => {
    setActiveTab(tab)
    if (accordionValue) {
      // Small delay to ensure tab is switched first
      setTimeout(() => {
        setExpandedAccordion(accordionValue)
        // Scroll to the accordion section
        const element = document.getElementById(`${accordionValue}-tab`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  // Fetch properties for selection
  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?.id) return

      try {
        setLoadingProperties(true)
        const allProperties = await propertyApi.getProperties()
        
        let userProperties: Property[] = []
        const userRole = user.role
        
        if (userRole === 'owner') {
          // Owners see only their properties
          userProperties = allProperties.filter(p => p.ownerId === user.id)
        } else if (userRole === 'super_admin' || userRole === 'admin' || userRole === 'manager') {
          // Managers/Admins see all properties
          userProperties = allProperties
        } else if (userRole === 'tenant') {
          // Tenants see only their assigned property
          userProperties = allProperties.filter(p => p.tenantId === user.id)
        } else {
          // Maintenance sees properties they have tickets for (simplified - show all for now)
          userProperties = allProperties
        }
        
        setProperties(userProperties)
        
        // If URL has propertyId, use it
        if (urlPropertyId && userProperties.some(p => p.id === urlPropertyId)) {
          setSelectedPropertyId(urlPropertyId)
        } else if (!selectedPropertyId && userProperties.length > 0) {
          // Auto-select first property if none selected and properties exist
          setSelectedPropertyId(userProperties[0].id)
        }
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoadingProperties(false)
      }
    }

    fetchProperties()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.role, urlPropertyId])

  // Fetch handoff data when property is selected
  useEffect(() => {
    if (!selectedPropertyId) {
      // Don't set loading to false if we're still loading properties
      // This prevents showing "Handoff Not Found" before properties are loaded
      if (!loadingProperties) {
        setLoading(false)
      }
      return
    }

    // TODO: Fetch handoff data from API based on selectedPropertyId
    // For now, using mock data
    const selectedProperty = properties.find(p => p.id === selectedPropertyId)
    const mockData: PropertyHandoff = {
      id: "1",
      propertyId: selectedPropertyId,
      propertyAddress: selectedProperty 
        ? `${selectedProperty.addressLine1}, ${selectedProperty.city}, ${selectedProperty.state} ${selectedProperty.zipcode || ''}`
        : "123 Main St, Salt Lake City, UT 84101",
      unitNumber: selectedProperty?.addressLine2 || "Apt 2B",
      createdDate: new Date(),
      lastUpdated: new Date(),
      propertyBasics: {
        propertyType: "Apartment",
        squareFootage: 1200,
        bedrooms: 2,
        bathrooms: 1,
        parking: "Assigned spot #12, Garage code: 1234",
        moveInDate: new Date("2024-01-15"),
        leaseTerm: "12 months",
        securityDeposit: 1500,
        securityDepositReturnTerms: "Returned within 30 days of move-out, minus any damages"
      },
      emergencyContacts: [
        {
          name: "Property Manager",
          phone: "(801) 555-0100",
          email: getEmail("manager"),
          emergencyLine: "(801) 555-0101"
        },
        {
          name: "Maintenance Emergency",
          phone: "(801) 555-0200",
          notes: "24/7 hotline"
        },
        {
          name: "Police Department",
          phone: "(801) 555-9111",
          notes: "Local precinct"
        },
        {
          name: "Fire Department",
          phone: "(801) 555-9112",
          notes: "Nearest station"
        },
        {
          name: "Hospital",
          phone: "(801) 555-0300",
          notes: "Nearest facility"
        },
        {
          name: "Poison Control",
          phone: "1-800-222-1222"
        }
      ],
      utilities: {
        electric: {
          provider: "Rocky Mountain Power",
          accountNumber: "123456789",
          customerServicePhone: "(801) 555-1000",
          setupInstructions: "Call to transfer service",
          averageMonthlyCost: 80,
          paymentDueDate: "15th of each month",
          onlinePortalLink: "https://www.rockymountainpower.net",
          includedInRent: false
        },
        gas: {
          provider: "Dominion Energy",
          accountNumber: "987654321",
          customerServicePhone: "(801) 555-2000",
          averageMonthlyCost: 50,
          includedInRent: false
        },
        water: {
          provider: "Salt Lake City Public Utilities",
          accountNumber: "456789123",
          customerServicePhone: "(801) 555-3000",
          includedInRent: true
        },
        internet: [
          {
            provider: "Xfinity",
            phone: "(801) 555-4000",
            website: "https://www.xfinity.com",
            notes: "Recommended provider"
          },
          {
            provider: "Google Fiber",
            phone: "(801) 555-5000",
            website: "https://fiber.google.com"
          }
        ],
        trash: {
          collectionDays: {
            trash: ["Monday"],
            recycling: ["Monday"],
            bulk: ["First Monday of month"]
          },
          binLocation: "Behind building, near parking area",
          specialInstructions: "Recycling must be sorted",
          bulkPickupSchedule: "First Monday of each month",
          hazardousWasteDisposal: "Drop off at city facility"
        }
      },
      access: {
        keys: [
          { label: "Front door", location: "Main entrance" },
          { label: "Mailbox", location: "Lobby" },
          { label: "Garage", location: "Parking level 1" }
        ],
        codes: [
          { type: "Gate code", code: "1234", location: "Main gate" },
          { type: "Garage code", code: "5678", location: "Garage door" }
        ],
        alarm: {
          provider: "ADT",
          code: "0000",
          contact: "(801) 555-6000",
          monitoringInfo: "24/7 monitoring",
          instructions: "Enter code to disarm"
        }
      },
      mailbox: {
        number: "2B",
        location: "Lobby, left side",
        keyDetails: "Small silver key",
        packageDeliveryArea: "Lobby package room",
        parcelLockerInstructions: "Use code from delivery notification",
        mailHoldProcedure: "Notify USPS online or call 1-800-ASK-USPS"
      },
      appliances: [
        {
          name: "Refrigerator",
          model: "Samsung RF28R7351SG",
          location: "Kitchen",
          manualLink: "https://example.com/manual",
          type: "refrigerator"
        },
        {
          name: "Stove",
          model: "GE JGB700SELSS",
          location: "Kitchen",
          type: "stove",
          details: { fuel: "Gas" }
        },
        {
          name: "Dishwasher",
          model: "Bosch SHX878WD5N",
          location: "Kitchen",
          type: "dishwasher"
        },
        {
          name: "HVAC",
          location: "Hallway",
          type: "hvac",
          details: {
            filterSize: "16x25x1",
            filterChangeSchedule: "Every 3 months",
            thermostatLocation: "Living room wall"
          }
        }
      ],
      maintenance: {
        requestMethod: "Online portal or email",
        contacts: [
          {
            name: "Maintenance Department",
            phone: "(801) 555-0200",
            email: getEmail("maintenance")
          }
        ],
        responseTimes: "Emergency: 2 hours, Routine: 24-48 hours",
        responsibilities: "Tenant responsible for lightbulbs, batteries, minor cleaning. Owner responsible for major repairs.",
        preferredContractors: [
          {
            name: "ABC Plumbing",
            phone: "(801) 555-1001",
            notes: "Preferred plumber"
          },
          {
            name: "XYZ Electric",
            phone: "(801) 555-1002",
            notes: "Preferred electrician"
          }
        ],
        preventiveMaintenanceSchedule: "HVAC service every 6 months",
        filterChangeInfo: "HVAC filter: 16x25x1, change every 3 months"
      },
      policies: {
        smoking: "No smoking allowed",
        pets: "Pets allowed with deposit. Must clean up waste. Leash required.",
        quietHours: "10 PM - 7 AM",
        guests: "Overnight guests limited to 7 days",
        subletting: "Not allowed without written permission",
        modifications: "No nail holes without approval",
        grilling: "Grilling allowed on balcony only",
        other: "Please respect neighbors"
      },
      neighborhood: {
        grocery: [
          { name: "Smith's", address: "500 S Main St", distance: "0.5 miles" },
          { name: "Whole Foods", address: "1000 S State St", distance: "1.2 miles" }
        ],
        dining: [
          { name: "The Red Iguana", address: "736 W North Temple", notes: "Mexican cuisine" },
          { name: "Squatters Pub", address: "147 W Broadway", notes: "American pub" }
        ],
        services: [
          { name: "Chase Bank", address: "200 S Main St", phone: "(801) 555-7000" },
          { name: "USPS Post Office", address: "1760 W 2100 S", phone: "(801) 555-7001" }
        ],
        healthcare: [
          { name: "University Hospital", address: "50 N Medical Dr", phone: "(801) 555-8000" },
          { name: "Urgent Care", address: "300 S Main St", phone: "(801) 555-8001" }
        ],
        recreation: [
          { name: "Liberty Park", address: "600 E 1300 S", notes: "Large park with trails" },
          { name: "City Library", address: "210 E 400 S", notes: "Main branch" }
        ],
        schools: [
          { name: "Salt Lake School District", type: "district", website: "https://www.slcschools.org" },
          { name: "Washington Elementary", type: "elementary", address: "420 S 200 E" }
        ],
        transportation: {
          publicTransit: "UTA Trax and Bus",
          busStops: ["Main St & 200 S", "State St & 300 S"],
          trainStations: ["City Center Station"],
          airportDistance: "6 miles",
          airportDirections: "Take I-80 W to Airport"
        }
      },
      localServices: [
        {
          name: "Trash Pickup",
          schedule: "Every Monday",
          type: "trash"
        },
        {
          name: "Street Cleaning",
          schedule: "First Tuesday of each month",
          type: "street_cleaning"
        },
        {
          name: "Snow Removal",
          schedule: "As needed",
          contact: "Property management",
          type: "snow_removal"
        }
      ],
      safety: {
        fireExtinguisherLocations: ["Kitchen", "Hallway"],
        smokeDetectorLocations: ["Living room", "Bedroom", "Hallway"],
        carbonMonoxideDetectorLocations: ["Bedroom"],
        emergencyExits: ["Front door", "Balcony"],
        waterMainShutOff: "Basement, near water heater",
        electricalPanelLocation: "Hallway closet",
        gasShutOffLocation: "Outside, near gas meter"
      },
      parking: {
        assignedSpots: ["Spot #12"],
        guestParking: "Street parking available",
        parkingPermits: "Not required",
        storageUnitDetails: "Storage unit #5 in basement",
        bikeStorageArea: "Bike rack in parking garage"
      },
      moveInChecklist: [
        { id: "1", label: "Schedule utility transfers", completed: false, category: "utilities" },
        { id: "2", label: "Update mailing address with USPS", completed: false, category: "address" },
        { id: "3", label: "Update driver's license address", completed: false, category: "address" },
        { id: "4", label: "Register to vote at new address", completed: false, category: "address" },
        { id: "5", label: "Set up renters insurance", completed: false, category: "insurance" },
        { id: "6", label: "Take move-in photos/videos", completed: false, category: "documentation" },
        { id: "7", label: "Test all appliances", completed: false, category: "property" },
        { id: "8", label: "Test smoke/CO detectors", completed: false, category: "safety" },
        { id: "9", label: "Locate all shut-off valves", completed: false, category: "safety" },
        { id: "10", label: "Program garage/gate codes", completed: false, category: "access" },
        { id: "11", label: "Set up internet service", completed: false, category: "utilities" },
        { id: "12", label: "Learn trash schedule", completed: false, category: "utilities" }
      ],
      documents: [
        { 
          id: "1", 
          name: "Property Insurance Policy - 123 Main St", 
          type: "insurance", 
          url: "#",
          uploadDate: new Date("2023-04-20"),
          size: "3.5 MB"
        },
        { 
          id: "2", 
          name: "Property Tax Statement 2023 - 456 Oak Avenue", 
          type: "tax", 
          url: "#",
          uploadDate: new Date("2023-03-20"),
          size: "820 KB"
        },
        { 
          id: "3", 
          name: "Lease Agreement", 
          type: "lease", 
          url: "#",
          uploadDate: new Date("2024-01-15"),
          size: "2.1 MB"
        },
        { 
          id: "4", 
          name: "Move-in Inspection Report", 
          type: "inspection", 
          url: "#",
          uploadDate: new Date("2024-01-15"),
          size: "1.8 MB"
        },
        { 
          id: "5", 
          name: "Appliance Manuals", 
          type: "manual", 
          url: "#",
          uploadDate: new Date("2024-01-10"),
          size: "5.2 MB"
        }
      ],
      seasonalInfo: [
        {
          season: "spring",
          tips: [
            "Start AC system and check filters",
            "Check for pollen buildup",
            "Inspect for any winter damage"
          ]
        },
        {
          season: "summer",
          tips: [
            "Keep AC filters clean",
            "Monitor water usage",
            "Check for pests"
          ]
        },
        {
          season: "fall",
          tips: [
            "Prepare heating system",
            "Clean gutters",
            "Manage leaf buildup"
          ]
        },
        {
          season: "winter",
          tips: [
            "Prevent pipe freezing",
            "Keep walkways clear",
            "Monitor heating system"
          ]
        }
      ],
      faqs: [
        {
          question: "What do I do if I'm locked out?",
          answer: "Contact property management at (801) 555-0100. After-hours lockout service available for a fee."
        },
        {
          question: "How do I report a maintenance emergency?",
          answer: "Call the 24/7 maintenance hotline at (801) 555-0200 for emergencies."
        },
        {
          question: "Can I paint or make modifications?",
          answer: "Minor modifications require written approval. No nail holes without permission."
        }
      ],
      ownerNotes: "Welcome to your new home! The neighborhood is very friendly. Best coffee shop is around the corner on Main St. The building is quiet, but please be mindful of noise during quiet hours."
    }

    // Initialize checklist state
    const initialChecklist: Record<string, boolean> = {}
    mockData.moveInChecklist.forEach(item => {
      initialChecklist[item.id] = item.completed
    })
    setChecklistItems(initialChecklist)
    setHandoffData(mockData)
    setOwnerNotes(mockData.ownerNotes || "")
    setLoading(false)
  }, [selectedPropertyId, properties])

  const handleChecklistToggle = (id: string) => {
    setChecklistItems(prev => {
      const newItems = {
        ...prev,
        [id]: !prev[id]
      }
      // Reset notification flag if completion drops below 100%
      const completedCount = Object.values(newItems).filter(Boolean).length
      const totalCount = handoffData?.moveInChecklist.length || 0
      if (completedCount < totalCount && hasNotifiedCompletion) {
        setHasNotifiedCompletion(false)
      }
      return newItems
    })
  }

  // Detect 100% completion and trigger celebrations
  useEffect(() => {
    if (!handoffData || !isTenant || hasNotifiedCompletion) return

    const completedCount = Object.values(checklistItems).filter(Boolean).length
    const totalCount = handoffData.moveInChecklist.length

    if (completedCount === totalCount && totalCount > 0) {
      // Show celebration modal
      setShowCelebrationModal(true)
      setHasNotifiedCompletion(true)

      // Show success toast
      toast({
        title: "🎉 Congratulations!",
        description: "You've completed all move-in checklist tasks!",
        variant: "success",
        duration: 5000,
      })

      // Send email notification to property manager
      if (selectedPropertyId && user) {
        const tenantName = `${user.firstName} ${user.lastName}`
        const propertyAddress = `${handoffData.propertyAddress}${handoffData.unitNumber ? ` - ${handoffData.unitNumber}` : ''}`
        
        handoffApi.notifyChecklistCompletion(selectedPropertyId, tenantName, propertyAddress)
          .then(() => {
            console.log('Property manager notified successfully')
          })
          .catch((error) => {
            console.error('Failed to notify property manager:', error)
            // Don't show error to user, just log it
          })
      }
    }
  }, [checklistItems, handoffData, isTenant, hasNotifiedCompletion, selectedPropertyId, user, toast])

  // Handle property selection change
  const handlePropertyChange = (newPropertyId: string) => {
    setSelectedPropertyId(newPropertyId)
    navigate(`/handoff/${newPropertyId}`)
  }

  // Show loading state for properties first
  if (loadingProperties) {
    return (
      <PortalSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      </PortalSidebar>
    )
  }

  // Show loading state for handoff data
  if (loading) {
    return (
      <PortalSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading handoff information...</p>
          </div>
        </div>
      </PortalSidebar>
    )
  }

  // Only show "Not Found" if we're not loading and have no data
  // This prevents the flash of error before data loads
  if (!handoffData && !loading && !loadingProperties) {
    return (
      <PortalSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Handoff Not Found</CardTitle>
              <CardDescription>No handoff information available for this property.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
      </PortalSidebar>
    )
  }

  // Show property selection if needed and no property selected
  if (needsPropertySelection && properties.length > 0 && !selectedPropertyId) {
    return (
      <PortalSidebar>
        <div className="min-h-screen bg-background">
          <PageBanner
            title="Select Property"
            subtitle="Choose a property to view or manage handoff information"
          />
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {isOwner ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card 
                    key={property.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handlePropertyChange(property.id)}
                  >
                    <CardHeader>
                      <CardTitle>{property.title || property.addressLine1}</CardTitle>
                      <CardDescription>
                        {property.city}, {property.state}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {property.addressLine1}
                        {property.addressLine2 && `, ${property.addressLine2}`}
                      </p>
                      {property.price && (
                        <p className="text-lg font-semibold mt-2">
                          ${property.price.toLocaleString()}/mo
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select Property</CardTitle>
                  <CardDescription>Choose a property to view handoff information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedPropertyId || ""} onValueChange={handlePropertyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.title || property.addressLine1} - {property.city}, {property.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </PortalSidebar>
    )
  }

  // Show message if no properties
  if (properties.length === 0 && !isTenant && !isMaintenance) {
    return (
      <PortalSidebar>
        <div className="min-h-screen bg-background">
          <PageBanner
            title="No Properties Found"
            subtitle="No properties available for handoff management"
          />
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  {isOwner 
                    ? "You don't have any properties yet. Add a property to create handoff information."
                    : "No properties are available for handoff management."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PortalSidebar>
    )
  }

  if (loading || !handoffData) {
    return (
      <PortalSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {loading ? "Loading handoff information..." : "No handoff information available for this property."}
            </p>
          </div>
        </div>
      </PortalSidebar>
    )
  }

  const completedCount = Object.values(checklistItems).filter(Boolean).length
  const totalCount = handoffData.moveInChecklist.length

  // Get role-specific banner subtitle
  const getBannerSubtitle = () => {
    const address = `${handoffData.propertyAddress}${handoffData.unitNumber ? ` - ${handoffData.unitNumber}` : ''}`
    if (isTenant) {
      return `${address} - Welcome to your new home!`
    }
    if (isMaintenance) {
      return `${address} - Property Access & Maintenance Info`
    }
    if (canEdit) {
      return `${address} - ${isEditMode ? 'Edit Mode' : 'View & Manage Handoff Information'}`
    }
    return address
  }

  // Get available tabs based on role
  const getAvailableTabs = () => {
    if (isMaintenance) {
      return [
        { value: 'property', label: 'Property Access' },
        { value: 'overview', label: 'Quick Info' }
      ]
    }
    return [
      { value: 'overview', label: 'Overview' },
      { value: 'property', label: 'Property' },
      { value: 'neighborhood', label: 'Neighborhood' },
      { value: 'checklist', label: 'Move-In Checklist' }
    ]
  }

  return (
    <PortalSidebar>
      <div className="min-h-screen bg-background">
        <PageBanner
          title={isTenant ? "Welcome to Your New Home" : isMaintenance ? "Property Handoff" : "Property Handoff"}
          subtitle={getBannerSubtitle()}
        />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Property Selector for Managers/Admins or Owners with multiple properties */}
        {needsPropertySelection && properties.length > 1 && (
          <div className="mb-6">
            {isOwner ? (
              <Tabs value={selectedPropertyId || ""} onValueChange={handlePropertyChange}>
                <TabsList className="w-full bg-gray-900 dark:bg-black rounded-lg p-1.5 flex gap-1.5 overflow-x-auto h-auto">
                  {properties.map((property) => (
                    <TabsTrigger 
                      key={property.id} 
                      value={property.id}
                      className={cn(
                        "flex-1 min-w-[200px] max-w-[300px] px-4 py-3 rounded-md text-left transition-all border-0",
                        "data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-700",
                        "data-[state=active]:text-white",
                        "data-[state=inactive]:bg-gray-800 dark:data-[state=inactive]:bg-gray-800",
                        "data-[state=inactive]:text-gray-400 dark:data-[state=inactive]:text-gray-500",
                        "hover:data-[state=inactive]:bg-gray-750 dark:hover:data-[state=inactive]:bg-gray-750",
                        "hover:data-[state=inactive]:text-gray-300"
                      )}
                    >
                      <div className="flex flex-col items-start gap-0.5 w-full">
                        <span className="font-medium text-sm truncate w-full leading-tight text-inherit">
                          {property.title || property.addressLine1}
                        </span>
                        <span className="text-xs truncate w-full leading-tight opacity-80">
                          {property.city}, {property.state}
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            ) : (
              <Card className="bg-gray-800 dark:bg-gray-900 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="property-select" className="font-medium whitespace-nowrap text-gray-300">
                      Select Property:
                    </Label>
                    <Select value={selectedPropertyId || ""} onValueChange={handlePropertyChange}>
                      <SelectTrigger 
                        id="property-select" 
                        className="w-full max-w-[500px] bg-gray-700 dark:bg-gray-800 border-gray-600 text-white"
                      >
                        <SelectValue placeholder="Select a property" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 dark:bg-gray-900 border-gray-700">
                        {properties.map((property) => (
                          <SelectItem 
                            key={property.id} 
                            value={property.id}
                            className="text-white hover:bg-gray-700 focus:bg-gray-700"
                          >
                            {property.title || property.addressLine1} - {property.city}, {property.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Edit Controls - Only for users with edit access */}
        {canEdit && (
          <div className="mb-6 flex items-center justify-between">
            <div>
              {isEditMode && (
                <Badge variant="secondary" className="mb-2">
                  Edit Mode Active
                </Badge>
              )}
              <p className="text-sm text-muted-foreground">
                {isEditMode 
                  ? isOwner
                    ? "You can now edit handoff information and add notes. Changes will be visible to tenants."
                    : "You can now edit handoff information. Changes will be visible to tenants."
                  : isOwner
                    ? "View handoff information. Click Edit to make changes or add notes."
                    : "View handoff information. Click Edit to make changes."}
              </p>
            </div>
            <div className="flex gap-2">
              {isEditMode ? (
                <>
                  <Button variant="outline" onClick={() => {
                    setIsEditMode(false)
                    // Reset owner notes if cancelled
                    if (handoffData) {
                      setOwnerNotes(handoffData.ownerNotes || "")
                    }
                  }}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // TODO: Save changes to API
                    if (handoffData) {
                      setHandoffData({
                        ...handoffData,
                        ownerNotes: ownerNotes,
                        lastUpdated: new Date()
                      })
                    }
                    setIsEditMode(false)
                  }}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditMode(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isOwner ? "Edit & Add Notes" : "Edit Handoff"}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Read-only notice for tenants */}
        {isTenant && (
          <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Read-only view:</strong> This handoff information is provided by your property owner. 
                If you need to update any information, please contact your property manager.
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full mb-8 ${getAvailableTabs().length === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {getAvailableTabs().map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {isTenant && (
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <AlertCircle className="h-5 w-5" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                    Welcome to your new home! We've prepared this handoff guide to help you settle in smoothly. 
                    Start by checking out the <strong>Move-In Checklist</strong> tab to track your progress.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
                    onClick={() => {
                      const checklistTab = document.querySelector('[value="checklist"]') as HTMLElement
                      checklistTab?.click()
                    }}
                  >
                    Go to Move-In Checklist
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Property Basics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-medium">{handoffData.propertyBasics.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Square Footage</p>
                  <p className="font-medium">{handoffData.propertyBasics.squareFootage.toLocaleString()} sq ft</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms / Bathrooms</p>
                  <p className="font-medium">{handoffData.propertyBasics.bedrooms} bed / {handoffData.propertyBasics.bathrooms} bath</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Move-In Date</p>
                  <p className="font-medium">{handoffData.propertyBasics.moveInDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Term</p>
                  <p className="font-medium">{handoffData.propertyBasics.leaseTerm}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Security Deposit</p>
                  <p className="font-medium">${handoffData.propertyBasics.securityDeposit.toLocaleString()}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Parking</p>
                  <p className="font-medium">{handoffData.propertyBasics.parking}</p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>Important numbers for emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {handoffData.emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <p className="font-semibold">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      {contact.email && <p className="text-sm text-muted-foreground">{contact.email}</p>}
                      {contact.emergencyLine && (
                        <p className="text-sm text-red-600 font-medium">Emergency: {contact.emergencyLine}</p>
                      )}
                      {contact.notes && <p className="text-sm text-muted-foreground mt-1">{contact.notes}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* Property Tab */}
          <TabsContent value="property" className="space-y-6">
            {isMaintenance && (
              <Card className="mb-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
                    <Wrench className="h-5 w-5" />
                    Maintenance Access Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    This view shows property access information and maintenance details needed for service requests.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Property Information Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Utilities Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('utilities')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Zap className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Utilities & Services</CardTitle>
                      <CardDescription className="text-gray-400">Electric, water, internet, trash</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Access & Security Card */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                onClick={() => setSelectedPropertySection('access')}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <Key className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-1">Property Access & Security</CardTitle>
                    <CardDescription className="text-gray-400">Keys, codes, and access info</CardDescription>
                  </div>
                </CardContent>
              </Card>

              {/* Mailbox Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('mailbox')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Mailbox & Packages</CardTitle>
                      <CardDescription className="text-gray-400">Mailbox location and delivery info</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Appliances Card */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                onClick={() => setSelectedPropertySection('appliances')}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                    <Building className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-1">Appliances & Systems</CardTitle>
                    <CardDescription className="text-gray-400">Appliances and their details</CardDescription>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Card */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                onClick={() => setSelectedPropertySection('maintenance')}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <Wrench className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-1">Maintenance & Repairs</CardTitle>
                    <CardDescription className="text-gray-400">Request methods and contractors</CardDescription>
                  </div>
                </CardContent>
              </Card>

              {/* House Rules Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('policies')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <FileText className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">House Rules & Policies</CardTitle>
                      <CardDescription className="text-gray-400">Property rules and guidelines</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Safety Card */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                onClick={() => setSelectedPropertySection('safety')}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Shield className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-1">Safety & Security</CardTitle>
                    <CardDescription className="text-gray-400">Safety equipment and procedures</CardDescription>
                  </div>
                </CardContent>
              </Card>

              {/* Parking Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('parking')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                      <Car className="h-6 w-6 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Parking & Storage</CardTitle>
                      <CardDescription className="text-gray-400">Parking spots and storage info</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('documents')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                      <FileText className="h-6 w-6 text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Important Documents</CardTitle>
                      <CardDescription className="text-gray-400">Lease, insurance, and more</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Seasonal Info Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('seasonal')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <Calendar className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Seasonal Information</CardTitle>
                      <CardDescription className="text-gray-400">Seasonal tips and reminders</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FAQs Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('faqs')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                      <HelpCircle className="h-6 w-6 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Frequently Asked Questions</CardTitle>
                      <CardDescription className="text-gray-400">Common questions and answers</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Owner Notes Card */}
              {!isMaintenance && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedPropertySection('notes')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <Lightbulb className="h-6 w-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Owner's Personal Tips & Notes</CardTitle>
                      <CardDescription className="text-gray-400">Helpful tips from the owner</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Legacy Accordion - Hidden but kept for reference */}
            <div className="hidden">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full" 
              value={expandedAccordion}
              onValueChange={(value) => setExpandedAccordion(value)}
            >
              {/* Utilities - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="utilities" id="utilities-tab">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Utilities & Services
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {/* Electric */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Electric</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p className="font-medium">{handoffData.utilities.electric.provider}</p>
                          </div>
                          {handoffData.utilities.electric.accountNumber && (
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="font-medium">{handoffData.utilities.electric.accountNumber}</p>
                            </div>
                          )}
                          {handoffData.utilities.electric.customerServicePhone && (
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{handoffData.utilities.electric.customerServicePhone}</p>
                            </div>
                          )}
                          {handoffData.utilities.electric.averageMonthlyCost && (
                            <div>
                              <p className="text-sm text-muted-foreground">Average Monthly Cost</p>
                              <p className="font-medium">${handoffData.utilities.electric.averageMonthlyCost}</p>
                            </div>
                          )}
                        </div>
                        {handoffData.utilities.electric.setupInstructions && (
                          <p className="text-sm"><strong>Setup:</strong> {handoffData.utilities.electric.setupInstructions}</p>
                        )}
                        {handoffData.utilities.electric.includedInRent && (
                          <Badge variant="secondary">Included in Rent</Badge>
                        )}
                      </CardContent>
                    </Card>

                    {/* Gas */}
                    {handoffData.utilities.gas && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Gas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Provider</p>
                              <p className="font-medium">{handoffData.utilities.gas.provider}</p>
                            </div>
                            {handoffData.utilities.gas.accountNumber && (
                              <div>
                                <p className="text-sm text-muted-foreground">Account Number</p>
                                <p className="font-medium">{handoffData.utilities.gas.accountNumber}</p>
                              </div>
                            )}
                            {handoffData.utilities.gas.customerServicePhone && (
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{handoffData.utilities.gas.customerServicePhone}</p>
                              </div>
                            )}
                          </div>
                          {handoffData.utilities.gas.includedInRent && (
                            <Badge variant="secondary">Included in Rent</Badge>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Water */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Water/Sewer</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p className="font-medium">{handoffData.utilities.water.provider}</p>
                          </div>
                          {handoffData.utilities.water.accountNumber && (
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="font-medium">{handoffData.utilities.water.accountNumber}</p>
                            </div>
                          )}
                        </div>
                        {handoffData.utilities.water.includedInRent && (
                          <Badge variant="secondary">Included in Rent</Badge>
                        )}
                      </CardContent>
                    </Card>

                    {/* Internet */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Internet/Cable</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {handoffData.utilities.internet.map((service, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <p className="font-semibold">{service.provider}</p>
                              {service.phone && <p className="text-sm text-muted-foreground">{service.phone}</p>}
                              {service.website && (
                                <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                  Visit website <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                              {service.notes && <p className="text-sm text-muted-foreground mt-1">{service.notes}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Trash */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Trash & Recycling</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Collection Days</p>
                          <p className="font-medium">Trash: {handoffData.utilities.trash.collectionDays.trash.join(", ")}</p>
                          <p className="font-medium">Recycling: {handoffData.utilities.trash.collectionDays.recycling.join(", ")}</p>
                          {handoffData.utilities.trash.collectionDays.bulk.length > 0 && (
                            <p className="font-medium">Bulk: {handoffData.utilities.trash.collectionDays.bulk.join(", ")}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bin Location</p>
                          <p className="font-medium">{handoffData.utilities.trash.binLocation}</p>
                        </div>
                        {handoffData.utilities.trash.specialInstructions && (
                          <p className="text-sm"><strong>Instructions:</strong> {handoffData.utilities.trash.specialInstructions}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Access & Security - Always visible */}
              <AccordionItem value="access" id="access-tab">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Property Access & Security
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {/* Keys */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Keys</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {handoffData.access.keys.map((key, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <p className="font-medium">{key.label}</p>
                              {key.location && <p className="text-sm text-muted-foreground">Location: {key.location}</p>}
                              {key.notes && <p className="text-sm text-muted-foreground">{key.notes}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Codes */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Access Codes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {handoffData.access.codes.map((code, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <p className="font-medium">{code.type}</p>
                              <p className="text-lg font-mono">{code.code}</p>
                              {code.location && <p className="text-sm text-muted-foreground">Location: {code.location}</p>}
                              {code.instructions && <p className="text-sm text-muted-foreground">{code.instructions}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Alarm */}
                    {handoffData.access.alarm && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Alarm System</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {handoffData.access.alarm.provider && (
                            <div>
                              <p className="text-sm text-muted-foreground">Provider</p>
                              <p className="font-medium">{handoffData.access.alarm.provider}</p>
                            </div>
                          )}
                          {handoffData.access.alarm.code && (
                            <div>
                              <p className="text-sm text-muted-foreground">Code</p>
                              <p className="font-lg font-mono">{handoffData.access.alarm.code}</p>
                            </div>
                          )}
                          {handoffData.access.alarm.instructions && (
                            <p className="text-sm">{handoffData.access.alarm.instructions}</p>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Mailbox - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="mailbox">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Mailbox & Packages
                    </div>
                  </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Mailbox Number</p>
                        <p className="font-medium">{handoffData.mailbox.number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{handoffData.mailbox.location}</p>
                      </div>
                      {handoffData.mailbox.keyDetails && (
                        <div>
                          <p className="text-sm text-muted-foreground">Key Details</p>
                          <p className="font-medium">{handoffData.mailbox.keyDetails}</p>
                        </div>
                      )}
                      {handoffData.mailbox.packageDeliveryArea && (
                        <div>
                          <p className="text-sm text-muted-foreground">Package Delivery Area</p>
                          <p className="font-medium">{handoffData.mailbox.packageDeliveryArea}</p>
                        </div>
                      )}
                      {handoffData.mailbox.parcelLockerInstructions && (
                        <div>
                          <p className="text-sm text-muted-foreground">Parcel Locker Instructions</p>
                          <p className="font-medium">{handoffData.mailbox.parcelLockerInstructions}</p>
                        </div>
                      )}
                      {handoffData.mailbox.mailHoldProcedure && (
                        <div>
                          <p className="text-sm text-muted-foreground">Mail Hold Procedure</p>
                          <p className="font-medium">{handoffData.mailbox.mailHoldProcedure}</p>
                        </div>
                      )}
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <p className="text-sm font-medium">Remember to update your address with USPS</p>
                        <a href="https://www.usps.com/manage/change-of-address.htm" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1">
                          Change of Address Form <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Appliances - Show for maintenance, hidden sections for others */}
              <AccordionItem value="appliances">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Appliances & Systems
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {handoffData.appliances.map((appliance, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{appliance.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {appliance.model && (
                            <div>
                              <p className="text-sm text-muted-foreground">Model</p>
                              <p className="font-medium">{appliance.model}</p>
                            </div>
                          )}
                          {appliance.location && (
                            <div>
                              <p className="text-sm text-muted-foreground">Location</p>
                              <p className="font-medium">{appliance.location}</p>
                            </div>
                          )}
                          {appliance.manualLink && (
                            <a href={appliance.manualLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                              View Manual <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {appliance.instructions && (
                            <p className="text-sm">{appliance.instructions}</p>
                          )}
                          {appliance.details && Object.entries(appliance.details).map(([key, value]) => (
                            <div key={key}>
                              <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="font-medium">{value}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Maintenance */}
              <AccordionItem value="maintenance" id="maintenance-tab">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Maintenance & Repairs
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>How to Submit Requests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{handoffData.maintenance.requestMethod}</p>
                        <div className="mt-4 space-y-2">
                          {handoffData.maintenance.contacts.map((contact, index) => (
                            <div key={index}>
                              <p className="font-medium">{contact.name}</p>
                              {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                              {contact.email && <p className="text-sm text-muted-foreground">{contact.email}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Response Times</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.responseTimes}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Responsibilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.responsibilities}</p>
                      </CardContent>
                    </Card>

                    {handoffData.maintenance.preferredContractors && handoffData.maintenance.preferredContractors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Preferred Contractors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.maintenance.preferredContractors.map((contractor, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{contractor.name}</p>
                                {contractor.phone && <p className="text-sm text-muted-foreground">{contractor.phone}</p>}
                                {contractor.notes && <p className="text-sm text-muted-foreground">{contractor.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* House Rules - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="policies">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      House Rules & Policies
                    </div>
                  </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <p className="font-semibold">Smoking</p>
                        <p className="text-sm text-muted-foreground">{handoffData.policies.smoking}</p>
                      </div>
                      {handoffData.policies.pets && (
                        <div>
                          <p className="font-semibold">Pets</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.pets}</p>
                        </div>
                      )}
                      {handoffData.policies.quietHours && (
                        <div>
                          <p className="font-semibold">Quiet Hours</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.quietHours}</p>
                        </div>
                      )}
                      {handoffData.policies.guests && (
                        <div>
                          <p className="font-semibold">Guests</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.guests}</p>
                        </div>
                      )}
                      {handoffData.policies.modifications && (
                        <div>
                          <p className="font-semibold">Modifications</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.modifications}</p>
                        </div>
                      )}
                      {handoffData.policies.grilling && (
                        <div>
                          <p className="font-semibold">Grilling</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.grilling}</p>
                        </div>
                      )}
                      {handoffData.policies.other && (
                        <div>
                          <p className="font-semibold">Other</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.other}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Safety - Always visible */}
              <AccordionItem value="safety">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Safety & Security
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      {handoffData.safety.fireExtinguisherLocations && handoffData.safety.fireExtinguisherLocations.length > 0 && (
                        <div>
                          <p className="font-semibold">Fire Extinguisher Locations</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {handoffData.safety.fireExtinguisherLocations.map((loc, i) => (
                              <li key={i}>{loc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {handoffData.safety.smokeDetectorLocations && handoffData.safety.smokeDetectorLocations.length > 0 && (
                        <div>
                          <p className="font-semibold">Smoke Detector Locations</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {handoffData.safety.smokeDetectorLocations.map((loc, i) => (
                              <li key={i}>{loc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {handoffData.safety.waterMainShutOff && (
                        <div>
                          <p className="font-semibold">Water Main Shut-Off</p>
                          <p className="text-sm text-muted-foreground">{handoffData.safety.waterMainShutOff}</p>
                        </div>
                      )}
                      {handoffData.safety.electricalPanelLocation && (
                        <div>
                          <p className="font-semibold">Electrical Panel</p>
                          <p className="text-sm text-muted-foreground">{handoffData.safety.electricalPanelLocation}</p>
                        </div>
                      )}
                      {handoffData.safety.gasShutOffLocation && (
                        <div>
                          <p className="font-semibold">Gas Shut-Off</p>
                          <p className="text-sm text-muted-foreground">{handoffData.safety.gasShutOffLocation}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Parking */}
              <AccordionItem value="parking">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Parking & Storage
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      {handoffData.parking.assignedSpots && handoffData.parking.assignedSpots.length > 0 && (
                        <div>
                          <p className="font-semibold">Assigned Parking Spots</p>
                          <p className="text-sm text-muted-foreground">{handoffData.parking.assignedSpots.join(", ")}</p>
                        </div>
                      )}
                      {handoffData.parking.guestParking && (
                        <div>
                          <p className="font-semibold">Guest Parking</p>
                          <p className="text-sm text-muted-foreground">{handoffData.parking.guestParking}</p>
                        </div>
                      )}
                      {handoffData.parking.storageUnitDetails && (
                        <div>
                          <p className="font-semibold">Storage Unit</p>
                          <p className="text-sm text-muted-foreground">{handoffData.parking.storageUnitDetails}</p>
                        </div>
                      )}
                      {handoffData.parking.bikeStorageArea && (
                        <div>
                          <p className="font-semibold">Bike Storage</p>
                          <p className="text-sm text-muted-foreground">{handoffData.parking.bikeStorageArea}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              {/* Documents - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="documents">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Important Documents
                    </div>
                  </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Document Management Header */}
                    <Card className="bg-gray-800 dark:bg-gray-900 border-gray-700">
                      <CardContent className="p-4 space-y-4">
                        {/* Tabs and View Toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <Tabs value={documentTab} onValueChange={setDocumentTab} className="flex-1">
                            <TabsList className="bg-gray-900 dark:bg-black border border-gray-700 h-9">
                              <TabsTrigger 
                                value="all" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                All Documents
                              </TabsTrigger>
                              <TabsTrigger 
                                value="recent" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                Recent
                              </TabsTrigger>
                              <TabsTrigger 
                                value="shared" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                Shared
                              </TabsTrigger>
                              <TabsTrigger 
                                value="folders" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                Folders
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={documentViewMode === "grid" ? "default" : "ghost"}
                              size="icon"
                              onClick={() => setDocumentViewMode("grid")}
                              className="h-8 w-8 bg-gray-700 hover:bg-gray-600 data-[state=active]:bg-gray-600"
                            >
                              <Grid3x3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={documentViewMode === "list" ? "default" : "ghost"}
                              size="icon"
                              onClick={() => setDocumentViewMode("list")}
                              className="h-8 w-8 bg-gray-700 hover:bg-gray-600 data-[state=active]:bg-gray-600"
                            >
                              <List className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row gap-3">
                          <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search documents..."
                              value={documentSearch}
                              onChange={(e) => setDocumentSearch(e.target.value)}
                              className="pl-10 bg-gray-900 dark:bg-black border-gray-700 text-white placeholder:text-gray-500"
                            />
                          </div>
                          <Select value={documentPropertyFilter} onValueChange={setDocumentPropertyFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-900 dark:bg-black border-gray-700 text-white">
                              <SelectValue placeholder="All Properties" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="all">All Properties</SelectItem>
                              {properties.map((prop) => (
                                <SelectItem key={prop.id} value={prop.id}>
                                  {prop.title || prop.addressLine1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select value={documentCategoryFilter} onValueChange={setDocumentCategoryFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-900 dark:bg-black border-gray-700 text-white">
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="insurance">Insurance</SelectItem>
                              <SelectItem value="tax">Tax</SelectItem>
                              <SelectItem value="lease">Lease</SelectItem>
                              <SelectItem value="inspection">Inspection</SelectItem>
                              <SelectItem value="manual">Manual</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={documentFolderFilter} onValueChange={setDocumentFolderFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-900 dark:bg-black border-gray-700 text-white">
                              <SelectValue placeholder="All Folders" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="all">All Folders</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                              <SelectItem value="financial">Financial</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          {canEdit && (
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Document
                            </Button>
                          )}
                          <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Filtered Documents List */}
                    {(() => {
                      // Handle folders tab
                      if (documentTab === "folders") {
                        return (
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">Folders feature coming soon</p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      }

                      const filteredDocs = handoffData.documents.filter((doc) => {
                        const matchesSearch = doc.name.toLowerCase().includes(documentSearch.toLowerCase())
                        const matchesCategory = documentCategoryFilter === "all" || doc.type.toLowerCase() === documentCategoryFilter.toLowerCase()
                        const matchesProperty = documentPropertyFilter === "all" || documentPropertyFilter === selectedPropertyId
                        const matchesFolder = documentFolderFilter === "all" // TODO: Add folder property to documents
                        
                        if (documentTab === "recent") {
                          const oneMonthAgo = new Date()
                          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
                          return matchesSearch && matchesCategory && matchesProperty && matchesFolder && doc.uploadDate && doc.uploadDate >= oneMonthAgo
                        }
                        if (documentTab === "shared") {
                          // Mock shared documents - in real app, this would check a shared property
                          return matchesSearch && matchesCategory && matchesProperty && matchesFolder && ["1", "3"].includes(doc.id)
                        }
                        
                        return matchesSearch && matchesCategory && matchesProperty && matchesFolder
                      })

                      if (filteredDocs.length === 0) {
                        return (
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">No documents found</p>
                                {documentSearch && (
                                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      }

                      return (
                        <div className={cn(
                          documentViewMode === "grid" 
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                            : "space-y-4"
                        )}>
                          {filteredDocs.map((doc) => (
                            <Card key={doc.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 flex-shrink-0">
                                      <FileIcon className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-white mb-1 truncate">{doc.name}</h4>
                                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                        <span>{formatFileSize(doc.size)}</span>
                                        <span>•</span>
                                        <span>{formatDocumentDate(doc.uploadDate)}</span>
                                      </div>
                                      <div className="flex items-center gap-3 flex-wrap">
                                        <Badge 
                                          variant="outline" 
                                          className={cn("text-xs", getDocumentTypeColor(doc.type))}
                                        >
                                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                          <Building className="h-3 w-3" />
                                          <span className="truncate">{handoffData.propertyAddress}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">More options</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDownloadDocument(doc)}>
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShareDocument(doc)}>
                                          <Share2 className="h-4 w-4 mr-2" />
                                          Share
                                        </DropdownMenuItem>
                                        {canEdit && (
                                          <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                              onClick={() => handleDeleteDocument(doc.id)}
                                              className="text-red-400 focus:text-red-300"
                                            >
                                              <Trash2 className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </>
                                        )}
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Seasonal Info - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="seasonal">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Seasonal Information
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {handoffData.seasonalInfo.map((season, index) => {
                      const icons = {
                        spring: <Leaf className="h-4 w-4" />,
                        summer: <Sun className="h-4 w-4" />,
                        fall: <Wind className="h-4 w-4" />,
                        winter: <Snowflake className="h-4 w-4" />
                      }
                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 capitalize">
                              {icons[season.season]}
                              {season.season}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {season.tips.map((tip, tipIndex) => (
                                <li key={tipIndex}>{tip}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* FAQs - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="faqs">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Frequently Asked Questions
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible>
                        {handoffData.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`faq-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Owner Notes - Hidden for maintenance */}
              {!isMaintenance && (
                <AccordionItem value="notes">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Owner's Personal Tips & Notes
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="pt-6">
                        {isEditMode && (isOwner || hasFullAccess) ? (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="owner-notes" className="text-sm font-medium mb-2 block">
                                Add or update notes for tenants
                              </Label>
                              <Textarea
                                id="owner-notes"
                                value={ownerNotes}
                                onChange={(e) => setOwnerNotes(e.target.value)}
                                placeholder="Add helpful tips, neighborhood secrets, restaurant recommendations, or any other information you'd like to share with tenants..."
                                rows={8}
                                className="min-h-[200px]"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                These notes will be visible to tenants and help them settle into their new home.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {handoffData.ownerNotes ? (
                              <p className="whitespace-pre-line">{handoffData.ownerNotes}</p>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                {isOwner 
                                  ? "No notes added yet. Click 'Edit & Add Notes' to add helpful information for tenants."
                                  : "No owner notes available."}
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
            </div>
          </TabsContent>

          {/* Neighborhood Tab - Hidden for maintenance */}
          {!isMaintenance && (
            <TabsContent value="neighborhood" className="space-y-6">
              {/* Neighborhood Information Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Grocery Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('grocery')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <ShoppingCart className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Grocery & Shopping</CardTitle>
                      <CardDescription className="text-gray-400">Nearby stores and markets</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Dining Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('dining')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <UtensilsCrossed className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Dining</CardTitle>
                      <CardDescription className="text-gray-400">Restaurants and cafes</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Services Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('services')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <Building className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Services</CardTitle>
                      <CardDescription className="text-gray-400">Local service providers</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Healthcare Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('healthcare')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                      <Heart className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Healthcare</CardTitle>
                      <CardDescription className="text-gray-400">Hospitals and clinics</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Recreation Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('recreation')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Dumbbell className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Recreation</CardTitle>
                      <CardDescription className="text-gray-400">Parks and activities</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Schools Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('schools')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <GraduationCap className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Schools</CardTitle>
                      <CardDescription className="text-gray-400">Nearby schools and education</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Transportation Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('transportation')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                      <Bus className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Transportation</CardTitle>
                      <CardDescription className="text-gray-400">Public transit and routes</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Local Services Card */}
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => setSelectedNeighborhoodSection('local-services')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                      <Calendar className="h-6 w-6 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">Local Services & Important Info</CardTitle>
                      <CardDescription className="text-gray-400">Community services and schedules</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Move-In Checklist Tab - Hidden for maintenance */}
          {!isMaintenance && (
            <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5" />
                      Move-In Checklist
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Track your progress: {completedCount} of {totalCount} completed
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round((completedCount / totalCount) * 100)}%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    handoffData.moveInChecklist.reduce((acc, item) => {
                      if (!acc[item.category]) acc[item.category] = []
                      acc[item.category].push(item)
                      return acc
                    }, {} as Record<string, typeof handoffData.moveInChecklist>)
                  ).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-3 capitalize">{category}</h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <Checkbox
                              id={item.id}
                              checked={checklistItems[item.id] || false}
                              onCheckedChange={() => handleChecklistToggle(item.id)}
                            />
                            <label
                              htmlFor={item.id}
                              className={`flex-1 cursor-pointer ${checklistItems[item.id] ? 'line-through text-muted-foreground' : ''}`}
                            >
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          )}
            </Tabs>
            </div>
          </div>

          {/* Property Information Modal */}
          <Dialog open={selectedInfoCard !== null} onOpenChange={(open) => !open && setSelectedInfoCard(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedInfoCard === 'utilities' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Zap className="h-6 w-6" />
                      Utilities & Services
                    </DialogTitle>
                    <DialogDescription>Complete utility setup and service information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    {/* Electric */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Electric</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p className="font-medium">{handoffData.utilities.electric.provider}</p>
                          </div>
                          {handoffData.utilities.electric.accountNumber && (
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="font-medium">{handoffData.utilities.electric.accountNumber}</p>
                            </div>
                          )}
                          {handoffData.utilities.electric.customerServicePhone && (
                            <div>
                              <p className="text-sm text-muted-foreground">Customer Service</p>
                              <p className="font-medium">{handoffData.utilities.electric.customerServicePhone}</p>
                            </div>
                          )}
                          {handoffData.utilities.electric.averageMonthlyCost && (
                            <div>
                              <p className="text-sm text-muted-foreground">Average Monthly Cost</p>
                              <p className="font-medium">${handoffData.utilities.electric.averageMonthlyCost}</p>
                            </div>
                          )}
                        </div>
                        {handoffData.utilities.electric.setupInstructions && (
                          <div>
                            <p className="text-sm text-muted-foreground">Setup Instructions</p>
                            <p className="text-sm">{handoffData.utilities.electric.setupInstructions}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Water */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Water & Sewer</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p className="font-medium">{handoffData.utilities.water.provider}</p>
                          </div>
                          {handoffData.utilities.water.accountNumber && (
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="font-medium">{handoffData.utilities.water.accountNumber}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Internet */}
                    {handoffData.utilities.internet && handoffData.utilities.internet.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Internet & Cable</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {handoffData.utilities.internet.map((service, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{service.provider}</p>
                                {service.phone && <p className="text-sm text-muted-foreground">{service.phone}</p>}
                                {service.website && (
                                  <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                                    {service.website}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Trash */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Trash & Recycling</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Collection Days</p>
                          <p className="font-medium">
                            Trash: {handoffData.utilities.trash.collectionDays.trash.join(', ')}
                          </p>
                          <p className="font-medium">
                            Recycling: {handoffData.utilities.trash.collectionDays.recycling.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bin Location</p>
                          <p className="font-medium">{handoffData.utilities.trash.binLocation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedInfoCard === 'access' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Key className="h-6 w-6" />
                      Access & Security
                    </DialogTitle>
                    <DialogDescription>Keys, codes, and security information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    {/* Keys */}
                    {handoffData.access.keys && handoffData.access.keys.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Keys</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.access.keys.map((key, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{key.label}</p>
                                {key.location && <p className="text-sm text-muted-foreground">Location: {key.location}</p>}
                                {key.notes && <p className="text-sm text-muted-foreground">{key.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Access Codes */}
                    {handoffData.access.codes && handoffData.access.codes.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Access Codes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.access.codes.map((code, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{code.type}</p>
                                <p className="text-lg font-mono">{code.code}</p>
                                {code.location && <p className="text-sm text-muted-foreground">Location: {code.location}</p>}
                                {code.instructions && <p className="text-sm text-muted-foreground">{code.instructions}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Alarm */}
                    {handoffData.access.alarm && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Alarm System</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {handoffData.access.alarm.provider && (
                            <div>
                              <p className="text-sm text-muted-foreground">Provider</p>
                              <p className="font-medium">{handoffData.access.alarm.provider}</p>
                            </div>
                          )}
                          {handoffData.access.alarm.code && (
                            <div>
                              <p className="text-sm text-muted-foreground">Code</p>
                              <p className="font-medium font-mono">{handoffData.access.alarm.code}</p>
                            </div>
                          )}
                          {handoffData.access.alarm.instructions && (
                            <div>
                              <p className="text-sm text-muted-foreground">Instructions</p>
                              <p className="text-sm">{handoffData.access.alarm.instructions}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </>
              )}

              {selectedInfoCard === 'maintenance' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Wrench className="h-6 w-6" />
                      Maintenance & Repairs
                    </DialogTitle>
                    <DialogDescription>How to request maintenance and important information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Request Method</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.requestMethod}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Response Times</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.responseTimes}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Responsibilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.responsibilities}</p>
                      </CardContent>
                    </Card>

                    {handoffData.maintenance.preferredContractors && handoffData.maintenance.preferredContractors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Preferred Contractors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.maintenance.preferredContractors.map((contractor, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{contractor.name}</p>
                                <p className="text-sm text-muted-foreground">{contractor.phone}</p>
                                {contractor.notes && <p className="text-sm text-muted-foreground">{contractor.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {handoffData.maintenance.preventiveMaintenanceSchedule && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Preventive Maintenance Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{handoffData.maintenance.preventiveMaintenanceSchedule}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Property Section Modal */}
          <Dialog open={selectedPropertySection !== null} onOpenChange={(open) => !open && setSelectedPropertySection(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedPropertySection === 'utilities' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Zap className="h-6 w-6" />
                      Utilities & Services
                    </DialogTitle>
                    <DialogDescription>Complete utility setup and service information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    {/* Electric */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Electric</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p className="font-medium">{handoffData.utilities.electric.provider}</p>
                          </div>
                          {handoffData.utilities.electric.accountNumber && (
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="font-medium">{handoffData.utilities.electric.accountNumber}</p>
                            </div>
                          )}
                          {handoffData.utilities.electric.customerServicePhone && (
                            <div>
                              <p className="text-sm text-muted-foreground">Customer Service</p>
                              <p className="font-medium">{handoffData.utilities.electric.customerServicePhone}</p>
                            </div>
                          )}
                          {handoffData.utilities.electric.averageMonthlyCost && (
                            <div>
                              <p className="text-sm text-muted-foreground">Average Monthly Cost</p>
                              <p className="font-medium">${handoffData.utilities.electric.averageMonthlyCost}</p>
                            </div>
                          )}
                        </div>
                        {handoffData.utilities.electric.setupInstructions && (
                          <div>
                            <p className="text-sm text-muted-foreground">Setup Instructions</p>
                            <p className="text-sm">{handoffData.utilities.electric.setupInstructions}</p>
                          </div>
                        )}
                        {handoffData.utilities.electric.includedInRent && (
                          <Badge variant="secondary">Included in Rent</Badge>
                        )}
                      </CardContent>
                    </Card>

                    {/* Gas */}
                    {handoffData.utilities.gas && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Gas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Provider</p>
                              <p className="font-medium">{handoffData.utilities.gas.provider}</p>
                            </div>
                            {handoffData.utilities.gas.accountNumber && (
                              <div>
                                <p className="text-sm text-muted-foreground">Account Number</p>
                                <p className="font-medium">{handoffData.utilities.gas.accountNumber}</p>
                              </div>
                            )}
                            {handoffData.utilities.gas.customerServicePhone && (
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{handoffData.utilities.gas.customerServicePhone}</p>
                              </div>
                            )}
                          </div>
                          {handoffData.utilities.gas.includedInRent && (
                            <Badge variant="secondary">Included in Rent</Badge>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Water */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Water & Sewer</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p className="font-medium">{handoffData.utilities.water.provider}</p>
                          </div>
                          {handoffData.utilities.water.accountNumber && (
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="font-medium">{handoffData.utilities.water.accountNumber}</p>
                            </div>
                          )}
                        </div>
                        {handoffData.utilities.water.includedInRent && (
                          <Badge variant="secondary">Included in Rent</Badge>
                        )}
                      </CardContent>
                    </Card>

                    {/* Internet */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Internet & Cable</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {handoffData.utilities.internet.map((service, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <p className="font-semibold">{service.provider}</p>
                              {service.phone && <p className="text-sm text-muted-foreground">{service.phone}</p>}
                              {service.website && (
                                <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                  Visit website <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                              {service.notes && <p className="text-sm text-muted-foreground mt-1">{service.notes}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Trash */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Trash & Recycling</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Collection Days</p>
                          <p className="font-medium">Trash: {handoffData.utilities.trash.collectionDays.trash.join(", ")}</p>
                          <p className="font-medium">Recycling: {handoffData.utilities.trash.collectionDays.recycling.join(", ")}</p>
                          {handoffData.utilities.trash.collectionDays.bulk.length > 0 && (
                            <p className="font-medium">Bulk: {handoffData.utilities.trash.collectionDays.bulk.join(", ")}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bin Location</p>
                          <p className="font-medium">{handoffData.utilities.trash.binLocation}</p>
                        </div>
                        {handoffData.utilities.trash.specialInstructions && (
                          <p className="text-sm"><strong>Instructions:</strong> {handoffData.utilities.trash.specialInstructions}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedPropertySection === 'access' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Key className="h-6 w-6" />
                      Property Access & Security
                    </DialogTitle>
                    <DialogDescription>Keys, codes, and security information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    {/* Keys */}
                    {handoffData.access.keys && handoffData.access.keys.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Keys</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.access.keys.map((key, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{key.label}</p>
                                {key.location && <p className="text-sm text-muted-foreground">Location: {key.location}</p>}
                                {key.notes && <p className="text-sm text-muted-foreground">{key.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Access Codes */}
                    {handoffData.access.codes && handoffData.access.codes.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Access Codes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.access.codes.map((code, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{code.type}</p>
                                <p className="text-lg font-mono">{code.code}</p>
                                {code.location && <p className="text-sm text-muted-foreground">Location: {code.location}</p>}
                                {code.instructions && <p className="text-sm text-muted-foreground">{code.instructions}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Alarm */}
                    {handoffData.access.alarm && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Alarm System</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {handoffData.access.alarm.provider && (
                            <div>
                              <p className="text-sm text-muted-foreground">Provider</p>
                              <p className="font-medium">{handoffData.access.alarm.provider}</p>
                            </div>
                          )}
                          {handoffData.access.alarm.code && (
                            <div>
                              <p className="text-sm text-muted-foreground">Code</p>
                              <p className="font-medium font-mono">{handoffData.access.alarm.code}</p>
                            </div>
                          )}
                          {handoffData.access.alarm.instructions && (
                            <div>
                              <p className="text-sm text-muted-foreground">Instructions</p>
                              <p className="text-sm">{handoffData.access.alarm.instructions}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </>
              )}

              {selectedPropertySection === 'mailbox' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Mail className="h-6 w-6" />
                      Mailbox & Packages
                    </DialogTitle>
                    <DialogDescription>Mailbox location and package delivery information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-6 space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Mailbox Number</p>
                          <p className="font-medium">{handoffData.mailbox.number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{handoffData.mailbox.location}</p>
                        </div>
                        {handoffData.mailbox.keyDetails && (
                          <div>
                            <p className="text-sm text-muted-foreground">Key Details</p>
                            <p className="font-medium">{handoffData.mailbox.keyDetails}</p>
                          </div>
                        )}
                        {handoffData.mailbox.packageDeliveryArea && (
                          <div>
                            <p className="text-sm text-muted-foreground">Package Delivery Area</p>
                            <p className="font-medium">{handoffData.mailbox.packageDeliveryArea}</p>
                          </div>
                        )}
                        {handoffData.mailbox.parcelLockerInstructions && (
                          <div>
                            <p className="text-sm text-muted-foreground">Parcel Locker Instructions</p>
                            <p className="font-medium">{handoffData.mailbox.parcelLockerInstructions}</p>
                          </div>
                        )}
                        {handoffData.mailbox.mailHoldProcedure && (
                          <div>
                            <p className="text-sm text-muted-foreground">Mail Hold Procedure</p>
                            <p className="font-medium">{handoffData.mailbox.mailHoldProcedure}</p>
                          </div>
                        )}
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <p className="text-sm font-medium">Remember to update your address with USPS</p>
                          <a href="https://www.usps.com/manage/change-of-address.htm" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1">
                            Change of Address Form <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedPropertySection === 'appliances' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Building className="h-6 w-6" />
                      Appliances & Systems
                    </DialogTitle>
                    <DialogDescription>Appliances and their details</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {handoffData.appliances.map((appliance, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{appliance.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {appliance.model && (
                              <div>
                                <p className="text-sm text-muted-foreground">Model</p>
                                <p className="font-medium">{appliance.model}</p>
                              </div>
                            )}
                            {appliance.location && (
                              <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">{appliance.location}</p>
                              </div>
                            )}
                            {appliance.manualLink && (
                              <a href={appliance.manualLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                View Manual <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            {appliance.instructions && (
                              <p className="text-sm">{appliance.instructions}</p>
                            )}
                            {appliance.details && Object.entries(appliance.details).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                <p className="font-medium">{value}</p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedPropertySection === 'maintenance' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Wrench className="h-6 w-6" />
                      Maintenance & Repairs
                    </DialogTitle>
                    <DialogDescription>How to request maintenance and important information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>How to Submit Requests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{handoffData.maintenance.requestMethod}</p>
                        <div className="mt-4 space-y-2">
                          {handoffData.maintenance.contacts.map((contact, index) => (
                            <div key={index}>
                              <p className="font-medium">{contact.name}</p>
                              {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                              {contact.email && <p className="text-sm text-muted-foreground">{contact.email}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Response Times</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.responseTimes}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Responsibilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{handoffData.maintenance.responsibilities}</p>
                      </CardContent>
                    </Card>

                    {handoffData.maintenance.preferredContractors && handoffData.maintenance.preferredContractors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Preferred Contractors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {handoffData.maintenance.preferredContractors.map((contractor, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <p className="font-medium">{contractor.name}</p>
                                <p className="text-sm text-muted-foreground">{contractor.phone}</p>
                                {contractor.notes && <p className="text-sm text-muted-foreground">{contractor.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {handoffData.maintenance.preventiveMaintenanceSchedule && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Preventive Maintenance Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{handoffData.maintenance.preventiveMaintenanceSchedule}</p>
                        </CardContent>
                      </Card>
                    )}

                    {handoffData.maintenance.filterChangeInfo && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Filter Change Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{handoffData.maintenance.filterChangeInfo}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </>
              )}

              {selectedPropertySection === 'policies' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <FileText className="h-6 w-6" />
                      House Rules & Policies
                    </DialogTitle>
                    <DialogDescription>Property rules and guidelines</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <p className="font-semibold">Smoking</p>
                          <p className="text-sm text-muted-foreground">{handoffData.policies.smoking}</p>
                        </div>
                        {handoffData.policies.pets && (
                          <div>
                            <p className="font-semibold">Pets</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.pets}</p>
                          </div>
                        )}
                        {handoffData.policies.quietHours && (
                          <div>
                            <p className="font-semibold">Quiet Hours</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.quietHours}</p>
                          </div>
                        )}
                        {handoffData.policies.guests && (
                          <div>
                            <p className="font-semibold">Guests</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.guests}</p>
                          </div>
                        )}
                        {handoffData.policies.modifications && (
                          <div>
                            <p className="font-semibold">Modifications</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.modifications}</p>
                          </div>
                        )}
                        {handoffData.policies.grilling && (
                          <div>
                            <p className="font-semibold">Grilling</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.grilling}</p>
                          </div>
                        )}
                        {handoffData.policies.poolRules && (
                          <div>
                            <p className="font-semibold">Pool Rules</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.poolRules}</p>
                          </div>
                        )}
                        {handoffData.policies.other && (
                          <div>
                            <p className="font-semibold">Other</p>
                            <p className="text-sm text-muted-foreground">{handoffData.policies.other}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedPropertySection === 'safety' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Shield className="h-6 w-6" />
                      Safety & Security
                    </DialogTitle>
                    <DialogDescription>Safety equipment and procedures</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        {handoffData.safety.fireExtinguisherLocations && handoffData.safety.fireExtinguisherLocations.length > 0 && (
                          <div>
                            <p className="font-semibold">Fire Extinguisher Locations</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.safety.fireExtinguisherLocations.map((loc, i) => (
                                <li key={i}>{loc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.safety.smokeDetectorLocations && handoffData.safety.smokeDetectorLocations.length > 0 && (
                          <div>
                            <p className="font-semibold">Smoke Detector Locations</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.safety.smokeDetectorLocations.map((loc, i) => (
                                <li key={i}>{loc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.safety.carbonMonoxideDetectorLocations && handoffData.safety.carbonMonoxideDetectorLocations.length > 0 && (
                          <div>
                            <p className="font-semibold">Carbon Monoxide Detector Locations</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.safety.carbonMonoxideDetectorLocations.map((loc, i) => (
                                <li key={i}>{loc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.safety.waterMainShutOff && (
                          <div>
                            <p className="font-semibold">Water Main Shut-Off</p>
                            <p className="text-sm text-muted-foreground">{handoffData.safety.waterMainShutOff}</p>
                          </div>
                        )}
                        {handoffData.safety.electricalPanelLocation && (
                          <div>
                            <p className="font-semibold">Electrical Panel</p>
                            <p className="text-sm text-muted-foreground">{handoffData.safety.electricalPanelLocation}</p>
                          </div>
                        )}
                        {handoffData.safety.gasShutOffLocation && (
                          <div>
                            <p className="font-semibold">Gas Shut-Off</p>
                            <p className="text-sm text-muted-foreground">{handoffData.safety.gasShutOffLocation}</p>
                          </div>
                        )}
                        {handoffData.safety.emergencyExits && handoffData.safety.emergencyExits.length > 0 && (
                          <div>
                            <p className="font-semibold">Emergency Exits</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.safety.emergencyExits.map((exit, i) => (
                                <li key={i}>{exit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.safety.evacuationRoutes && handoffData.safety.evacuationRoutes.length > 0 && (
                          <div>
                            <p className="font-semibold">Evacuation Routes</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.safety.evacuationRoutes.map((route, i) => (
                                <li key={i}>{route}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedPropertySection === 'parking' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Car className="h-6 w-6" />
                      Parking & Storage
                    </DialogTitle>
                    <DialogDescription>Parking spots and storage information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-6 space-y-3">
                        {handoffData.parking.assignedSpots && handoffData.parking.assignedSpots.length > 0 && (
                          <div>
                            <p className="font-semibold">Assigned Parking Spots</p>
                            <p className="text-sm text-muted-foreground">{handoffData.parking.assignedSpots.join(", ")}</p>
                          </div>
                        )}
                        {handoffData.parking.guestParking && (
                          <div>
                            <p className="font-semibold">Guest Parking</p>
                            <p className="text-sm text-muted-foreground">{handoffData.parking.guestParking}</p>
                          </div>
                        )}
                        {handoffData.parking.parkingPermits && (
                          <div>
                            <p className="font-semibold">Parking Permits</p>
                            <p className="text-sm text-muted-foreground">{handoffData.parking.parkingPermits}</p>
                          </div>
                        )}
                        {handoffData.parking.streetParkingRegulations && (
                          <div>
                            <p className="font-semibold">Street Parking Regulations</p>
                            <p className="text-sm text-muted-foreground">{handoffData.parking.streetParkingRegulations}</p>
                          </div>
                        )}
                        {handoffData.parking.storageUnitDetails && (
                          <div>
                            <p className="font-semibold">Storage Unit</p>
                            <p className="text-sm text-muted-foreground">{handoffData.parking.storageUnitDetails}</p>
                          </div>
                        )}
                        {handoffData.parking.bikeStorageArea && (
                          <div>
                            <p className="font-semibold">Bike Storage</p>
                            <p className="text-sm text-muted-foreground">{handoffData.parking.bikeStorageArea}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedPropertySection === 'documents' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <FileText className="h-6 w-6" />
                      Important Documents
                    </DialogTitle>
                    <DialogDescription>Lease, insurance, and other important documents</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {/* Document Management Header */}
                    <Card className="bg-gray-800 dark:bg-gray-900 border-gray-700">
                      <CardContent className="p-4 space-y-4">
                        {/* Tabs and View Toggle */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <Tabs value={documentTab} onValueChange={setDocumentTab} className="flex-1">
                            <TabsList className="bg-gray-900 dark:bg-black border border-gray-700 h-9">
                              <TabsTrigger 
                                value="all" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                All Documents
                              </TabsTrigger>
                              <TabsTrigger 
                                value="recent" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                Recent
                              </TabsTrigger>
                              <TabsTrigger 
                                value="shared" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                Shared
                              </TabsTrigger>
                              <TabsTrigger 
                                value="folders" 
                                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4"
                              >
                                Folders
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={documentViewMode === "grid" ? "default" : "ghost"}
                              size="icon"
                              onClick={() => setDocumentViewMode("grid")}
                              className="h-8 w-8 bg-gray-700 hover:bg-gray-600"
                            >
                              <Grid3x3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={documentViewMode === "list" ? "default" : "ghost"}
                              size="icon"
                              onClick={() => setDocumentViewMode("list")}
                              className="h-8 w-8 bg-gray-700 hover:bg-gray-600"
                            >
                              <List className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row gap-3">
                          <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search documents..."
                              value={documentSearch}
                              onChange={(e) => setDocumentSearch(e.target.value)}
                              className="pl-10 bg-gray-900 dark:bg-black border-gray-700 text-white placeholder:text-gray-500"
                            />
                          </div>
                          <Select value={documentPropertyFilter} onValueChange={setDocumentPropertyFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-900 dark:bg-black border-gray-700 text-white">
                              <SelectValue placeholder="All Properties" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="all">All Properties</SelectItem>
                              {properties.map((prop) => (
                                <SelectItem key={prop.id} value={prop.id}>
                                  {prop.title || prop.addressLine1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select value={documentCategoryFilter} onValueChange={setDocumentCategoryFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-900 dark:bg-black border-gray-700 text-white">
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="insurance">Insurance</SelectItem>
                              <SelectItem value="tax">Tax</SelectItem>
                              <SelectItem value="lease">Lease</SelectItem>
                              <SelectItem value="inspection">Inspection</SelectItem>
                              <SelectItem value="manual">Manual</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={documentFolderFilter} onValueChange={setDocumentFolderFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-900 dark:bg-black border-gray-700 text-white">
                              <SelectValue placeholder="All Folders" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="all">All Folders</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                              <SelectItem value="financial">Financial</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          {canEdit && (
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Document
                            </Button>
                          )}
                          <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Filtered Documents List */}
                    {(() => {
                      // Handle folders tab
                      if (documentTab === "folders") {
                        return (
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">Folders feature coming soon</p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      }

                      const filteredDocs = handoffData.documents.filter((doc) => {
                        const matchesSearch = doc.name.toLowerCase().includes(documentSearch.toLowerCase())
                        const matchesCategory = documentCategoryFilter === "all" || doc.type.toLowerCase() === documentCategoryFilter.toLowerCase()
                        const matchesProperty = documentPropertyFilter === "all" || documentPropertyFilter === selectedPropertyId
                        const matchesFolder = documentFolderFilter === "all"
                        
                        if (documentTab === "recent") {
                          const oneMonthAgo = new Date()
                          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
                          return matchesSearch && matchesCategory && matchesProperty && matchesFolder && doc.uploadDate && doc.uploadDate >= oneMonthAgo
                        }
                        if (documentTab === "shared") {
                          return matchesSearch && matchesCategory && matchesProperty && matchesFolder && ["1", "3"].includes(doc.id)
                        }
                        
                        return matchesSearch && matchesCategory && matchesProperty && matchesFolder
                      })

                      if (filteredDocs.length === 0) {
                        return (
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">No documents found</p>
                                {documentSearch && (
                                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      }

                      return (
                        <div className={cn(
                          documentViewMode === "grid" 
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                            : "space-y-4"
                        )}>
                          {filteredDocs.map((doc) => (
                            <Card key={doc.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 flex-shrink-0">
                                      <FileIcon className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-white mb-1 truncate">{doc.name}</h4>
                                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                        <span>{formatFileSize(doc.size)}</span>
                                        <span>•</span>
                                        <span>{formatDocumentDate(doc.uploadDate)}</span>
                                      </div>
                                      <div className="flex items-center gap-3 flex-wrap">
                                        <Badge 
                                          variant="outline" 
                                          className={cn("text-xs", getDocumentTypeColor(doc.type))}
                                        >
                                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                          <Building className="h-3 w-3" />
                                          <span className="truncate">{handoffData.propertyAddress}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">More options</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDownloadDocument(doc)}>
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShareDocument(doc)}>
                                          <Share2 className="h-4 w-4 mr-2" />
                                          Share
                                        </DropdownMenuItem>
                                        {canEdit && (
                                          <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                              onClick={() => handleDeleteDocument(doc.id)}
                                              className="text-red-400 focus:text-red-300"
                                            >
                                              <Trash2 className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </>
                                        )}
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                </>
              )}

              {selectedPropertySection === 'seasonal' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Calendar className="h-6 w-6" />
                      Seasonal Information
                    </DialogTitle>
                    <DialogDescription>Seasonal tips and reminders</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {handoffData.seasonalInfo.map((season, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="capitalize flex items-center gap-2">
                            {season.season === 'spring' && <Sun className="h-5 w-5 text-yellow-500" />}
                            {season.season === 'summer' && <Sun className="h-5 w-5 text-orange-500" />}
                            {season.season === 'fall' && <Leaf className="h-5 w-5 text-orange-600" />}
                            {season.season === 'winter' && <Snowflake className="h-5 w-5 text-blue-400" />}
                            {season.season.charAt(0).toUpperCase() + season.season.slice(1)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {season.tips.map((tip, tipIndex) => (
                              <li key={tipIndex}>{tip}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {selectedPropertySection === 'faqs' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <HelpCircle className="h-6 w-6" />
                      Frequently Asked Questions
                    </DialogTitle>
                    <DialogDescription>Common questions and answers</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Accordion type="single" collapsible>
                      {handoffData.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </>
              )}

              {selectedPropertySection === 'notes' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Lightbulb className="h-6 w-6" />
                      Owner's Personal Tips & Notes
                    </DialogTitle>
                    <DialogDescription>Helpful tips from the owner</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        {isEditMode && (isOwner || hasFullAccess) ? (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="owner-notes-modal" className="text-sm font-medium mb-2 block">
                                Add or update notes for tenants
                              </Label>
                              <Textarea
                                id="owner-notes-modal"
                                value={ownerNotes}
                                onChange={(e) => setOwnerNotes(e.target.value)}
                                placeholder="Add helpful tips, neighborhood secrets, restaurant recommendations, or any other information you'd like to share with tenants..."
                                rows={8}
                                className="min-h-[200px]"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                These notes will be visible to tenants and help them settle into their new home.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {handoffData.ownerNotes ? (
                              <p className="whitespace-pre-line">{handoffData.ownerNotes}</p>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                {isOwner
                                  ? "No notes added yet. Click 'Edit & Add Notes' to add helpful information for tenants."
                                  : "No owner notes available."}
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Neighborhood Section Modal */}
          <Dialog open={selectedNeighborhoodSection !== null} onOpenChange={(open) => !open && setSelectedNeighborhoodSection(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedNeighborhoodSection === 'grocery' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <ShoppingCart className="h-6 w-6" />
                      Grocery & Shopping
                    </DialogTitle>
                    <DialogDescription>Nearby stores and markets</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {handoffData.neighborhood.grocery.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <p className="font-semibold">{place.name}</p>
                            {place.address && <p className="text-sm text-muted-foreground">{place.address}</p>}
                            {place.distance && <p className="text-sm text-muted-foreground">{place.distance} away</p>}
                            {place.phone && <p className="text-sm text-muted-foreground">{place.phone}</p>}
                            {place.notes && <p className="text-sm text-muted-foreground mt-2">{place.notes}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'dining' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <UtensilsCrossed className="h-6 w-6" />
                      Dining
                    </DialogTitle>
                    <DialogDescription>Restaurants and cafes</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {handoffData.neighborhood.dining.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <p className="font-semibold">{place.name}</p>
                            {place.address && <p className="text-sm text-muted-foreground">{place.address}</p>}
                            {place.phone && <p className="text-sm text-muted-foreground">{place.phone}</p>}
                            {place.distance && <p className="text-sm text-muted-foreground">{place.distance} away</p>}
                            {place.notes && <p className="text-sm text-muted-foreground mt-2">{place.notes}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'services' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Building className="h-6 w-6" />
                      Services
                    </DialogTitle>
                    <DialogDescription>Local service providers</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {handoffData.neighborhood.services.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <p className="font-semibold">{place.name}</p>
                            {place.address && <p className="text-sm text-muted-foreground">{place.address}</p>}
                            {place.phone && <p className="text-sm text-muted-foreground">{place.phone}</p>}
                            {place.distance && <p className="text-sm text-muted-foreground">{place.distance} away</p>}
                            {place.notes && <p className="text-sm text-muted-foreground mt-2">{place.notes}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'healthcare' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Heart className="h-6 w-6" />
                      Healthcare
                    </DialogTitle>
                    <DialogDescription>Hospitals and clinics</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {handoffData.neighborhood.healthcare.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <p className="font-semibold">{place.name}</p>
                            {place.address && <p className="text-sm text-muted-foreground">{place.address}</p>}
                            {place.phone && <p className="text-sm text-muted-foreground">{place.phone}</p>}
                            {place.distance && <p className="text-sm text-muted-foreground">{place.distance} away</p>}
                            {place.notes && <p className="text-sm text-muted-foreground mt-2">{place.notes}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'recreation' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Dumbbell className="h-6 w-6" />
                      Recreation
                    </DialogTitle>
                    <DialogDescription>Parks and activities</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {handoffData.neighborhood.recreation.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <p className="font-semibold">{place.name}</p>
                            {place.address && <p className="text-sm text-muted-foreground">{place.address}</p>}
                            {place.distance && <p className="text-sm text-muted-foreground">{place.distance} away</p>}
                            {place.phone && <p className="text-sm text-muted-foreground">{place.phone}</p>}
                            {place.notes && <p className="text-sm text-muted-foreground mt-2">{place.notes}</p>}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'schools' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <GraduationCap className="h-6 w-6" />
                      Schools
                    </DialogTitle>
                    <DialogDescription>Nearby schools and education</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {handoffData.neighborhood.schools.map((school, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold">{school.name}</p>
                              <Badge variant="outline" className="mt-1 capitalize">{school.type}</Badge>
                            </div>
                          </div>
                          {school.address && <p className="text-sm text-muted-foreground mt-2">{school.address}</p>}
                          {school.phone && <p className="text-sm text-muted-foreground">{school.phone}</p>}
                          {school.website && (
                            <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-2">
                              Visit website <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {school.busStop && <p className="text-sm text-muted-foreground mt-2">Bus stop: {school.busStop}</p>}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'transportation' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Bus className="h-6 w-6" />
                      Transportation
                    </DialogTitle>
                    <DialogDescription>Public transit and routes</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        {handoffData.neighborhood.transportation.publicTransit && (
                          <div>
                            <p className="font-semibold">Public Transit</p>
                            <p className="text-sm text-muted-foreground">{handoffData.neighborhood.transportation.publicTransit}</p>
                          </div>
                        )}
                        {handoffData.neighborhood.transportation.busStops && handoffData.neighborhood.transportation.busStops.length > 0 && (
                          <div>
                            <p className="font-semibold">Bus Stops</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.neighborhood.transportation.busStops.map((stop, i) => (
                                <li key={i}>{stop}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.neighborhood.transportation.trainStations && handoffData.neighborhood.transportation.trainStations.length > 0 && (
                          <div>
                            <p className="font-semibold">Train Stations</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.neighborhood.transportation.trainStations.map((station, i) => (
                                <li key={i}>{station}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.neighborhood.transportation.rideShareSpots && handoffData.neighborhood.transportation.rideShareSpots.length > 0 && (
                          <div>
                            <p className="font-semibold">Ride Share Spots</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {handoffData.neighborhood.transportation.rideShareSpots.map((spot, i) => (
                                <li key={i}>{spot}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {handoffData.neighborhood.transportation.bikeLanes && (
                          <div>
                            <p className="font-semibold">Bike Lanes</p>
                            <p className="text-sm text-muted-foreground">{handoffData.neighborhood.transportation.bikeLanes}</p>
                          </div>
                        )}
                        {handoffData.neighborhood.transportation.airportDistance && (
                          <div>
                            <p className="font-semibold">Airport</p>
                            <p className="text-sm text-muted-foreground">{handoffData.neighborhood.transportation.airportDistance} away</p>
                            {handoffData.neighborhood.transportation.airportDirections && (
                              <p className="text-sm text-muted-foreground">{handoffData.neighborhood.transportation.airportDirections}</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {selectedNeighborhoodSection === 'local-services' && handoffData && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Calendar className="h-6 w-6" />
                      Local Services & Important Info
                    </DialogTitle>
                    <DialogDescription>Community services and schedules</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {handoffData.localServices.map((service, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <p className="font-semibold">{service.name}</p>
                          {service.schedule && <p className="text-sm text-muted-foreground">Schedule: {service.schedule}</p>}
                          {service.contact && <p className="text-sm text-muted-foreground">Contact: {service.contact}</p>}
                          {service.notes && <p className="text-sm text-muted-foreground mt-2">{service.notes}</p>}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Celebration Modal for 100% Completion */}
          <Dialog open={showCelebrationModal} onOpenChange={setShowCelebrationModal}>
            <DialogContent className="max-w-md text-center">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
                    </div>
                    <PartyPopper className="h-20 w-20 text-orange-500 relative z-10 animate-bounce" />
                  </div>
                </div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                  Congratulations! 🎉
                </DialogTitle>
                <DialogDescription className="text-lg mt-4">
                  You've completed all {handoffData?.moveInChecklist.length || 0} move-in checklist tasks!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-semibold">100% Complete</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your property manager has been notified of your completion. Great job getting everything set up!
                </p>
                <Button 
                  onClick={() => setShowCelebrationModal(false)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                >
                  Awesome!
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </PortalSidebar>
      )
    }


import { DocumentsPage, type Document } from "@/components/shared/documents-page"

// Mock documents data matching the image
const DOCUMENTS: Document[] = [
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
  return (
    <DocumentsPage
      role="owner"
      documents={DOCUMENTS}
      folders={FOLDERS}
      showPropertyFilter={true}
      showUpload={true}
      showDownload={true}
      showDelete={true}
      showShare={true}
      showFolders={true}
    />
  )
}

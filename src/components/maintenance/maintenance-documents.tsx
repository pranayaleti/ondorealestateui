import { DocumentsPage } from "@/components/shared/documents-page"

export default function MaintenanceDocuments() {
  return (
    <DocumentsPage
      role="maintenance"
      showPropertyFilter={true}
      showUpload={false}
      showDownload={true}
      showDelete={false}
      showShare={false}
      showFolders={false}
      customCategories={["maintenance", "inspection", "receipt"]}
    />
  )
}


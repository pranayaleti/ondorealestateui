import { DocumentsPage } from "@/components/shared/documents-page"

export default function SuperAdminDocuments() {
  return (
    <DocumentsPage
      role="super_admin"
      showPropertyFilter={true}
      showUpload={true}
      showDownload={true}
      showDelete={true}
      showShare={true}
      showFolders={true}
    />
  )
}


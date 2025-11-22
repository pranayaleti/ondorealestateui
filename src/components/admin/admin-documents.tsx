import { DocumentsPage } from "@/components/shared/documents-page"

export default function AdminDocuments() {
  return (
    <DocumentsPage
      role="admin"
      showPropertyFilter={true}
      showUpload={true}
      showDownload={true}
      showDelete={true}
      showShare={true}
      showFolders={true}
    />
  )
}


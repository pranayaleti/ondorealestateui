import { DocumentsPage } from "@/components/shared/documents-page"

export default function ManagerDocuments() {
  return (
    <DocumentsPage
      role="manager"
      showPropertyFilter={true}
      showUpload={true}
      showDownload={true}
      showDelete={true}
      showShare={true}
      showFolders={true}
    />
  )
}


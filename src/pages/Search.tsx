import { Routes, Route } from "react-router-dom"
import { TenantScreeningSection } from "@/components/tenant-screening/TenantScreeningSection"

function SearchHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Search</h1>
      <p className="text-muted-foreground">Advanced property search features coming soon...</p>
      <div className="mt-8">
        <TenantScreeningSection
          ctaHref="/properties"
          ctaLabel="Start screening"
          description="As soon as leads arrive, run screening flows that sync back to your CRM."
          title="Screen leads the moment they apply"
        />
      </div>
    </div>
  )
}

export default function Search() {
  return (
    <Routes>
      <Route path="/" element={<SearchHome />} />
      <Route path="/*" element={<SearchHome />} />
    </Routes>
  )
}

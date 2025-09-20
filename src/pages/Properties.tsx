import { Routes, Route } from "react-router-dom"

function PropertiesHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <p className="text-muted-foreground">Property listings and management features coming soon...</p>
    </div>
  )
}

export default function Properties() {
  return (
    <Routes>
      <Route path="/" element={<PropertiesHome />} />
      <Route path="/*" element={<PropertiesHome />} />
    </Routes>
  )
}

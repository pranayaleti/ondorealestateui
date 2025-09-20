import { Suspense } from "react"
import LandingPage from "@/components/landing-page"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    </main>
  )
}

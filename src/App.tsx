import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProtectedRoute from '@/components/ProtectedRoute'
import Loading from '@/components/loading'

// Lazy load page components for code splitting
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const FAQ = lazy(() => import('@/pages/FAQ'))
const Login = lazy(() => import('@/pages/Login'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const Verify = lazy(() => import('@/pages/Verify'))
const Signup = lazy(() => import('@/pages/Signup'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Properties = lazy(() => import('@/pages/Properties'))
const Search = lazy(() => import('@/pages/Search'))
const Owner = lazy(() => import('@/pages/Owner'))
const Tenant = lazy(() => import('@/pages/Tenant'))
const PageNotFound = lazy(() => import('@/pages/PageNotFound'))

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/verify'] // Hide header on all auth pages
  const hideFooterRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/verify'] // Hide footer on all auth pages

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          {!hideHeaderRoutes.includes(location.pathname) && <Header />}
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup/:token" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify" element={<Verify />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard/*" element={
                  <ProtectedRoute allowedRoles={["manager"]}>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/owner/*" element={
                  <ProtectedRoute allowedRoles={["owner"]}>
                    <Owner />
                  </ProtectedRoute>
                } />
                <Route path="/tenant/*" element={
                  <ProtectedRoute allowedRoles={["tenant"]}>
                    <Tenant />
                  </ProtectedRoute>
                } />
                
                {/* Semi-protected routes (available to logged-in users) */}
                <Route path="/properties/*" element={
                  <ProtectedRoute>
                    <Properties />
                  </ProtectedRoute>
                } />
                <Route path="/search/*" element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                } />
                
                {/* 404 Page */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </main>
          {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

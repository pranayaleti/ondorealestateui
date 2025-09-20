import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import Header from '@/components/header'
import ProtectedRoute from '@/components/ProtectedRoute'

// Import page components
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Login from '@/pages/Login'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Verify from '@/pages/Verify'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import Properties from '@/pages/Properties'
import Search from '@/pages/Search'
import Owner from '@/pages/Owner'
import Tenant from '@/pages/Tenant'
import PageNotFound from '@/pages/PageNotFound'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/verify'] // Hide header on all auth pages

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          {!hideHeaderRoutes.includes(location.pathname) && <Header />}
          <main className="flex-1">
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
          </main>
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

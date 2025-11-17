import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, Loader2, ArrowRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        // The auth context will handle redirection based on user role
        toast({
          title: "Login successful",
          description: "Welcome back to Ondo Real Estate!",
          duration: 1000, // 3 seconds for success messages
        })
      } else {
        toast({
          title: "Login failed",
          description: result.message || "Invalid email or password. Please try again.",
          variant: "destructive",
          duration: 6000, // 6 seconds for error messages (longer to read)
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 6000, // 6 seconds for error messages
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFillCredentials = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Ondo Real Estate Logo and Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6">
            <Logo size="xl" variant="centered" showText={true} linkTo="/" />
          </div>
          <h1 className="text-2xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            Sign in
          </h1>
        </div>

        {/* Test Credentials */}
        <div className="mb-6 p-5 bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 rounded-xl">
          <h3 className="text-lg font-bold text-orange-500 dark:text-orange-400 mb-1">Test Credentials</h3>
          <p className="text-gray-400 dark:text-gray-300 text-sm mb-4">Use these credentials to sign in for testing purposes</p>
          
          {/* Super Admin Account */}
          <div className="mb-4 pb-4 border-b border-gray-700 dark:border-gray-600 last:border-b-0 last:mb-0 last:pb-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-semibold text-gray-200 dark:text-gray-100">Super Admin Account</h4>
              <button
                type="button"
                onClick={() => handleFillCredentials('pharikrishnaeee@gmail.com', 'hari1234')}
                className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 text-sm font-medium transition-colors"
              >
                Fill
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 dark:text-gray-300">Email:</span>
                <span className="text-gray-200 dark:text-gray-100 font-medium">pharikrishnaeee@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 dark:text-gray-300">Password:</span>
                <span className="text-gray-200 dark:text-gray-100 font-medium">hari1234</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 dark:text-gray-300">Role:</span>
                <span className="text-gray-200 dark:text-gray-100 font-medium">Super Administrator</span>
              </div>
            </div>
          </div>

          {/* Note about other roles */}
          <div className="text-xs text-gray-500 dark:text-gray-400 italic">
            <p>Note: Manager, Owner, and Tenant accounts can be created through the invitation system.</p>
          </div>
        </div>

        {/* Single Login Form */}
        <Card className="border-none shadow-lg w-full max-w-md">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Company Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Submit
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link to="/forgot-password" className="text-orange-600 hover:underline font-medium">
              Forgot your password?
            </Link>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{" "}
            <Link to="/contact" className="text-orange-600 hover:underline font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, EyeIcon, EyeOffIcon, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { authApi } from "@/lib/api"
import { useApi } from "@/hooks/useApi"
import Loading from "@/components/loading"
import { Logo } from "@/components/logo"

export default function Signup() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    profilePicture: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // API hooks
  const { data: invitation, loading: loadingInvitation, error: invitationError, execute: fetchInvitation } = useApi(authApi.getInvitation)
  const { loading: signingUp, execute: signup } = useApi(authApi.signup)

  useEffect(() => {
    if (token) {
      fetchInvitation(token)
    }
  }, [token, fetchInvitation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      toast({
        title: "Invalid invitation",
        description: "No invitation token found.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await signup({
        token,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        profilePicture: formData.profilePicture || undefined,
        password: formData.password,
      })

      setIsSuccess(true)
      toast({
        title: "Account created successfully!",
        description: "Welcome to Ondo Real Estate. You're now logged in.",
      })

      // Auto-login after successful signup
      setTimeout(() => {
        const redirectPath = response.user.role === "manager" ? "/dashboard" : 
                           response.user.role === "owner" ? "/owner" : "/tenant"
        navigate(redirectPath)
      }, 2000)

    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup.",
        variant: "destructive",
      })
    }
  }

  if (loadingInvitation) {
    return <Loading />
  }

  if (invitationError || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          {/* Ondo Real Estate Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6">
              <Logo size="xl" variant="centered" showText={true} linkTo="/" />
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              
              <h1 className="text-2xl font-medium mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                Invalid Invitation
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This invitation link is invalid or has expired. Please contact your administrator for a new invitation.
              </p>
              
              <Link to="/login">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2">
                  Back to Login
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          {/* Ondo Real Estate Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6">
              <Logo size="xl" variant="centered" showText={true} linkTo="/" />
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-2xl font-medium mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                Welcome to Ondo Real Estate!
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your account has been created successfully. You're being redirected to your dashboard...
              </p>
              
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
            Complete Your Registration
          </h1>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Email:</strong> {invitation.email}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Role:</strong> {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="rounded-xl border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="rounded-xl border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-700 dark:text-gray-300">Mobile Number (Optional)</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">Address (Optional)</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St, City, State 12345"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture" className="text-gray-700 dark:text-gray-300">Profile Picture URL (Optional)</Label>
                <Input
                  id="profilePicture"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  value={formData.profilePicture}
                  onChange={(e) => setFormData(prev => ({ ...prev, profilePicture: e.target.value }))}
                  className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={signingUp}
                className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {signingUp ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 dark:text-orange-400 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

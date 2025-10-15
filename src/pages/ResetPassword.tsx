import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, EyeIcon, EyeOffIcon, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [tokenError, setTokenError] = useState("")
  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setTokenError("No reset token provided")
      return
    }

    // Verify the token with the backend
    const verifyToken = async () => {
      try {
        const response = await fetch(`https://ondorealestateserver.onrender.com/api/password/verify-reset-token/${token}`)
        const data = await response.json()

        if (response.ok && data.valid) {
          setTokenValid(true)
        } else {
          setTokenValid(false)
          setTokenError(data.message || "Invalid or expired reset token")
        }
      } catch (error) {
        console.error("Token verification error:", error)
        setTokenValid(false)
        setTokenError("Failed to verify reset token")
      }
    }

    verifyToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a new password.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      })
      return
    }

    if (!token || tokenValid !== true) {
      toast({
        title: "Invalid token",
        description: "The reset token is invalid or expired.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://ondorealestateserver.onrender.com/api/password/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Password updated",
          description: "Your password has been successfully reset.",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to reset password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Reset password error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show error if token is invalid
  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          {/* OnDo Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <span className="text-6xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                OnDo
              </span>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              
              <h1 className="text-2xl font-medium mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                Invalid Reset Link
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {tokenError || "The password reset link is invalid or has expired."}
              </p>
              
              <button 
                onClick={() => navigate("/forgot-password")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                Request New Reset Link
                <ArrowRight className="h-5 w-5" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show loading while verifying token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          {/* OnDo Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <span className="text-6xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                OnDo
              </span>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <h1 className="text-2xl font-medium mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                Verifying Reset Link
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your reset link...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          {/* OnDo Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <span className="text-6xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                OnDo
              </span>
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
                Password Reset Successful
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
              
              <button 
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                Continue to Login
                <ArrowRight className="h-5 w-5" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* OnDo Logo and Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <span className="text-6xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
              OnDo
            </span>
          </div>
          <h1 className="text-2xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            Reset Password
          </h1>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="pt-6">
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Enter your new password below. Make sure it's strong and secure.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 pr-10"
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
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 pr-10"
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
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Update Password
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link to="/login" className="text-orange-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

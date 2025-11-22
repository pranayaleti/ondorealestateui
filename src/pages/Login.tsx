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
import { useValidatedForm } from "@/hooks/useValidatedForm"
import type { FormValidationSchema } from "@/utils/validation.utils"
import { sanitize, validators } from "@/utils/validation.utils"
import { ERROR_MESSAGES, REGEX_PATTERNS } from "@/constants/regex.constants"

export default function LoginPage() {
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validationSchema: FormValidationSchema<{ email: string; password: string }> = {
    email: {
      required: true,
      formatter: sanitize.trim,
      rules: [
        {
          validator: validators.email,
          message: ERROR_MESSAGES.EMAIL,
        },
      ],
      maxLength: 120,
    },
    password: {
      required: true,
      formatter: sanitize.trim,
      rules: [
        {
          regex: REGEX_PATTERNS.PASSWORD_WEAK,
          message: ERROR_MESSAGES.PASSWORD_WEAK,
        },
      ],
      maxLength: 128,
    },
  }

  const { values, errors, touched, handleChange, handleBlur, validateForm, setValues } = useValidatedForm({
    initialValues: {
      email: "",
      password: "",
    },
    schema: validationSchema,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = validateForm()
    if (!isValid) {
      toast({
        title: "Check the highlighted fields",
        description: "Please resolve the validation errors before submitting.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)

    try {
      const sanitizedEmail = sanitize.trim(values.email).toLowerCase()
      const result = await login(sanitizedEmail, values.password)

      if (result.success) {
        // The auth context will handle redirection based on user role
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
    setValues({ email: testEmail, password: testPassword })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Ondo Real Estate Logo and Branding */}
        <div className="flex flex-col items-center mb-4 sm:mb-8">
          <div className="mb-3 sm:mb-6">
            <Logo size="xl" variant="centered" showText={true} linkTo="/" />
          </div>
          <h1 className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            Sign in
          </h1>
        </div>

        {/* Test Credentials */}
        <div className="mb-4 sm:mb-6 w-full">
          <h3 className="text-base sm:text-lg font-bold text-orange-500 dark:text-orange-400 mb-1 text-center">Test Credentials</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 text-center px-2">Use these credentials to sign in for testing purposes</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 w-full">
            {/* Super Admin Account */}
            <Card 
              className="bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              onClick={() => handleFillCredentials('pharikrishnaeee@gmail.com', 'hari1234')}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-100">Super Admin</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Email:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium break-all leading-tight sm:leading-normal">pharikrishnaeee@gmail.com</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Password:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">hari1234</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 dark:text-gray-300">Role:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Super Admin</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Account */}
            <Card 
              className="bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              onClick={() => handleFillCredentials('pharikrishnaeee@gmail.com', 'hari1234')}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-100">Admin</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Email:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium break-all leading-tight sm:leading-normal">pharikrishnaeee@gmail.com</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Password:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">hari1234</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 dark:text-gray-300">Role:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Admin</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manager Account */}
            <Card 
              className="bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              onClick={() => handleFillCredentials('manager@ondorealestate.com', 'Test@123')}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-100">Manager</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Email:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium break-all leading-tight sm:leading-normal">manager@ondorealestate.com</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Password:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Test@123</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 dark:text-gray-300">Role:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Manager</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Account */}
            <Card 
              className="bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              onClick={() => handleFillCredentials('mail2pranayreddy@gmail.com', 'Test@123')}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-100">Owner</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Email:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium break-all leading-tight sm:leading-normal">mail2pranayreddy@gmail.com</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Password:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Test@123</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 dark:text-gray-300">Role:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Owner</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenant Account */}
            <Card 
              className="bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              onClick={() => handleFillCredentials('pranayreddyui@gmail.com', 'Test@123')}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-100">Tenant</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Email:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium break-all leading-tight sm:leading-normal">pranayreddyui@gmail.com</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Password:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Test@123</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 dark:text-gray-300">Role:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Tenant</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Account */}
            <Card 
              className="bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700 dark:border-gray-600 cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              onClick={() => handleFillCredentials('maintenance@ondorealestate.com', 'Test@123')}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-100">Maintenance</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Email:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium break-all leading-tight sm:leading-normal">maintenance@ondorealestate.com</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-gray-400 dark:text-gray-300">Password:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Test@123</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 dark:text-gray-300">Role:</span>
                    <span className="text-gray-200 dark:text-gray-100 font-medium">Maintenance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Note about other roles */}
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center px-2">
            <p>Note: Manager, Owner, and Tenant accounts can be created through the invitation system.</p>
          </div>
        </div>

        {/* Single Login Form */}
        <Card className="border-none shadow-lg w-full max-w-md mx-auto">
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Company Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={values.email}
                  maxLength={120}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  aria-invalid={touched.email && !!errors.email}
                  className={`rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                    touched.email && errors.email ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {touched.email && errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={values.password}
                    maxLength={128}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    aria-invalid={touched.password && !!errors.password}
                    className={`rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      touched.password && errors.password ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
                {touched.password && errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-3 sm:py-4 rounded-2xl text-lg sm:text-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm sm:text-base">Submit</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 sm:mt-6 text-center space-y-2 sm:space-y-3 px-2">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <Link to="/forgot-password" className="text-orange-600 hover:underline font-medium">
              Forgot your password?
            </Link>
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
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

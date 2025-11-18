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
import { useValidatedForm } from "@/hooks/useValidatedForm"
import type { FormValidationSchema } from "@/utils/validation.utils"
import { formatters, sanitize, validators } from "@/utils/validation.utils"
import { ERROR_MESSAGES, REGEX_PATTERNS, validationPresets } from "@/constants"
import { AddressForm, type AddressFormValues } from "@/components/forms/address-form"
import { parseAddressString, formatAddressFields } from "@/utils/address"

export default function Signup() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const schema: FormValidationSchema<{
    firstName: string
    lastName: string
    phone: string
    address: string
    profilePicture: string
    password: string
    confirmPassword: string
  }> = {
    firstName: validationPresets.firstName,
    lastName: validationPresets.lastName,
    phone: {
      formatter: formatters.phone,
      rules: [
        {
          validator: (value) => !value || validators.phone(value),
          message: ERROR_MESSAGES.PHONE,
        },
      ],
      maxLength: 14,
    },
    address: {
      formatter: sanitize.trim,
      rules: [
        {
          regex: REGEX_PATTERNS.STREET_ADDRESS,
          message: ERROR_MESSAGES.INVALID_FORMAT,
        },
      ],
      maxLength: 120,
    },
    profilePicture: {
      formatter: sanitize.trim,
      rules: [
        {
          validator: (value) => !value || REGEX_PATTERNS.URL_STRICT.test(value),
          message: ERROR_MESSAGES.INVALID_FORMAT,
        },
      ],
      maxLength: 2048,
    },
    password: validationPresets.passwordStrong,
    confirmPassword: {
      required: true,
      formatter: sanitize.trim,
      rules: [
        {
          regex: REGEX_PATTERNS.PASSWORD_STRONG,
          message: ERROR_MESSAGES.PASSWORD_STRONG,
        },
        {
          validator: (value, values) => value === values?.password,
          message: "Passwords must match",
        },
      ],
      maxLength: 128,
    },
  }

  const { values, errors, touched, handleChange, handleBlur, validateForm, setFieldValue } = useValidatedForm({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      profilePicture: "",
      password: "",
      confirmPassword: "",
    },
    schema,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [addressValue, setAddressValue] = useState<AddressFormValues>(() => {
    const parsed = parseAddressString("")
    return {
      addressType: "home",
      addressLine1: parsed.line1,
      addressLine2: parsed.line2,
      city: parsed.city,
      state: parsed.state,
      postalCode: parsed.postalCode,
    }
  })
  const updateFormattedAddress = (nextValue: AddressFormValues) => {
    const formatted = formatAddressFields({
      line1: nextValue.addressLine1,
      line2: nextValue.addressLine2,
      city: nextValue.city,
      state: nextValue.state,
      postalCode: nextValue.postalCode,
    })
    setFieldValue("address", formatted)
    return formatted
  }

  const handleAddressFormChange = (nextValue: AddressFormValues) => {
    setAddressValue(nextValue)
    updateFormattedAddress(nextValue)
  }

  const handleAddressBlur = () => {
    const formatted = updateFormattedAddress(addressValue)
    handleBlur("address")({
      target: { value: formatted },
    } as any)
  }

  useEffect(() => {
    if (!values.address) {
      const parsed = parseAddressString("")
      setAddressValue({
        addressType: "home",
        addressLine1: parsed.line1,
        addressLine2: parsed.line2,
        city: parsed.city,
        state: parsed.state,
        postalCode: parsed.postalCode,
      })
    }
  }, [values.address])


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

    const isValid = validateForm()
    if (!isValid) {
      toast({
        title: "Check the highlighted fields",
        description: "Please resolve the validation errors before continuing.",
        variant: "destructive",
      })
      return
    }

    const normalizedPhone = values.phone ? values.phone.replace(/\D/g, "") : undefined

    try {
      const response = await signup({
        token,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: normalizedPhone || undefined,
        address: values.address || undefined,
        profilePicture: values.profilePicture || undefined,
        password: values.password,
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
                    value={values.firstName}
                    maxLength={50}
                    onChange={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    aria-invalid={touched.firstName && !!errors.firstName}
                    className={`rounded-xl border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 ${
                      touched.firstName && errors.firstName ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  {touched.firstName && errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={values.lastName}
                    maxLength={50}
                    onChange={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    aria-invalid={touched.lastName && !!errors.lastName}
                    className={`rounded-xl border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 ${
                      touched.lastName && errors.lastName ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  {touched.lastName && errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-700 dark:text-gray-300">Mobile Number (Optional)</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={values.phone}
                  maxLength={14}
                  onChange={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  aria-invalid={touched.phone && !!errors.phone}
                  className={`rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                    touched.phone && errors.phone ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {touched.phone && errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Address (Optional)</Label>
                <AddressForm
                  value={addressValue}
                  onChange={handleAddressFormChange}
                  onFieldBlur={handleAddressBlur}
                  hideTypeToggle
                  showRequiredIndicator={false}
                  idPrefix="signup"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Helps personalize your portal experience.</p>
                {touched.address && errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture" className="text-gray-700 dark:text-gray-300">Profile Picture URL (Optional)</Label>
                <Input
                  id="profilePicture"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  value={values.profilePicture}
                  maxLength={2048}
                  onChange={handleChange("profilePicture")}
                  onBlur={handleBlur("profilePicture")}
                  aria-invalid={touched.profilePicture && !!errors.profilePicture}
                  className={`rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                    touched.profilePicture && errors.profilePicture ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {touched.profilePicture && errors.profilePicture && <p className="text-sm text-red-600">{errors.profilePicture}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={values.password}
                    maxLength={128}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    aria-invalid={touched.password && !!errors.password}
                    className={`rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10 ${
                      touched.password && errors.password ? "border-red-500 focus:ring-red-500" : ""
                    }`}
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
                <p className="text-xs text-gray-500 dark:text-gray-400">Must include uppercase, lowercase, number, and special character.</p>
                {touched.password && errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    maxLength={128}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    aria-invalid={touched.confirmPassword && !!errors.confirmPassword}
                    className={`rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10 ${
                      touched.confirmPassword && errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""
                    }`}
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
                {touched.confirmPassword && errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
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

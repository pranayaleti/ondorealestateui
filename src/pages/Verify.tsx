import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
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
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-medium mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
              Email Verified
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Your email has been successfully verified. You can now access your OnDo account and start managing your properties.
            </p>
            
            <Link to="/login">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-800 hover:from-orange-600 hover:to-red-900 text-white font-medium py-4 rounded-2xl text-xl transition-all duration-200 flex items-center justify-center gap-2">
                Access OnDo
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help getting started?{" "}
                <Link to="/contact" className="text-orange-600 hover:underline font-medium">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

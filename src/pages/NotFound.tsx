import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileQuestion className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
          <CardDescription>We couldn't find the page you were looking for.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-center">
          <p>The page you requested may have been moved or deleted.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

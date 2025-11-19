import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Shield, Smartphone } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TwoFactorAuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentValue: boolean
  onConfirm: (enabled: boolean, method?: string, code?: string) => void
}

export function TwoFactorAuthDialog({
  open,
  onOpenChange,
  currentValue,
  onConfirm,
}: TwoFactorAuthDialogProps) {
  const [method, setMethod] = useState<"sms" | "app">("app")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleConfirm = async () => {
    if (currentValue) {
      // Disabling 2FA
      setIsProcessing(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
        onConfirm(false)
        toast({
          title: "Two-Factor Authentication Disabled",
          description: "Your account is no longer protected by two-factor authentication.",
        })
        onOpenChange(false)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to disable two-factor authentication.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    } else {
      // Enabling 2FA
      if (method === "sms" && !phoneNumber) {
        toast({
          title: "Error",
          description: "Please enter your phone number.",
          variant: "destructive",
        })
        return
      }

      if (!verificationCode) {
        toast({
          title: "Error",
          description: "Please enter the verification code.",
          variant: "destructive",
        })
        return
      }

      setIsProcessing(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
        onConfirm(true, method, verificationCode)
        toast({
          title: "Two-Factor Authentication Enabled",
          description: `Your account is now protected by two-factor authentication via ${method === "app" ? "authenticator app" : "SMS"}.`,
        })
        setPhoneNumber("")
        setVerificationCode("")
        onOpenChange(false)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to enable two-factor authentication.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleCancel = () => {
    setPhoneNumber("")
    setVerificationCode("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {currentValue ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
          </DialogTitle>
          <DialogDescription>
            {currentValue
              ? "Are you sure you want to disable two-factor authentication? This will reduce the security of your account."
              : "Add an extra layer of security to your account by enabling two-factor authentication."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!currentValue && (
            <>
              <div className="space-y-3">
                <Label>Authentication Method</Label>
                <RadioGroup value={method} onValueChange={(value) => setMethod(value as "sms" | "app")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="app" />
                    <Label htmlFor="app" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="h-4 w-4" />
                      Authenticator App (Recommended)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="sms" />
                    <Label htmlFor="sms" className="cursor-pointer">SMS Text Message</Label>
                  </div>
                </RadioGroup>
              </div>

              {method === "sms" && (
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send a verification code to this number
                  </p>
                </div>
              )}

              {method === "app" && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.) and enter the 6-digit code below.
                  </p>
                  <div className="border rounded-md p-4 bg-muted/50 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  disabled={isProcessing}
                  maxLength={6}
                />
              </div>
            </>
          )}

          {currentValue && (
            <div className="rounded-md border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900 p-4">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                Disabling two-factor authentication will make your account less secure. You'll only need your password to sign in.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className={currentValue ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {currentValue ? "Disabling..." : "Enabling..."}
              </>
            ) : (
              currentValue ? "Disable 2FA" : "Enable 2FA"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


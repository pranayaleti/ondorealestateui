import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Building, Wallet, ArrowLeft } from "lucide-react"
import { formatCardNumber, formatExpiration, formatExpirationInput, parseExpirationInput, getPaymentMethodDisplayText } from "@/utils/payment.utils"

export interface PaymentMethod {
  id: string
  type?: "credit_card" | "bank_account" | "ach" | "digital_wallet"
  brand?: string
  last4: string
  cardNumber?: string // Full card number (stored for reuse)
  expMonth?: number
  expYear?: number
  cvv?: string // CVV code (stored for reuse)
  bank?: string
  routingNumber?: string // 9-digit routing number for ACH/bank accounts
  accountNumber?: string // Full account number for ACH/bank accounts
  handle?: string
  nickname?: string
  isDefault: boolean
}

type MethodFormState = PaymentMethod & {
  cardNumber?: string
  expiration?: string
  cvv?: string
}

const PAYMENT_TYPE_OPTIONS: Array<{
  value: Required<PaymentMethod["type"]>
  label: string
  description: string
  icon: React.ReactNode
}> = [
  { value: "credit_card", label: "Credit Card", description: "Visa, MasterCard, AmEx", icon: <CreditCard className="h-5 w-5" /> },
  { value: "bank_account", label: "Bank Account", description: "Checking or savings", icon: <Building className="h-5 w-5" /> },
  { value: "ach", label: "ACH", description: "Direct debit routing", icon: <Building className="h-5 w-5" /> },
  { value: "digital_wallet", label: "Digital Wallet", description: "Apple Pay, Venmo, etc.", icon: <Wallet className="h-5 w-5" /> },
]

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  onAddPaymentMethod?: () => void
  onSetDefault?: (id: string) => void
  onEdit?: (id: string) => void
  onRemove?: (id: string) => void
}

export function PaymentMethods({
  paymentMethods,
  onAddPaymentMethod,
  onSetDefault,
  onEdit,
  onRemove,
}: PaymentMethodsProps) {
  const [localMethods, setLocalMethods] = useState<PaymentMethod[]>(paymentMethods)
  const [methodForm, setMethodForm] = useState<MethodFormState | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isTypeSelectionOpen, setIsTypeSelectionOpen] = useState(false)
  const [pendingRemovalId, setPendingRemovalId] = useState<string | null>(null)

  useEffect(() => {
    setLocalMethods(paymentMethods)
  }, [paymentMethods])

  // Use utility functions from payment.utils.ts
  const formatCardNumberInput = (value: string) => formatCardNumber(value)
  const getDisplayText = (method: PaymentMethod) => getPaymentMethodDisplayText(method)

  const normalizedMethods = useMemo(() => {
    if (localMethods.length === 0) return []
    const hasDefault = localMethods.some((method) => method.isDefault)
    if (hasDefault) return localMethods
    const [first, ...rest] = localMethods
    return [{ ...first, isDefault: true }, ...rest]
  }, [localMethods])

  const canManageMultipleMethods = normalizedMethods.length > 1

  const initializeForm = (method?: MethodFormState, defaultType: PaymentMethod["type"] = "credit_card"): MethodFormState =>
    method ?? {
      id: "",
      type: defaultType,
      brand: "",
      bank: "",
      routingNumber: "",
      accountNumber: "",
      handle: "",
      last4: "",
      expMonth: undefined,
      expYear: undefined,
      nickname: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
      isDefault: normalizedMethods.length === 0,
    }

  const handleOpenAddDialog = (type: PaymentMethod["type"] = "credit_card") => {
    setMethodForm(initializeForm(undefined, type))
    setIsTypeSelectionOpen(false)
    setIsAddDialogOpen(true)
  }

  const handleOpenTypeSelection = () => {
    setIsTypeSelectionOpen(true)
  }

  const handleOpenEditDialog = (method: PaymentMethod) => {
    const expiration = method.type === "credit_card" ? formatExpirationInput(method.expMonth, method.expYear) : ""
    // Pre-fill card information if available
    const cardNumber = method.type === "credit_card" && method.cardNumber 
      ? formatCardNumberInput(method.cardNumber) 
      : ""
    setMethodForm({
      ...method,
      expiration,
      cardNumber,
      cvv: method.type === "credit_card" ? method.cvv || "" : "",
    })
    setIsEditDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsTypeSelectionOpen(false)
    setMethodForm(null)
  }

  const handleFormChange = (key: keyof MethodFormState, value: string | number | boolean | undefined) => {
    setMethodForm((prev) => {
      if (!prev) return prev
      if (key === "expMonth" || key === "expYear") {
        return { ...prev, [key]: value ? Number(value) : undefined }
      }
      if (key === "last4") {
        return { ...prev, last4: typeof value === "string" ? value.replace(/\D/g, "").slice(0, 4) : "" }
      }
      if (key === "routingNumber" && typeof value === "string") {
        const digits = value.replace(/\D/g, "").slice(0, 9)
        return { ...prev, routingNumber: digits }
      }
      if (key === "accountNumber" && typeof value === "string") {
        const digits = value.replace(/\D/g, "")
        const last4 = digits.slice(-4)
        return { ...prev, accountNumber: digits, last4: last4 || prev.last4 }
      }
      if (key === "cardNumber" && typeof value === "string") {
        const formatted = formatCardNumberInput(value)
        const digits = formatted.replace(/\D/g, "")
        return { ...prev, cardNumber: formatted, last4: digits.slice(-4) }
      }
      if (key === "expiration" && typeof value === "string") {
        const sanitized = value.replace(/[^\d/]/g, "")
        const digits = sanitized.replace(/\D/g, "")
        let formatted = sanitized
        if (digits.length >= 3) {
          formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
        } else if (digits.length >= 1) {
          formatted = digits
        }
        return { ...prev, expiration: formatted }
      }
      if (key === "cvv" && typeof value === "string") {
        return { ...prev, cvv: value.replace(/\D/g, "").slice(0, 4) }
      }
      return { ...prev, [key]: value }
    })
  }

  const ensureSingleDefault = (methods: PaymentMethod[], defaultId: string) =>
    methods.map((method) => ({
      ...method,
      isDefault: method.id === defaultId,
    }))

  const handleSubmitForm = () => {
    if (!methodForm) return
    const isEdit = Boolean(methodForm.id && localMethods.some((method) => method.id === methodForm.id))
    const { cardNumber, expiration, cvv, ...base } = methodForm
    const digits = (cardNumber ?? "").replace(/\D/g, "")
    const last4 = digits.slice(-4) || base.last4 || "0000"
    const { expMonth, expYear } =
      base.type === "credit_card" ? parseExpirationInput(expiration || formatExpirationInput(base.expMonth, base.expYear)) : { expMonth: undefined, expYear: undefined }
    const prepared: PaymentMethod = {
      ...base,
      id: methodForm.id || `pm-${Date.now()}`,
      nickname: base.nickname?.trim() || undefined,
      last4,
      cardNumber: base.type === "credit_card" ? digits : undefined, // Store full card number for credit cards
      expMonth,
      expYear,
      cvv: base.type === "credit_card" ? cvv : undefined, // Store CVV for credit cards
      routingNumber: (base.type === "ach" || base.type === "bank_account") ? base.routingNumber : undefined,
      accountNumber: (base.type === "ach" || base.type === "bank_account") ? base.accountNumber : undefined,
      isDefault: !!methodForm.isDefault,
    }

    setLocalMethods((prev) => {
      let next = isEdit
        ? prev.map((method) => (method.id === prepared.id ? prepared : method))
        : [...prev, prepared]

      if (prepared.isDefault || next.length === 1) {
        next = ensureSingleDefault(next, prepared.id)
      }

      return next
    })

    if (isEdit) {
      onEdit?.(prepared.id)
    } else {
      onAddPaymentMethod?.()
    }

    handleCloseDialog()
  }

  const handleSetDefault = (id: string) => {
    setLocalMethods((prev) => ensureSingleDefault(prev, id))
    onSetDefault?.(id)
  }

  const handleRemove = () => {
    if (!pendingRemovalId) return
    setLocalMethods((prev) => {
      const remaining = prev.filter((method) => method.id !== pendingRemovalId)
      if (remaining.length === 0) return remaining
      if (!remaining.some((method) => method.isDefault)) {
        const [first, ...rest] = remaining
        return [{ ...first, isDefault: true }, ...rest]
      }
      return remaining
    })
    onRemove?.(pendingRemovalId)
    setPendingRemovalId(null)
  }

  const renderFormFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Payment Method Type</Label>
        <Select value={methodForm?.type ?? "credit_card"} onValueChange={(value) => handleFormChange("type", value)}>
          <SelectTrigger className="focus:border-orange-500 focus:ring-orange-500">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {methodForm?.type === "credit_card" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nickname</Label>
            <Input
              placeholder="Company Visa, Personal Card..."
              value={methodForm?.nickname ?? ""}
              onChange={(e) => handleFormChange("nickname", e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={methodForm?.cardNumber ?? ""}
              maxLength={19}
              onChange={(e) => handleFormChange("cardNumber", e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Expiration (MM/YY)</Label>
              <Input
                inputMode="numeric"
                placeholder="MM/YY"
                value={methodForm?.expiration ?? ""}
                maxLength={5}
                onChange={(e) => handleFormChange("expiration", e.target.value)}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label>CVV</Label>
              <Input
                inputMode="numeric"
                placeholder="123"
                value={methodForm?.cvv ?? ""}
                maxLength={4}
                onChange={(e) => handleFormChange("cvv", e.target.value)}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      ) : methodForm?.type === "digital_wallet" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Wallet Name</Label>
            <Input
              placeholder="Venmo, PayPal..."
              value={methodForm?.brand ?? ""}
              onChange={(e) => handleFormChange("brand", e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <Label>Handle</Label>
            <Input
              placeholder="@handle"
              value={methodForm?.handle ?? ""}
              onChange={(e) => handleFormChange("handle", e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Bank Name</Label>
            <Input
              placeholder="Chase, Wells Fargo..."
              value={methodForm?.bank ?? ""}
              onChange={(e) => handleFormChange("bank", e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Routing Number</Label>
              <Input
                inputMode="numeric"
                placeholder="123456789"
                value={methodForm?.routingNumber ?? ""}
                maxLength={9}
                onChange={(e) => handleFormChange("routingNumber", e.target.value)}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              <p className="text-xs text-muted-foreground">9-digit routing number</p>
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input
                inputMode="numeric"
                placeholder="Account number"
                value={methodForm?.accountNumber ?? ""}
                onChange={(e) => handleFormChange("accountNumber", e.target.value)}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {methodForm?.accountNumber && methodForm.accountNumber.length >= 4 && (
                <p className="text-xs text-muted-foreground">
                  Last 4 digits: {methodForm.accountNumber.slice(-4)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">Set as default payment method</p>
          <p className="text-xs text-muted-foreground">This replaces your current default method.</p>
        </div>
        <Switch checked={methodForm?.isDefault ?? false} onCheckedChange={(checked) => handleFormChange("isDefault", checked)} />
      </div>
    </div>
  )

  const renderTypeSelectionDialog = () => (
    <Dialog open={isTypeSelectionOpen} onOpenChange={(open) => {
      if (!open) setIsTypeSelectionOpen(false)
    }}>
      <DialogContent className="sm:max-w-2xl border-2 border-orange-500">
        <DialogHeader>
          <DialogTitle>Select Payment Type</DialogTitle>
          <DialogDescription>
            Choose the type of payment method you'd like to add
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {PAYMENT_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOpenAddDialog(option.value)}
              className="flex items-start gap-4 p-5 border-2 rounded-lg hover:bg-accent hover:border-primary transition-all text-left group cursor-pointer"
            >
              <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base mb-1">{option.label}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsTypeSelectionOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const handleBackToTypeSelection = () => {
    setIsAddDialogOpen(false)
    setIsTypeSelectionOpen(true)
  }

  const renderDialog = () => (
    <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
      if (!open) handleCloseDialog()
    }}>
      <DialogContent className="sm:max-w-lg border-2 border-orange-500">
        <DialogHeader>
          <DialogTitle>{isEditDialogOpen ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
          <DialogDescription>
            {isEditDialogOpen
              ? "Update the details for this payment method."
              : "Provide the details for the new payment method you would like to use."}
          </DialogDescription>
        </DialogHeader>
        {renderFormFields()}
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {isAddDialogOpen && (
            <Button type="button" variant="outline" onClick={handleBackToTypeSelection} className="sm:mr-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <Button type="button" variant="outline" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmitForm}>
            {isEditDialogOpen ? "Save Changes" : "Add Method"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const renderRemoveDialog = () => (
    <AlertDialog open={!!pendingRemovalId} onOpenChange={(open) => {
      if (!open) setPendingRemovalId(null)
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove payment method?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately remove the payment method from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleRemove}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {normalizedMethods.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payment methods added yet.</p>
          ) : (
            normalizedMethods.map((paymentMethod) => (
              <div key={paymentMethod.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-none">{getDisplayText(paymentMethod)}</p>
                  {paymentMethod.type === "credit_card" && (
                    <div className="space-y-0.5">
                      {paymentMethod.expMonth && paymentMethod.expYear && (
                        <p className="text-sm text-muted-foreground">
                          Expires {formatExpiration(paymentMethod.expMonth, paymentMethod.expYear)}
                        </p>
                      )}
                      {paymentMethod.cvv && (
                        <p className="text-xs text-muted-foreground">
                          CVV: {paymentMethod.cvv}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {paymentMethod.isDefault ? (
                    <Button variant="secondary" size="sm" disabled>
                      Default
                    </Button>
                  ) : (
                    <>
                      {canManageMultipleMethods && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(paymentMethod.id)}>
                          Set as Default
                        </Button>
                      )}
                    </>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(paymentMethod)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => setPendingRemovalId(paymentMethod.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleOpenTypeSelection} className="w-full sm:w-auto">
            Add Payment Method
          </Button>
        </CardFooter>
      </Card>
      {renderTypeSelectionDialog()}
      {renderDialog()}
      {renderRemoveDialog()}
    </>
  )
}


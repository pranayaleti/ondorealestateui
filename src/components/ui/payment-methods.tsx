import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface PaymentMethod {
  id: string
  type?: "credit_card" | "bank_account" | "ach" | "digital_wallet"
  brand?: string
  last4: string
  expMonth?: number
  expYear?: number
  bank?: string
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
}> = [
  { value: "credit_card", label: "Credit Card", description: "Visa, MasterCard, AmEx" },
  { value: "bank_account", label: "Bank Account", description: "Checking or savings" },
  { value: "ach", label: "ACH", description: "Direct debit routing" },
  { value: "digital_wallet", label: "Digital Wallet", description: "Apple Pay, Venmo, etc." },
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
  const [pendingRemovalId, setPendingRemovalId] = useState<string | null>(null)

  useEffect(() => {
    setLocalMethods(paymentMethods)
  }, [paymentMethods])

  const formatExpiration = (month?: number, year?: number) => {
    if (!month || !year) return ""
    return `${String(month).padStart(2, "0")}/${year}`
  }

  const toShortYear = (year: number) => String(year).slice(-2)

  const formatExpirationInput = (month?: number, year?: number) => {
    if (!month || !year) return ""
    return `${String(month).padStart(2, "0")}/${toShortYear(year)}`
  }

  const parseExpirationInput = (value?: string) => {
    if (!value) return { expMonth: undefined, expYear: undefined }
    const match = value.match(/^(\d{1,2})\s*\/\s*(\d{2,4})$/)
    if (!match) return { expMonth: undefined, expYear: undefined }
    const month = Number(match[1])
    if (month < 1 || month > 12) return { expMonth: undefined, expYear: undefined }
    let year = Number(match[2])
    if (year < 100) {
      const currentCentury = Math.floor(new Date().getFullYear() / 100) * 100
      year += currentCentury
    }
    return { expMonth: month, expYear: year }
  }

  const formatCardNumberInput = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(.{4})/g, "$1 ").trim()
  }

  const getDisplayText = (method: PaymentMethod) => {
    let descriptor = ""
    if (method.type === "credit_card") {
      descriptor = `Card ending in ${method.last4}`
    } else if (method.type === "digital_wallet" && method.brand) {
      descriptor = `${method.brand}${method.handle ? ` ${method.handle}` : ""}`
    } else if (method.bank) {
      descriptor = `${method.bank} ending in ${method.last4}`
    } else if (method.brand) {
      descriptor = `${method.brand} ending in ${method.last4}`
    } else {
      descriptor = `•••• ${method.last4}`
    }

    return method.nickname ? `${method.nickname} • ${descriptor}` : descriptor
  }

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
    setIsAddDialogOpen(true)
  }

  const handleOpenEditDialog = (method: PaymentMethod) => {
    const expiration = method.type === "credit_card" ? formatExpirationInput(method.expMonth, method.expYear) : ""
    setMethodForm({
      ...method,
      expiration,
      cardNumber: "",
      cvv: "",
    })
    setIsEditDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
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
    const { cardNumber, expiration, cvv: _cvv, ...base } = methodForm
    const digits = (cardNumber ?? "").replace(/\D/g, "")
    const last4 = digits.slice(-4) || base.last4 || "0000"
    const { expMonth, expYear } =
      base.type === "credit_card" ? parseExpirationInput(expiration || formatExpirationInput(base.expMonth, base.expYear)) : { expMonth: undefined, expYear: undefined }
    const prepared: PaymentMethod = {
      ...base,
      id: methodForm.id || `pm-${Date.now()}`,
      nickname: base.nickname?.trim() || undefined,
      last4,
      expMonth,
      expYear,
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
          <SelectTrigger>
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
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>{methodForm?.type === "digital_wallet" ? "Wallet Name" : "Bank Name"}</Label>
            <Input
              placeholder={methodForm?.type === "digital_wallet" ? "Venmo, PayPal..." : "Chase, Wells Fargo..."}
              value={methodForm?.type === "digital_wallet" ? methodForm?.brand ?? "" : methodForm?.bank ?? ""}
              onChange={(e) => {
                if (!methodForm) return
                if (methodForm.type === "digital_wallet") {
                  handleFormChange("brand", e.target.value)
                } else {
                  handleFormChange("bank", e.target.value)
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>{methodForm?.type === "digital_wallet" ? "Handle" : "Last 4 Digits"}</Label>
            <Input
              placeholder={methodForm?.type === "digital_wallet" ? "@handle" : "1234"}
              value={methodForm?.type === "digital_wallet" ? methodForm?.handle ?? "" : methodForm?.last4 ?? ""}
              onChange={(e) => {
                if (methodForm?.type === "digital_wallet") {
                  handleFormChange("handle", e.target.value)
                } else {
                  handleFormChange("last4", e.target.value)
                }
              }}
            />
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

  const renderDialog = () => (
    <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
      if (!open) handleCloseDialog()
    }}>
      <DialogContent className="sm:max-w-lg">
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
                  {paymentMethod.expMonth && paymentMethod.expYear && (
                    <p className="text-sm text-muted-foreground">
                      Expires {formatExpiration(paymentMethod.expMonth, paymentMethod.expYear)}
                    </p>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Add Payment Method
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Select payment type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PAYMENT_TYPE_OPTIONS.map((option) => (
              <DropdownMenuItem key={option.value} className="flex flex-col items-start gap-1" onClick={() => handleOpenAddDialog(option.value)}>
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </CardFooter>
      </Card>
      {renderDialog()}
      {renderRemoveDialog()}
    </>
  )
}


import { Home, Building2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { US_STATES } from "@/constants"

export type AddressUsageType = "home" | "office" | "po_box"

export interface AddressFormValues {
  addressType?: AddressUsageType
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
}

export interface AddressOption {
  value: string
  label: string
}

export interface AddressFormProps {
  value: AddressFormValues
  onChange: (value: AddressFormValues) => void
  disabled?: boolean
  hideTypeToggle?: boolean
  className?: string
  idPrefix?: string
  stateOptions?: AddressOption[]
  cityOptions?: AddressOption[]
  errors?: Partial<Record<keyof AddressFormValues, string>>
  onFieldBlur?: () => void
  showRequiredIndicator?: boolean
}

const ADDRESS_TYPE_OPTIONS: { value: AddressUsageType; label: string; icon: typeof Home }[] = [
  { value: "home", label: "Home", icon: Home },
  { value: "office", label: "Office", icon: Building2 },
  { value: "po_box", label: "PO Box", icon: Mail },
]

const postalCodeFormatter = (value: string) => value.replace(/[^\d-]/g, "").slice(0, 10)

export function AddressForm({
  value,
  onChange,
  disabled = false,
  hideTypeToggle = false,
  className,
  idPrefix = "address",
  stateOptions = US_STATES,
  cityOptions = [],
  errors,
  onFieldBlur,
  showRequiredIndicator = true,
}: AddressFormProps) {
  const safeValue: AddressFormValues = {
    addressType: value.addressType ?? "home",
    addressLine1: value.addressLine1 ?? "",
    addressLine2: value.addressLine2 ?? "",
    city: value.city ?? "",
    state: value.state ?? "",
    postalCode: value.postalCode ?? "",
  }

  const handleFieldChange = <T extends keyof AddressFormValues>(field: T, fieldValue: AddressFormValues[T]) => {
    const nextValue =
      field === "postalCode"
        ? (postalCodeFormatter(String(fieldValue)) as AddressFormValues[T])
        : fieldValue

    onChange({
      ...safeValue,
      [field]: nextValue,
    })
  }

  const handleFieldBlur = () => {
    if (typeof onFieldBlur === "function") {
      onFieldBlur()
    }
  }

  const RequiredMark = () =>
    showRequiredIndicator ? <span className="text-destructive">*</span> : null

  return (
    <div
      className={cn(
        "rounded-[32px] border border-border/70 bg-card/80 p-6 shadow-sm shadow-black/5",
        className
      )}
    >
      {!hideTypeToggle && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Address Type</p>
          <ToggleGroup
            type="single"
            value={safeValue.addressType}
            onValueChange={(next) => next && handleFieldChange("addressType", next as AddressUsageType)}
            className="justify-start gap-2"
            onBlur={handleFieldBlur}
          >
            {ADDRESS_TYPE_OPTIONS.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                disabled={disabled}
              >
                <option.icon className="h-4 w-4 shrink-0" />
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-addressLine1`}>
            Address<RequiredMark />
          </Label>
          <Input
            id={`${idPrefix}-addressLine1`}
            placeholder="8572 Winding Creek Boulevard"
            value={safeValue.addressLine1}
            onChange={(event) => handleFieldChange("addressLine1", event.target.value)}
            disabled={disabled}
            autoComplete="address-line1"
            onBlur={handleFieldBlur}
          />
          {errors?.addressLine1 && <p className="text-xs text-destructive">{errors.addressLine1}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-addressLine2`}>Apartment, suite, etc</Label>
          <Input
            id={`${idPrefix}-addressLine2`}
            placeholder="Apartment, suite, etc"
            value={safeValue.addressLine2}
            onChange={(event) => handleFieldChange("addressLine2", event.target.value)}
            disabled={disabled}
            autoComplete="address-line2"
            onBlur={handleFieldBlur}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}-state`}>
              State<RequiredMark />
            </Label>
            <Select
              value={safeValue.state}
              onValueChange={(next) => {
                handleFieldChange("state", next)
                handleFieldBlur()
              }}
              disabled={disabled}
            >
              <SelectTrigger id={`${idPrefix}-state`}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.state && <p className="text-xs text-destructive">{errors.state}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}-city`}>
              City<RequiredMark />
            </Label>
            {cityOptions.length > 0 ? (
              <Select
                value={safeValue.city}
                onValueChange={(next) => {
                  handleFieldChange("city", next)
                  handleFieldBlur()
                }}
                disabled={disabled}
              >
                <SelectTrigger id={`${idPrefix}-city`}>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={`${idPrefix}-city`}
                placeholder="Enter city"
                value={safeValue.city}
                onChange={(event) => handleFieldChange("city", event.target.value)}
                disabled={disabled}
                autoComplete="address-level2"
                onBlur={handleFieldBlur}
              />
            )}
            {errors?.city && <p className="text-xs text-destructive">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}-postalCode`}>
              ZIP Code<RequiredMark />
            </Label>
            <Input
              id={`${idPrefix}-postalCode`}
              placeholder="Enter ZIP Code"
              value={safeValue.postalCode}
              onChange={(event) => handleFieldChange("postalCode", event.target.value)}
              disabled={disabled}
              inputMode="numeric"
              autoComplete="postal-code"
              onBlur={handleFieldBlur}
            />
            {errors?.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}


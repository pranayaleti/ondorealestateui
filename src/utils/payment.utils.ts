import { PaymentMethod } from "@/components/ui/payment-methods"

/**
 * Formats a card number with spaces (e.g., "1234 5678 9012 3456")
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

/**
 * Formats expiration date as MM/YYYY
 */
export function formatExpiration(month?: number, year?: number): string {
  if (!month || !year) return ""
  return `${String(month).padStart(2, "0")}/${year}`
}

/**
 * Formats expiration date as MM/YY for input fields
 */
export function formatExpirationInput(month?: number, year?: number): string {
  if (!month || !year) return ""
  const toShortYear = (year: number) => String(year).slice(-2)
  return `${String(month).padStart(2, "0")}/${toShortYear(year)}`
}

/**
 * Parses expiration input string (MM/YY or MM/YYYY) into month and year
 */
export function parseExpirationInput(value?: string): { expMonth?: number; expYear?: number } {
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

/**
 * Gets the display text for a payment method, including full card number if available
 */
export function getPaymentMethodDisplayText(method: PaymentMethod): string {
  let descriptor = ""
  if (method.type === "credit_card") {
    // Show full card number if available, otherwise show last4
    if (method.cardNumber) {
      const formatted = formatCardNumber(method.cardNumber)
      descriptor = formatted ? formatted : `Card ending in ${method.last4}`
    } else {
      descriptor = `Card ending in ${method.last4}`
    }
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

/**
 * Gets full card information for a credit card payment method
 */
export function getFullCardInfo(method: PaymentMethod): {
  cardNumber?: string
  formattedCardNumber?: string
  expMonth?: number
  expYear?: number
  formattedExpiration?: string
  cvv?: string
  last4: string
} {
  if (method.type !== "credit_card") {
    return { last4: method.last4 }
  }

  return {
    cardNumber: method.cardNumber,
    formattedCardNumber: method.cardNumber ? formatCardNumber(method.cardNumber) : undefined,
    expMonth: method.expMonth,
    expYear: method.expYear,
    formattedExpiration: method.expMonth && method.expYear ? formatExpiration(method.expMonth, method.expYear) : undefined,
    cvv: method.cvv,
    last4: method.last4,
  }
}

/**
 * Validates a card number (basic Luhn algorithm check)
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Validates CVV (3-4 digits)
 */
export function validateCVV(cvv: string): boolean {
  const digits = cvv.replace(/\D/g, "")
  return digits.length >= 3 && digits.length <= 4
}

/**
 * Validates expiration date (not expired)
 */
export function validateExpiration(month?: number, year?: number): boolean {
  if (!month || !year) return false
  if (month < 1 || month > 12) return false

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (year < currentYear) return false
  if (year === currentYear && month < currentMonth) return false

  return true
}


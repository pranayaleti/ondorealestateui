import { REGEX_PATTERNS, ERROR_MESSAGES } from "@/constants/regex.constants"

type Primitive = string | number | boolean | null | undefined

const isString = (value: Primitive | Primitive[]): value is string => typeof value === "string"

const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0
  let isEven = false

  for (let i = cardNumber.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(cardNumber.charAt(i), 10)

    if (Number.isNaN(digit)) {
      return false
    }

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export const validators = {
  email: (value: string): boolean => REGEX_PATTERNS.EMAIL.test(value?.trim() ?? ""),

  phone: (value: string): boolean => {
    const cleaned = value?.replace(/\D/g, "") ?? ""
    return REGEX_PATTERNS.PHONE_DIGITS_ONLY.test(cleaned)
  },

  zipCode: (value: string): boolean => REGEX_PATTERNS.ZIP_CODE_PLUS_4.test(value?.trim() ?? ""),

  name: (value: string): boolean => REGEX_PATTERNS.NAME.test(value?.trim() ?? ""),

  required: (value: Primitive | Primitive[]): boolean => {
    if (Array.isArray(value)) return value.length > 0
    if (isString(value)) return value.trim().length > 0
    if (typeof value === "number") return !Number.isNaN(value)
    if (typeof value === "boolean") return true
    return value !== null && value !== undefined
  },

  minLength: (value: string, min: number): boolean => (value ?? "").length >= min,

  maxLength: (value: string, max: number): boolean => (value ?? "").length <= max,

  ssn: (value: string): boolean => {
    const cleaned = value?.replace(/\D/g, "") ?? ""
    return REGEX_PATTERNS.SSN_STRICT.test(cleaned)
  },

  ein: (value: string): boolean => {
    const cleaned = value?.replace(/\D/g, "") ?? ""
    return REGEX_PATTERNS.EIN.test(cleaned)
  },

  creditCard: (value: string): boolean => {
    const cleaned = value?.replace(/\D/g, "") ?? ""
    return REGEX_PATTERNS.CREDIT_CARD.test(cleaned) && luhnCheck(cleaned)
  },

  cvv: (value: string): boolean => REGEX_PATTERNS.CVV.test(value?.trim() ?? ""),

  currency: (value: string): boolean => REGEX_PATTERNS.CURRENCY_USD.test(value?.trim() ?? ""),

  amount: (value: string): boolean => REGEX_PATTERNS.AMOUNT.test(value?.trim() ?? ""),

  username: (value: string): boolean => REGEX_PATTERNS.USERNAME.test(value?.trim() ?? ""),

  passwordStrong: (value: string): boolean => REGEX_PATTERNS.PASSWORD_STRONG.test(value ?? ""),

  url: (value: string): boolean => REGEX_PATTERNS.URL_STRICT.test(value?.trim() ?? ""),

  dateUS: (value: string): boolean => REGEX_PATTERNS.DATE_US.test(value?.trim() ?? ""),
}

export const formatters = {
  phone: (value: string): string => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  },

  zipCode: (value: string): string => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 5) return cleaned
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}`
  },

  ssn: (value: string): string => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`
  },

  creditCard: (value: string): string => {
    const cleaned = value.replace(/\D/g, "")
    return cleaned.match(/.{1,4}/g)?.join(" ") ?? cleaned
  },

  trimWhitespace: (value: string): string => value.replace(/\s+/g, " ").trim(),
}

export const sanitize = {
  html: (input: string): string =>
    input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;"),
  sql: (input: string): string => input.replace(/['";\\]/g, "\\$&"),
  trim: (input: string): string => input.trim().replace(/\s+/g, " "),
}

export type ValidationResult = {
  valid: boolean
  message?: string
}

export type ValidationRule<TValues extends Record<string, unknown> = Record<string, unknown>> =
  | {
      validator: (value: string, values?: TValues) => boolean
      message?: string
    }
  | {
      regex: RegExp
      message?: string
    }

type Schema<TValues extends Record<string, unknown> = Record<string, unknown>> = Record<
  string,
  {
    rules: ValidationRule<TValues>[]
    formatter?: (value: string) => string
    dependencies?: string[]
    asyncValidator?: (value: string, values?: TValues) => Promise<ValidationResult>
    required?: boolean
    maxLength?: number
  }
>

export const validateValue = <TValues extends Record<string, unknown>>(
  value: string,
  rules: ValidationRule<TValues>[],
  values?: TValues,
): ValidationResult => {
  for (const rule of rules) {
    if ("validator" in rule) {
      const isValid = rule.validator(value, values)
      if (!isValid) {
        return { valid: false, message: rule.message ?? ERROR_MESSAGES.INVALID_FORMAT }
      }
    } else if ("regex" in rule) {
      if (!rule.regex.test(value)) {
        return { valid: false, message: rule.message ?? ERROR_MESSAGES.INVALID_FORMAT }
      }
    }
  }

  return { valid: true }
}

export const buildValidator = <TValues extends Record<string, unknown>>(schema: Schema<TValues>) => {
  return (values: TValues) => {
    const errors: Record<string, string> = {}

    Object.entries(schema).forEach(([field, config]) => {
      const rawValue = values[field] as Primitive | Primitive[] | undefined;
      const value = isString(rawValue) ? rawValue : String(rawValue ?? "");

      const hasValue = validators.required(rawValue);

      if (config.required && !hasValue) {
        errors[field] = ERROR_MESSAGES.REQUIRED
        return
      }

      if (!config.required && !hasValue) {
        return
      }

      if (config.maxLength && !validators.maxLength(value, config.maxLength)) {
        errors[field] = `${ERROR_MESSAGES.INVALID_FORMAT} (max ${config.maxLength} characters)`
        return
      }

      const result = validateValue(value, config.rules, values)
      if (!result.valid && result.message) {
        errors[field] = result.message
      }
    })

    return errors
  }
}

export type FormValidationSchema<TValues extends Record<string, unknown> = Record<string, unknown>> = Schema<TValues>


import { ERROR_MESSAGES, REGEX_PATTERNS } from "@/constants/regex.constants"
import { sanitize, validators, type FormValidationSchema } from "@/utils/validation.utils"

type ValidationPreset = FormValidationSchema<Record<string, unknown>>[string]

export const validationPresets = {
  firstName: {
    required: true,
    formatter: sanitize.trim,
    rules: [
      {
        regex: REGEX_PATTERNS.FIRST_NAME,
        message: ERROR_MESSAGES.NAME,
      },
    ],
    maxLength: 50,
  } satisfies ValidationPreset,
  lastName: {
    required: true,
    formatter: sanitize.trim,
    rules: [
      {
        regex: REGEX_PATTERNS.LAST_NAME,
        message: ERROR_MESSAGES.NAME,
      },
    ],
    maxLength: 50,
  } satisfies ValidationPreset,
  fullName: {
    required: true,
    formatter: sanitize.trim,
    rules: [
      {
        regex: REGEX_PATTERNS.FULL_NAME,
        message: ERROR_MESSAGES.NAME,
      },
    ],
    maxLength: 100,
  } satisfies ValidationPreset,
  email: {
    required: true,
    formatter: (value: string) => sanitize.trim(value).toLowerCase(),
    rules: [
      {
        validator: validators.email,
        message: ERROR_MESSAGES.EMAIL,
      },
    ],
    maxLength: 120,
  } satisfies ValidationPreset,
  phone: {
    formatter: sanitize.trim,
    rules: [
      {
        validator: validators.phone,
        message: ERROR_MESSAGES.PHONE,
      },
    ],
    maxLength: 14,
  } satisfies ValidationPreset,
  zipCode: {
    formatter: sanitize.trim,
    rules: [
      {
        regex: REGEX_PATTERNS.ZIP_CODE_PLUS_4,
        message: ERROR_MESSAGES.ZIP_CODE_PLUS_4,
      },
    ],
    maxLength: 10,
  } satisfies ValidationPreset,
  passwordStrong: {
    required: true,
    rules: [
      {
        regex: REGEX_PATTERNS.PASSWORD_STRONG,
        message: ERROR_MESSAGES.PASSWORD_STRONG,
      },
    ],
    maxLength: 128,
  } satisfies ValidationPreset,
  passwordMedium: {
    required: true,
    rules: [
      {
        regex: REGEX_PATTERNS.PASSWORD_MEDIUM,
        message: ERROR_MESSAGES.PASSWORD_MEDIUM,
      },
    ],
    maxLength: 128,
  } satisfies ValidationPreset,
  currency: {
    formatter: sanitize.trim,
    rules: [
      {
        validator: validators.currency,
        message: ERROR_MESSAGES.CURRENCY,
      },
    ],
  } satisfies ValidationPreset,
  requiredText: (maxLength = 200): ValidationPreset => ({
    required: true,
    formatter: sanitize.trim,
    rules: [
      {
        validator: validators.required,
        message: ERROR_MESSAGES.REQUIRED,
      },
    ],
    maxLength,
  }),
}


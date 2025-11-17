import type React from "react"
import { useCallback, useMemo, useRef, useState } from "react"
import { buildValidator, type FormValidationSchema, validateValue as validateValueFn } from "@/utils/validation.utils"

type FieldKey<TValues extends Record<string, unknown>> = keyof TValues & string
type ErrorState<TValues extends Record<string, unknown>> = Partial<Record<FieldKey<TValues>, string>>
type TouchedState<TValues extends Record<string, unknown>> = Partial<Record<FieldKey<TValues>, boolean>>

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>

type BlurEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

type UseValidatedFormOptions<TValues extends Record<string, unknown>> = {
  initialValues: TValues
  schema: FormValidationSchema<TValues>
  debounceMs?: number
}

export const useValidatedForm = <TValues extends Record<string, unknown>>({
  initialValues,
  schema,
  debounceMs = 350,
}: UseValidatedFormOptions<TValues>) => {
  const [values, setValues] = useState<TValues>(initialValues)
  const [errors, setErrors] = useState<ErrorState<TValues>>({})
  const [touched, setTouched] = useState<TouchedState<TValues>>({})
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const validator = useMemo(() => buildValidator(schema), [schema])

  const runValidation = useCallback(
    (field: keyof TValues, value?: string) => {
      const config = schema[field as string]
      if (!config) return
      const currentValue = value ?? (values[field] as string)

      const result = validateValueFn<TValues>(currentValue ?? "", config.rules, values)
      setErrors((prev) => {
        if (!result.valid && result.message) {
          return { ...prev, [field as string]: result.message }
        }
        const next = { ...prev }
        delete next[field as string]
        return next
      })
    },
    [schema, values],
  )

  const scheduleValidation = useCallback(
    (field: keyof TValues, value?: string) => {
      if (!schema[field as string]) return
      if (timersRef.current[field as string]) {
        clearTimeout(timersRef.current[field as string])
      }

      timersRef.current[field as string] = setTimeout(() => runValidation(field, value), debounceMs)
    },
    [debounceMs, runValidation, schema],
  )

  const handleChange =
    (field: keyof TValues) =>
    (event: ChangeEvent) => {
      const rawValue = event.target.value
      const config = schema[field as string]
      const formatter = config?.formatter
      const sanitized = formatter ? formatter(rawValue) : rawValue

      setValues((prev) => ({ ...prev, [field]: sanitized }))

      if (touched[field as string]) {
        scheduleValidation(field, sanitized)
      }
    }

  const handleBlur =
    (field: keyof TValues) =>
    (event: BlurEvent) => {
      const rawValue = event.target.value
      setTouched((prev) => ({ ...prev, [field as string]: true }))
      runValidation(field, rawValue)
    }

  const validateForm = useCallback(() => {
    const validationErrors = validator(values)
    setErrors(validationErrors as ErrorState<TValues>)
    const hasErrors = Object.keys(validationErrors).length > 0
    if (hasErrors) {
      setTouched((prev) => {
        const next = { ...prev }
        Object.keys(validationErrors).forEach((key) => {
          next[key as FieldKey<TValues>] = true
        })
        return next
      })
    }
    return !hasErrors
  }, [validator, values])

  const setFieldValue = useCallback(
    (field: keyof TValues, value: TValues[keyof TValues]) => {
      setValues((prev) => ({ ...prev, [field]: value }))
      if (touched[field as string]) {
        const normalizedValue = typeof value === "string" ? value : String(value ?? "")
        scheduleValidation(field, normalizedValue)
      }
    },
    [scheduleValidation, touched],
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setFieldValue,
    setValues,
    resetForm,
  }
}

export type UseValidatedFormReturn<TValues extends Record<string, unknown>> = ReturnType<typeof useValidatedForm<TValues>>


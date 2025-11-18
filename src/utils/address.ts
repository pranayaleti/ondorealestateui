export interface AddressFields {
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
}

export const defaultAddressFields: AddressFields = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
}

export const parseAddressString = (address?: string | null): AddressFields => {
  if (!address) {
    return { ...defaultAddressFields }
  }

  const segments = address
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean)

  return {
    line1: segments[0] || "",
    line2: segments[1] || "",
    city: segments[2] || "",
    state: segments[3] || "",
    postalCode: segments.slice(4).join(", ") || "",
  }
}

export const formatAddressFields = (fields: AddressFields): string => {
  return [fields.line1, fields.line2, fields.city, fields.state, fields.postalCode]
    .filter((part) => part && part.trim().length > 0)
    .join(", ")
}


const originalDateToLocaleDateString = Date.prototype.toLocaleDateString

Date.prototype.toLocaleDateString = function (
  locales?: string | string[],
  options?: Intl.DateTimeFormatOptions,
) {
  const locale = locales ?? "en-US"
  const mergedOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    ...options,
  }
  return originalDateToLocaleDateString.call(this, locale, mergedOptions)
}


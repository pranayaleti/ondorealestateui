/**
 * Get the logo path with proper base URL handling for Vite
 */
export function getLogoPath(): string {
  const baseUrl = (import.meta as any).env?.BASE_URL || '/'
  return `${baseUrl}logo.png`
}


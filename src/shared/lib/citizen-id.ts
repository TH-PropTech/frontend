/**
 * Checks whether a given string is a valid 12-digit Vietnamese Citizen Identification Number (CCCD).
 */
export function isValidCitizenId(value?: string | null): boolean {
  if (!value) return false
  return /^\d{12}$/.test(value.trim())
}

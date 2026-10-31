/**
 * Joins non-empty address components with a comma and space.
 * Eliminates leading, trailing, or double commas when components like ward or district are missing.
 */
export function joinAddressParts(
  ...parts: (string | null | undefined)[]
): string {
  return parts
    .map(p => (typeof p === 'string' ? p.trim() : ''))
    .filter(Boolean)
    .join(', ')
}
